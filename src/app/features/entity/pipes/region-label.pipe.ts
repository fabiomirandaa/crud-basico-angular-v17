import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionLabel',
  standalone: true
})
export class RegionLabelPipe implements PipeTransform {
  transform(value: string, regions: { value: string; label: string }[]): string {
    const region = regions.find(region => region.value === value);
    return region ? region.label : 'Desconhecido';
  }
}
