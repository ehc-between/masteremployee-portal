import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {AsyncSubject, BehaviorSubject, Observable, of} from 'rxjs';
import {add, differenceInMilliseconds, format, parseISO} from 'date-fns';
import {TranslateService} from "@ngx-translate/core";
import {DatePipe, formatDate, TitleCasePipe} from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localeNb from '@angular/common/locales/nb';


export function escapeHtml(unsafe: string) {
  const div = document.createElement('div');
  div.textContent = unsafe;
  return div.innerHTML;
}

export function getInitials(initialsKeys: string[]): string {
  let initials = ''
  if (initialsKeys.length > 1) {
    let firstName = initialsKeys[0];
    let lastName = initialsKeys[1];
    firstName = firstName.trim();
    lastName = lastName.trim();
    initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  } else if (initialsKeys.length == 1) {
    let displayName = initialsKeys[0];
    displayName = displayName.trim();
    displayName = displayName.replace('  ', ' ')
    if (displayName.includes(' ')) {
      let [firstName, lastName] = displayName.split(' ');
      initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else {
      initials = displayName[0].toUpperCase();
      if (displayName.length > 1) {
        initials += displayName[1].toUpperCase();
      }
    }
  }
  return initials
}

function convertDateUTCToLocal(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

function convertDateLocalToUTC(date: Date) {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}

export function convertStringToTime(timeString: string): Date {
  // Split the time string into hours and minutes
  const [hoursStr, minutesStr] = timeString.split(':');

  // Parse hours and minutes as integers
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Create a new Date object with the current date and the specified time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  return date;
}

export function localToUTCDelta() {
  const date = new Date();
  return date.getTimezoneOffset() / 60;
}

export function addHours(date: Date, hours: number){
    const hoursInt = Math.floor(hours);
    const minutes = (hours - hoursInt) * 60;

    return add(date, {hours: hoursInt, minutes: minutes})
  }

export function convertResponseDatetime(obj: any) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {

      // If prop is object, iterate recursively
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        convertResponseDatetime(obj[prop]);
      }

      // If prop is string and ISO date, convert to local datetime
      else if (typeof obj[prop] === 'string' && isISODateString(obj[prop])) {
        const isoDateString = obj[prop].replace(' ', 'T');
        const date = new Date(isoDateString);
        obj[prop] = convertDateUTCToLocal(date);
      }
    }
  }
}

export function convertPayloadDatetime(data: any) {
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (typeof data[prop] === 'object' && data[prop] !== null) {
        convertPayloadDatetime(data[prop]);
      }
      else if (typeof data[prop] === 'string' && isISODateString(data[prop])) {
        let date = new Date(data[prop]);
        date = convertDateLocalToUTC(date)
        data[prop] = format(date, 'yyyy-MM-dd HH:mm:ss');
      }
      if (data[prop] instanceof Date) {
        data[prop] = convertDateLocalToUTC(data[prop])
        data[prop] = format(data[prop], 'yyyy-MM-dd HH:mm:ss');
      }
    }
  }
  return data;
}

function isISODateString(value: string): boolean {
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}/;
  return isoDatePattern.test(value);
}

function isISOTimeString(value: string): boolean {
  const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timePattern.test(value);
}

export function formatTimeYMD(date: Date){
    return format(date, 'dd-MM-yyyy')
  }

export function formatTimeDMYHHMM(date: Date | null){
  if (date == null) {
    return ''
  }
   return format(date, 'dd.MM.yyyy - HH:mm')
}

