import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchOtherValidator(otherControlName: string): ValidatorFn {
  let subscribed = false;

  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    if (!parent) return null;

    const otherControl = parent.get(otherControlName);
    if (!otherControl) return null;

    if (!subscribed) {
      subscribed = true;
      otherControl.valueChanges.subscribe(() => control.updateValueAndValidity());
    }

    return otherControl.value !== control.value ? { matchOther: true } : null;
  };
}