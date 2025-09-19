import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexPattern } from '../validators/regex';
import { matchOtherValidator } from '../validators/match-other.validator';

@Injectable({ providedIn: 'root' })

export class FormService {
  constructor (
        private formBuilder: FormBuilder
  ) {}

  buildSignInForm (): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

   buildSignUpForm (): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(RegexPattern.password)]],
repeatPassword: ['', [Validators.required, matchOtherValidator('password')]],
      email: ['', [Validators.required, Validators.pattern(RegexPattern.email)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }
}