export function formatDateDMY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatTimeHM(date: Date){
    return format(date, 'HH:mm')
}

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(private translate: TranslateService) {}

  formatCurrency(number: number | null | undefined, showDecimals: boolean = true): string {
    if (number === null || number === undefined) {
      number = 0;
    }
    const decimals = showDecimals ? 2 : 0;
    const formattedNumber = number.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');
    return (showDecimals ? '' : '') + formattedNumber + (showDecimals ? '' : ',-');
  }

  displayPhone(phoneNumber: string): string {
    const countryCode = '+47';
    if (phoneNumber.startsWith(countryCode)) {
      phoneNumber = phoneNumber.slice(countryCode.length);
    }
    return phoneNumber;
  }

  displayPhoneNumber(phoneNumber: string): string {
    //add +47 to the phone number if it is not there, and the format should be +47 12 345 678 for all phone numbers
    const countryCode = '+47';
    if (phoneNumber.startsWith(countryCode)) {
      phoneNumber = phoneNumber.slice(countryCode.length);
    }
    const pattern = /^(\d{2})(\d{3})(\d{3})$/;
    const match = phoneNumber.trim().match(pattern);
    if (match) {
      return `${countryCode} ${match[1]} ${match[2]} ${match[3]}`;
    }

    return phoneNumber;
  }

  formatDateWdDYM(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = date.getFullYear().toString().slice(-2);
    const weekday = this.translate.instant('WEEKDAYS.' + date.getDay());

    return `${weekday}, ${day}/${month}/${year}`;
  }

  asyncPhoneNumberValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const phoneNumber = control.value;
      const isValid = /^\d{8}$/.test(phoneNumber);

      return new Observable((observer) => {
        if (isValid) {
          observer.next(null); // Phone number is valid, emit null
        } else {
          observer.next({ invalidPhoneNumber: true }); // Phone number is invalid, emit validation error object
        }
        observer.complete();
      });
    };
  }

  // ----------- Time Methods -----------
  formatTimeHM(date: Date | null){
    if (date == null) {
      return '';
    }
    registerLocaleData(localeNb, 'nb');
    return format(date, 'HH:mm')
  }

  formatTimeYMD(date: Date){
    return format(date, 'yyyy-MM-dd')
  }

  formatTimeDMY(date: Date | null){
    if (date === null) {
      return 'N/A'; // or some other placeholder text to indicate that the date is not available
    }
    return format(date, 'dd/MM/yy');
  }

  formatTimeH(date: Date){
    return format(date, 'HH')
  }

  formatDateToString(date: Date){
    return format(date, 'yyyy-MM-dd HH:mm:ss')
  }

  addhours(date: Date | null, hours: number | null): Date | null {
    if (!date) {
      return null;
    }
    if (!hours) {
      return date;
    }
    // splitt hours into hours and minutes
    const hoursInt = Math.floor(hours);
    const minutes = (hours - hoursInt) * 60;
    return add(date, {hours: hoursInt, minutes: minutes})
  }

  formatDateMonth(dateObject: Date) {
    const day = dateObject.getDate()
    const month = dateObject.toLocaleDateString('default', {month: 'short'});
    return `${day}. ${month}`;
  }

  formatSecondsHM(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} h ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  }

  displayDate(date: Date | null, includeWeekDay: boolean = true): string {
    registerLocaleData(localeNb, 'nb');
    const titleCasePipe = new TitleCasePipe();
    const datePipe = new DatePipe(localStorage.getItem('language') === 'no' ? 'nb-NO' : 'en-US');
    const hour = localStorage.getItem('language') === 'no' ? 'kl' : 'at';

    if (date === null) {
      return 'N/A'; // or some other placeholder text to indicate that the date is not available
    }

    const day = titleCasePipe.transform(datePipe.transform(date, 'EEE'));
    const formattedDateAndTime = datePipe.transform(date, `dd.MM.yy \'${hour}\' HH:mm`);

    if (includeWeekDay) {
      return `${day} ${formattedDateAndTime}`;
    } else {
      return `${formattedDateAndTime}`;
    }
  }

  formatTimeTrackingDate(value: any, format: string = 'mediumDate', timezone?: string): string | null {
    const locale = localStorage.getItem('language') === 'no' ? 'nb-NO' : 'en-US';
    return formatDate(value, format, locale, timezone);
  }

    // Friday 12. April 2024
  formatFullDayAndDate(date: Date | null): string {
    registerLocaleData(localeNb, 'nb');
    const titleCasePipe = new TitleCasePipe();
    const languageSetting = localStorage.getItem('language') === 'no' ? 'nb-NO' : 'en-US';
    const datePipe = new DatePipe(languageSetting);

    if (date == null) {
      return 'N/A';
    }

    const day = titleCasePipe.transform(datePipe.transform(date, 'EEEE'));  // Full name of the day
    const formattedDate = datePipe.transform(date, 'd. MMMM yyyy');  // Day of the month, full month name, and year

    // Ensure the month name starts with a capital letter (especially for non-English settings)
    const finalFormattedDate = formattedDate!.split(' ').map((part, index) => {
      return index === 1 ? titleCasePipe.transform(part) : part;
    }).join(' ');

    return `${day} ${finalFormattedDate}`;
  }

  // Calculate total time for all stages
  calculateHours(stages: any) {
    let totalHours = 0;

    stages.forEach((item: any) => {
      if (item?.started_at === null || item.finished_at === null) {
        return;
      }
      let startedAt = parseISO(item.started_at);
      let finishedAt = parseISO(item.finished_at);
      let differenceInMillis = differenceInMilliseconds(finishedAt, startedAt);
      let differenceInHours = differenceInMillis / (1000 * 60 * 60);
      totalHours += differenceInHours;
    });
    return this.formatDurationFromHours(totalHours);
  }
  formatDurationFromHours(time: number){
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    const minutesText = 'm';
    if (hours === 0) {
      return minutes + ' min'
    }
    return minutes > 0 ? `${hours} ${this.translate.instant('HOUR-ABBREVIATION')} ${minutes} ${minutesText}` : `${hours} ${this.translate.instant('HOUR-ABBREVIATION')}`;
  }

  formatDurationFromSeconds(seconds: number): string {
    return this.formatDurationFromHours(seconds / 3600);
  }

  differenceBetweenDates(date1: Date, date2: Date): string {
    const difference = differenceInMilliseconds(date1, date2);
    return this.formatDurationFromSeconds(difference / 1000);
  }
}
