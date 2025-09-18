import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, CardModule, InputTextModule, PasswordModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
public signUpForm: FormGroup;

  constructor(private formService: FormService,
    private router: Router
  ) {
    this.signUpForm = this.formService.buildSignUpForm();
  }
}
