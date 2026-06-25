import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = { username: '', password: '' };
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  login() {
    this.errorMessage = '';

    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        this.auth.saveSession(res);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }
}
