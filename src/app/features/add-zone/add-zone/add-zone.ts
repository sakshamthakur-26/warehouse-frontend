import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Zones } from '../../../models/zones';


@Component({
  selector: 'app-add-zone',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-zone.html',
  styleUrl: './add-zone.css',
})
export class AddZone implements OnInit {
  z: Zones = new Zones();
  zones: any[] = [];

  errorMessage: string = '';

  searchText: string = '';
  showModal: boolean = false;

  constructor(
    private client: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadZone();
  }

  loadZone() {
    console.log('Loading zones...');
    this.client.get<any[]>('http://localhost:5281/api/Zones').subscribe({
      next: (data) => {
        console.log('Zones data:', data);
        this.zones = data;
        this.cd.detectChanges();
      },
      error: () => {
        this.zones = [];
      },
    });
  }

  isValidZoneName(name: string): boolean {
    const value = name.trim();
    return /^[A-Za-z]+( ?[A-Za-z]+)?$/.test(value);
  }

  addZone() {
    //  VALIDATION: Capacity limit

    if (this.z.maxcapacity > 5000) {
      this.errorMessage = 'Capacity cannot exceed 5000 units';
      return;
    }

    //  Clear previous error
    this.errorMessage = '';

    this.client.post('http://localhost:5281/api/Zones', this.z).subscribe({
      next: () => {
        alert('Zone added successfully');

        this.z = new Zones();

        this.loadZone();
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Zone already exists';
        } else {
          this.errorMessage = 'Something went wrong';
        }
      },
    });
  }

  editZone(zone: any) {
    this.z.name = zone.name;
    this.z.maxcapacity = zone.maxCapacity;
    this.z.currentUsage = zone.currentUsage;

    this.showModal = true;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  formatZoneName() {
    if (!this.z.name) return;

    let val = this.z.name.trim().toLowerCase();

    // convert "zone a"
    if (val.startsWith('zone')) {
      val = 'Zone ' + val.replace('zone', '').trim().toUpperCase();
    }

    this.z.name = val;
  }
}
