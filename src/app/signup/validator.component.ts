import { AbstractControl, ValidatorFn } from '@angular/forms';

export function birthdateMaxValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const birthdate = new Date(control.value);
    const maxDate = new Date(2016, 0, 1); // January 1st, 2016

    // Check if the birthdate is after or equal to the maxDate
    if (birthdate >= maxDate) {
      return { 'max': true }; // Return an error object if invalid
    }
    return null; // Return null if valid
  };
}