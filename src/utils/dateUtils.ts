import {DateTime, Settings} from 'luxon';

Settings.defaultLocale = 'ru';

// https://github.com/moment/luxon/blob/master/docs/formatting.md
const dateFormat = 'dd.MM.yyyy';
const timeFormat = 'HH:mm';
const dateTimeFormat = 'dd.MM.yyyy HH:mm';

export function parseDateTime(value: string): number {
  return DateTime.fromFormat(value, dateTimeFormat).toSeconds();
}

export function parseDate(value: string): number {
  return DateTime.fromFormat(value, dateFormat).toSeconds();
}

export function parseTime(value: string): number {
  return DateTime.fromFormat(value, timeFormat).toSeconds();
}
