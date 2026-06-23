import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  
constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); 

    // trigger UI update (for your signal setup)
    window.dispatchEvent(new Event('storage'));

    this.router.navigate(['/login']); 
  }

}
