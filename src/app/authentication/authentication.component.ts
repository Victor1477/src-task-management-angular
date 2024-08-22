import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'authentication-page',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    this.isError = false;
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .then(() => {
        this.router.navigate(['/tasks']);
      })
      .catch(() => {
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onChange(event: any, focusOut: boolean = false) {
    this.isError = false;
    if (focusOut && !event.target.value) {
      event.target.parentNode.classList.remove('open');
      return;
    }
    event.target.parentNode.classList.add('open');
  }
}
