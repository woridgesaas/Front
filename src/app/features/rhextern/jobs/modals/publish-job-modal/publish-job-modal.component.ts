import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsInfo, Plateforme } from '../../models/jobs.model';

@Component({
  selector: 'app-publish-job-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publish-job-modal.component.html',
  styles: [`
    .modal.show { display: block !important; }
    .modal-backdrop { background-color: rgba(0,0,0,0.5); }
  `]
})
export class PublishJobModalComponent {
  @Input() isVisible = false;
  @Input() job!: JobsInfo;
  @Input() plateformes: Plateforme[] = [];

  // Options supplémentaires
  notifyHrTeam = true;
  isFeatured = false;

  @Output() closed = new EventEmitter<void>();
  @Output() published = new EventEmitter<{
    job: JobsInfo;
    canalNames: string[];
    notifyHrTeam: boolean;
    isFeatured: boolean;
  }>();

  close(): void {
    this.closed.emit();
  }

  // ← Toggle géré directement ici
  togglePlateforme(plateforme: Plateforme): void {
    plateforme.selectionnee = !plateforme.selectionnee;
  }

  publish(): void {
    const selected = this.plateformes.filter(p => p.selectionnee);

    if (selected.length === 0) {
      alert('⚠️ Veuillez sélectionner au moins une plateforme');
      return;
    }

    // Mapper ids → noms canaux API
    const canalMap: Record<string, string> = {
      'linkedin': 'LinkedIn',
      'indeed': 'Indeed',
      'facebook': 'Facebook',
      'site': 'SiteEntreprise'
    };

    const canalNames = selected
      .map(p => canalMap[p.id])
      .filter(Boolean);

    this.published.emit({
      job: this.job,
      canalNames,
      notifyHrTeam: this.notifyHrTeam,
      isFeatured: this.isFeatured
    });
  }
}