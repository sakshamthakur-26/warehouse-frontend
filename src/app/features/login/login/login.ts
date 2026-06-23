import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule , RouterModule , CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginData = { username: '', password: '' };

constructor(private auth: AuthService, private router: Router) {}

login() {
  this.auth.login(this.loginData).subscribe({
    next: (res) => {
      this.auth.saveToken(res.token);

      window.dispatchEvent(new Event('storage'));

      this.router.navigate(['/dashboard']); 
    },
    error: () => alert('Login failed')
  });
}
}
