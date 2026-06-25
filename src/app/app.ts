import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Sidebar } from './features/sidebar/sidebar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('WareHouse_Inventory_System');

  private authRoutes = ['/login', '/register'];
  showSidebar = signal(true);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const isAuthRoute = this.authRoutes.includes(this.router.url);
        this.showSidebar.set(!isAuthRoute);
      });
  }
}