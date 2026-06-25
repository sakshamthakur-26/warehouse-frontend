import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule , RouterModule , CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  
user = {
  name: '', 
  username: '',
  password: ''
};

constructor(private auth: AuthService, private router: Router) {}

register() {
  this.auth.register(this.user).subscribe({
    next: () => {
      // alert("Registration successful");
      this.router.navigate(['/login']);
    },
    error: (err) => {
      if (err.status === 409) {
        // alert("Username already exists");
      } else {
        console.log("error:",err);
        alert("Registration failed. Try again.");
      }
    }
  });
}


}
