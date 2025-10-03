//@ts-ignore
import { format, parseISO } from 'date-fns';
// import { format } from 'date-fns/format';


export function parseUtcAsLocal(utcString: string) {
  return parseISO(utcString);
}

export function toUtcString(date: Date) {
  return `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH:mm:ss')}Z`;
}