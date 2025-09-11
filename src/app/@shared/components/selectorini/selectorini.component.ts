import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-selectorini',
  templateUrl: './selectorini.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './selectorini.component.css'
})
export class SelectoriniComponent {
  @Input() options: any[] = [];
  @Input() displayKey: string = 'name';
  @Input() selected: any[] = [];
  @Input() single: boolean = false;
  @Input() placeholder: string = 'Select...';
  @Input() disabled: boolean = false;
  @Input() isPrefix: boolean = false;
  @Input() searchable: boolean = true;
  @Output() selectedChange = new EventEmitter<any[]>();

  searchBuffer: string = '';
  bufferTimeout: any;
  isOpen = false;

  constructor(private eRef: ElementRef) {
  }

  ngOnChanges() {
    // Normalize selected as array internally
    if (this.single && this.selected && !Array.isArray(this.selected)) {
      this.selected = [this.selected];
    }
  }

  // get filteredOptions(): any[] {
  //   if (!this.searchable || !this.searchTerm.trim()) {
  //     return this.options;
  //   }
  //   const term = this.searchTerm.toLowerCase();
  //   return this.options.filter(item => item[this.displayKey]?.toLowerCase().includes(term));
  // }

  toggleDropdown() {
    if (this.disabled) return;
    console.log("Toggling dropdown");
    this.isOpen = !this.isOpen;
    this.searchBuffer = ''; // Clear old search
  }

  isSelected(item: any): boolean {
    if (item.value){
      return this.selected.some(sel => sel.value === item.value);
    }
    else {
      return this.selected.some(sel => sel.id === item.id);
    }
  }

  selectItem(item: any) {
    if (this.isSelected(item)) {
      this.removeItem(item);
    } else {
      this.single ? this.selected = [item] : this.selected.push(item);
      this.selectedChange.emit([...this.selected]);
      if (this.single) {
        this.isOpen = false;
      }
    }
  }

  removeItem(item: any) {
    this.selected = this.selected.filter(sel => sel.id !== item.id);
    this.selectedChange.emit([...this.selected]);
  }

  @HostListener('document:click', ['$event'])
  handleDocClick(event: MouseEvent) {
    this.clickOutside(event.target);
  }

  clickOutside(target: EventTarget | null) {
    if (!(target instanceof Node)) return; // narrows & guards null
    if (!this.eRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

  get filteredOptions(): any[] {
    if (!this.searchBuffer.trim()) return this.options;

    const normalize = (val: string): string =>
      val.toLowerCase().replace(/^\+/, '').replace(/\s+/g, '');

    const search = normalize(this.searchBuffer);

    return this.options.filter(item =>
      normalize(item[this.displayKey] || '').startsWith(search)
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.isOpen || this.disabled) return;

    const isPrintable = event.key.length === 1 && event.key.match(/^[a-zA-Z0-9\-]$/);

    // Handle backspace
    if (event.key === 'Backspace') {
      this.searchBuffer = this.searchBuffer.slice(0, -1);
    } else if (isPrintable) {
      this.searchBuffer += event.key.toLowerCase();
    } else {
      return;
    }

    // Reset buffer after timeout
    clearTimeout(this.bufferTimeout);
    this.bufferTimeout = setTimeout(() => {
      this.searchBuffer = '';
    }, 5000);

    const normalize = (val: string): string =>
      val.toLowerCase().replace(/^\+/, '').replace(/\s+/g, '');

    const search = normalize(this.searchBuffer);

    const matchIndex = this.options.findIndex(item =>
      normalize(item[this.displayKey] || '').startsWith(search)
    );

    if (matchIndex >= 0) {
      const list = document.querySelectorAll('.dropdown-menu li')[matchIndex];
      if (list) list.scrollIntoView({ block: 'nearest' });
    }
  }
}
