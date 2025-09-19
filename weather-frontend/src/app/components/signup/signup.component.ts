import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    Toast
  ],
  providers: [MessageService, UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy {
  public signUpForm: FormGroup;
  private subscriptions: Subscription;

  constructor(
    private formService: FormService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {
    this.signUpForm = this.formService.buildSignUpForm();
    this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public createAccount(): void {
    console.log('called');
    this.signUpForm.markAllAsTouched();
    console.log(this.signUpForm.value);

    if (!this.signUpForm.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill the form correctly' });
      return;
    }

    this.subscriptions.add(
      this.userService.createUser(this.signUpForm.value as User).subscribe(result => {
        if (Object.keys(result).length > 0) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sign Up successfull' });
          this.signUpForm.reset();
          this.subscriptions.add(
            timer(3000).subscribe(() => {
              this.router.navigate(['/login']);
            })
          );
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sign Up failed' });
        }
      })
    );
  }
}
