import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare const bootstrap: any; // Bootstrap JS global

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private containerId = 'toast-container';
  private protoId = 'toast-prototype';

  constructor(private translate: TranslateService) {
    this.ensureContainer();
  }

  /**
   * Ensure toast container & prototype exists in DOM
   */
  private ensureContainer() {
    let container = document.getElementById(this.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      container.className = 'toast-container position-fixed top-0 end-0 p-3';
      container.style.zIndex = '2000'; // make sure it's above header
      document.body.appendChild(container);

      // prototype toast (hidden, used for cloning)
      const proto = document.createElement('div');
      proto.id = this.protoId;
      proto.className = 'toast d-none';
      proto.setAttribute('role', 'alert');
      proto.setAttribute('aria-live', 'assertive');
      proto.setAttribute('aria-atomic', 'true');
      proto.innerHTML = `
        <div class="toast-header">
          <strong class="me-auto" data-toast-title>Title</strong>
          <small data-toast-time>just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" data-toast-body>
          Message
        </div>
      `;
      container.appendChild(proto);
    }
  }

  /**
   * Show a bootstrap toast (stacked)
   */
  show(type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) {
    const container = document.getElementById(this.containerId)!;
    const prototype = document.getElementById(this.protoId) as HTMLDivElement;

    if (!prototype) {
      console.warn('[ToastService] Prototype not found.');
      return;
    }

    // clone prototype
    const toastEl = prototype.cloneNode(true) as HTMLDivElement;
    toastEl.classList.remove('d-none');
    toastEl.removeAttribute('id'); // avoid duplicate ids

    // assign custom class for styling
    toastEl.classList.add(`toast-${type}`);

    // set content
    const titleEl = toastEl.querySelector('[data-toast-title]') as HTMLElement;
    const bodyEl = toastEl.querySelector('[data-toast-body]') as HTMLElement;
    const timeEl = toastEl.querySelector('[data-toast-time]') as HTMLElement;

    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = message;
    if (timeEl) timeEl.textContent = 'just now';

    container.appendChild(toastEl);

    // init + show
    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { autohide: true, delay: 5000 });
    toast.show();

    // remove after hidden
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  }

  /**
   * Translated success message
   */
  showSuccess(titleKey: string, messageKey: string) {
    this.show('success', this.translate.instant(titleKey), this.translate.instant(messageKey));
  }

  success(message: string) {
    this.show('success', "Success", message);
  }

  error(message: string) {
    this.show('error', "Error", message);
  }

  info(message: string) {
    this.show('info', 'Info', message);
  }

  warning(message: string) {
    this.show('warning', "Warning", message);
  }
}
