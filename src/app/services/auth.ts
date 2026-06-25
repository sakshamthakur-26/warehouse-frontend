import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiURL = `${environment.apiURL}/api/auth`;


  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {
    window.addEventListener('storage', () => {
      this.isLoggedIn.set(!!localStorage.getItem('token'));
    });
  }

  login(data: { username: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, data);
  }

  register(data: { name: string; username: string; password: string }) {
    return this.http.post(`${this.apiURL}/register`, data);
  }

  saveSession(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('username', res.username);
    localStorage.setItem('role', res.role);
    this.isLoggedIn.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.isLoggedIn.set(false);
  }
}