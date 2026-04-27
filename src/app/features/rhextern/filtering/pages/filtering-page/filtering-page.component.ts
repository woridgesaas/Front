import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { FilterResultsComponent } from '../../components/filter-results/filter-results.component';
import { FiltrageService } from '../../services/filtering.service';
import { Candidate } from '../../models/candidate.model';
import { FilterForm } from '../../models/filter-form.model';
import { FooterComponent } from '../../../../common/footer/footer.component';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-filtering-page',
  standalone: true,
  imports: [
    CommonModule,
    FilterFormComponent,
    FilterResultsComponent,
    RouterOutlet,
    FooterComponent,
    BreadcrumbsComponent,
  ],
  templateUrl: './filtering-page.component.html',
  styleUrls: ['./filtering-page.component.scss'],
})
export class FilteringPageComponent implements OnDestroy {
  candidates: Candidate[] = [];
  isLoading  = false;
  showResults = false;

  // offerId courant — mis à jour à chaque analyse
  private currentOfferId = 0;

  private destroy$ = new Subject<void>();

  constructor(private filtrageService: FiltrageService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Lancement du filtrage IA ──────────────────────────────────────────

  handleFilter(form: FilterForm): void {
    console.log('🚀 Filtrage IA avec critères:', form);
    this.isLoading   = true;
    this.showResults = false;

    this.filtrageService
      .filterCandidates(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          console.log(`✅ ${results.length} candidat(s) trouvé(s)`);
          this.candidates  = results;
          this.isLoading   = false;
          this.showResults = true;
        },
        error: (err) => {
          console.error('❌ Erreur lors du filtrage:', err);
          this.isLoading   = false;
          this.showResults = true;
          this.candidates  = [];
        },
      });
  }

  // ── Réinitialisation ──────────────────────────────────────────────────

  handleReset(): void {
    this.candidates   = [];
    this.showResults  = false;
    this.isLoading    = false;
    this.currentOfferId = 0;
  }

  // ── Actions delegées par FilterResultsComponent ───────────────────────

  handleAction(action: { type: string; candidate: Candidate }): void {
    switch (action.type) {
      case 'accept': this.acceptCandidate(action.candidate); break;
      case 'reject': this.rejectCandidate(action.candidate); break;
      default:       console.warn('Action inconnue:', action.type);
    }
  }

  // ── Accepter un candidat ──────────────────────────────────────────────

  private acceptCandidate(candidate: Candidate): void {
    if (candidate.cvStatus === 'accepted') return;

    this.filtrageService
      .acceptCandidate(candidate.id, this.currentOfferId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.updateLocalStatus(candidate.id, 'accepted'),
        error: (err) => console.error('Erreur acceptation:', err),
      });
  }

  // ── Refuser un candidat ───────────────────────────────────────────────

  private rejectCandidate(candidate: Candidate): void {
    if (candidate.cvStatus === 'rejected') return;

    this.filtrageService
      .rejectCandidate(candidate.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.updateLocalStatus(candidate.id, 'rejected'),
        error: (err) => console.error('Erreur refus:', err),
      });
  }

  // ── Mise à jour locale du cvStatus sans rechargement ─────────────────

  private updateLocalStatus(id: number, status: 'accepted' | 'rejected'): void {
    const idx = this.candidates.findIndex((c) => c.id === id);
    if (idx !== -1) {
      this.candidates[idx] = { ...this.candidates[idx], cvStatus: status };
      this.candidates = [...this.candidates]; // force change detection
    }
  }
}
