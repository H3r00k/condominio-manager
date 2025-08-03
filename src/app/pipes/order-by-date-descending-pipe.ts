import { Pipe, PipeTransform } from '@angular/core';
import { Bolletta } from '../models/bolletta.model';

@Pipe({
  name: 'orderByDateDescendingPipe',
})
export class OrderByDateDescendingPipePipe implements PipeTransform {
  transform(bollette: Bolletta[]): Bolletta[] {
    return [...bollette].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
