import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isCNPJValid } from '../helpers/cnpj-valid';

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && !isCNPJValid(control.value.replace(/[^\d]/g, ''))) {
      return { 'invalidCnpj': true };
    }
    return null;
  };
}
