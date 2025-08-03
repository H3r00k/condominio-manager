import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipeTsPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);

    const giorno = date.getDate().toString().padStart(2, '0');
    const mese = (date.getMonth() + 1).toString().padStart(2, '0');
    const anno = date.getFullYear();

    const ore = date.getHours().toString().padStart(2, '0');
    const minuti = date.getMinutes().toString().padStart(2, '0');

    return `${giorno}/${mese}/${anno} alle ${ore}:${minuti}`;
  }
}
