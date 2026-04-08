import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { JobsInfo } from '../../models/jobs.model';
import { JobOfferApiService, JobTypeApiDto } from '../../services/job-offer-api.service';

@Component({
  selector: 'app-edit-job-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEditorModule],
  templateUrl: './edit-job-modal.component.html',
  styles: [`
    .modal.show { display: block !important; }
    .modal-backdrop { background-color: rgba(0,0,0,0.5); }
  `]
})
export class EditJobModalComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;
  @Input() job!: JobsInfo;

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<JobsInfo>();

  // JobTypes chargés depuis l'API
  jobTypes: JobTypeApiDto[] = [];

  // NGX Editor
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private apiService: JobOfferApiService) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.loadJobTypes();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // Charge les catégories depuis l'API .NET
  private loadJobTypes(): void {
    this.apiService.getJobTypes().subscribe({
      next: (response) => {
        this.jobTypes = response.data;
        console.log('✅ JobTypes chargés:', this.jobTypes);
      },
      error: (err) => {
        console.error('❌ Erreur chargement JobTypes:', err);
      }
    });
  }

  close(): void {
    this.closed.emit();
  }

  save(): void {
    this.saved.emit(this.job);
  }
}