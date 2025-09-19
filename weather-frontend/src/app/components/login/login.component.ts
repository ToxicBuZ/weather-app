import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { FormService } from '../../services/form.service';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService, UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  public signInForm: FormGroup;
  private subscriptions: Subscription;

  constructor(
    private formService: FormService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.signInForm = this.formService.buildSignInForm();
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  public onSignIn() {
    this.subscriptions.add(
      this.userService
        .signIn(this.signInForm.get('username')?.value, this.signInForm.get('password')?.value)
        .subscribe(result => {
          if (Object.keys(result).length === 0) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials' });
          } else {
            this.router.navigate(['/']);
          }
        })
    );
  }

  public onSignUp() {
    this.router.navigate(['/signup']);
  }
}
