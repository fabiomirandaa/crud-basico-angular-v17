import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialtyLabel',
  standalone: true
})
export class SpecialtyLabelPipe implements PipeTransform {
  transform(value: string, specialties: { value: string; label: string }[]): string {
    const specialty = specialties.find(specialty => specialty.value === value);
    return specialty ? specialty.label : 'Desconhecido';
  }
}
