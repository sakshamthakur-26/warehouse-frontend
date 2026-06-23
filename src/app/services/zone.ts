import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Zone {

  private http = inject(HttpClient);

  // Private writable signal, public readonly signal
  private zonesSignal = signal<Zone[]>([]);
  public zones = this.zonesSignal.asReadonly();

  async loadZones(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<Zone[]>('/api/zone')
      );
      this.zonesSignal.set(data);
    } catch (err) {
      console.error('Failed to load zones', err);
      this.zonesSignal.set([]);
    }
  }
}
