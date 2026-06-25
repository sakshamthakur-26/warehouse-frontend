import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashboardSummary } from '../models/dashboard-summary';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  private apiURL = `${environment.apiURL}/api/dashboard/summary`;

  public summaryData = signal<DashboardSummary | null>(null);

  constructor(private http: HttpClient) {}

  //  The async fetch method triggered by your component
  async loadDashboardMetrics(): Promise<void> {
    try {
      // Fetch the data and convert the Observable to a Promise
      const data = await firstValueFrom(this.http.get<DashboardSummary>(this.apiURL));

      // Push the fresh data into the Signal. Your HTML will instantly update!
      this.summaryData.set(data);
      console.log('Dashboard metrics loaded:', data);
    } catch (error) {
      console.error('Failed to load dashboard metrics. Is the C# backend running?', error);
    }
  }
}
