import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../services/category';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-assign-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './assign-category.html',
  styleUrls: ['./assign-category.css'],
})
export class AssignCategory implements OnInit {
  @Input() zoneId!: number; // Passed from parent
   @Input() zoneName: string = '';
  @Output() close = new EventEmitter<void>();

  categoryForm: FormGroup;
  zonesList: Array<any> = [];
  errorMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public catService: Category,
    private http: HttpClient,
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      dedicatedZoneId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.catService.loadAllCategories();

    this.http.get<any[]>(`${environment.apiURL}/api/Zones`).subscribe({
      next: (data) => (this.zonesList = data),
      error: () => (this.zonesList = []),
    });

    // pre-select the zone this modal was opened from
    this.categoryForm.patchValue({ dedicatedZoneId: this.zoneId });
  }

  async onSubmit() {
    if (this.categoryForm.invalid) return;

    this.errorMessage = '';
    this.isSubmitting = true;

    const name = (this.categoryForm.value.categoryName || '').trim();
    const zoneId = this.categoryForm.value.dedicatedZoneId ?? this.zoneId;

    const existing = this.catService.CategoriesName?.() ?? [];

    try {
      if (existing.includes(name)) {
        await this.catService.assignCategoryToZone(name, zoneId);
      } else {
        await this.catService.createCategory({ name, dedicatedZoneId: zoneId });
      }
      this.catService.loadAllCategories(); // refresh list for next time modal opens
      this.close.emit();
    } catch (err: any) {
      this.errorMessage = err?.error || 'Something went wrong. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  cancel() {
    this.categoryForm.reset();
    this.close.emit();
  }

  zones(): any[] {
    return this.zonesList;
  }
}