import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './features/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  protected readonly title = signal('WareHouse_Inventory_System');

  // SIGNAL (reactive)
  isLoggedIn = signal(!!localStorage.getItem('token'));

  constructor() {

    // update signal when storage changes
    window.addEventListener('storage', () => {
      this.isLoggedIn.set(!!localStorage.getItem('token'));
    });

  }

}
