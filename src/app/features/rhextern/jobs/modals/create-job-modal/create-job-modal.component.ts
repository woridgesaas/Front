import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsInfo } from '../../models/jobs.model';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-create-job-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  templateUrl: './create-job-modal.component.html',
  styles: [`
    .modal.show { display: block !important; }
    .modal-backdrop { background-color: rgba(0,0,0,0.5); }
  `]
})
export class CreateJobModalComponent implements OnInit, OnDestroy {
  // NGX Editor
  editor!: Editor;
  
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  // Inputs
  @Input() isVisible = false;
  @Input() job!: JobsInfo;

  // Outputs
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<JobsInfo>();

  ngOnInit(): void {
    // Initialiser l'éditeur
    this.editor = new Editor();
    
    // S'assurer que Description existe
    if (this.job && this.job.Description === undefined) {
      this.job.Description = '';
    }
  }

  ngOnDestroy(): void {
    // IMPORTANT : Détruire l'éditeur pour éviter les fuites mémoire
    this.editor.destroy();
  }

  close(): void {
    this.closed.emit();
  }

  save(): void {
    if (this.validateJob()) {
      this.saved.emit(this.job);
    } else {
      alert('⚠️ Veuillez remplir tous les champs obligatoires (*)');
    }
  }

  private validateJob(): boolean {
    return !!(
      this.job?.Job_Title?.trim() &&
      this.job?.Category?.trim() &&
      this.job?.Roll?.trim() &&
      this.job?.Location?.trim()
    );
  }
}