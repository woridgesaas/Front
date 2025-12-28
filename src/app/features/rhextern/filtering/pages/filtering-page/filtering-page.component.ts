
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { FilterResultsComponent } from '../../components/filter-results/filter-results.component';
import { FiltrageService } from '../../services/filtering.service';
import { Candidate } from '../../models/candidate.model';
import { FilterForm } from '../../models/filter-form.model';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../../common/footer/footer.component';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-filtering-page',
  standalone: true,
  imports: [CommonModule,
     FilterFormComponent,
     FilterResultsComponent,
     RouterOutlet,
     FooterComponent,
     BreadcrumbsComponent],
  templateUrl: './filtering-page.component.html',
  styleUrls: ['./filtering-page.component.scss']
})
export class FilteringPageComponent implements OnDestroy {
  // État
  candidates: Candidate[] = [];
  isLoading = false;
  showResults = false;

  private destroy$ = new Subject<void>();

  constructor(private filtrageService: FiltrageService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Gère le filtrage des candidats
   */
  handleFilter(form: FilterForm): void {
    console.log(' Filtrage IA avec critères:', form);
    
    this.isLoading = true;
    this.showResults = false;

    this.filtrageService
      .filterCandidates(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          console.log(' Résultats du filtrage:', results.length, 'candidats trouvés');
          this.candidates = results;
          this.isLoading = false;
          this.showResults = true;
        },
        error: (error) => {
          console.error(' Erreur lors du filtrage:', error);
          this.isLoading = false;
          this.showResults = true;
          this.candidates = [];
        }
      });
  }

  /**
   * Réinitialise le formulaire et les résultats
   */
  handleReset(): void {
    console.log(' Réinitialisation du filtrage');
    this.candidates = [];
    this.showResults = false;
    this.isLoading = false;
  }

  /**
   * Gère les actions sur les candidats
   */
  handleAction(action: { type: string; candidate: Candidate }): void {
    console.log(' Action:', action.type, 'pour', action.candidate.name);

    switch (action.type) {
      case 'view':
        this.viewCandidate(action.candidate);
        break;
      case 'accept':
        this.acceptCandidate(action.candidate);
        break;
      case 'reject':
        this.rejectCandidate(action.candidate);
        break;
      case 'download':
        this.downloadCV(action.candidate);
        break;
      default:
        console.warn(' Action inconnue:', action.type);
    }
  }

  /**
   * Affiche les détails d'un candidat
   */
  private viewCandidate(candidate: Candidate): void {
    console.log(' Affichage des détails de:', candidate.name);
    //  Navigation vers la page de détails ou ouverture d'un modal
  }

  /**
   * Accepte un candidat
   */
  private acceptCandidate(candidate: Candidate): void {
    if (candidate.status === 'Accepté') {
      console.log(' Candidat déjà accepté');
      return;
    }

    this.filtrageService
      .updateStatus(candidate.id, 'Accepté')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          candidate.status = 'Accepté';
          console.log(' Candidat accepté:', candidate.name);
        },
        error: (error) => {
          console.error(' Erreur lors de l\'acceptation:', error);
        }
      });
  }

  /**
   * Refuse un candidat
   */
  private rejectCandidate(candidate: Candidate): void {
    if (candidate.status === 'Refusé') {
      console.log(' Candidat déjà refusé');
      return;
    }

    this.filtrageService
      .updateStatus(candidate.id, 'Refusé')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          candidate.status = 'Refusé';
          console.log(' Candidat refusé:', candidate.name);
        },
        error: (error) => {
          console.error(' Erreur lors du refus:', error);
        }
      });
  }

  /**
   * Télécharge le CV d'un candidat
   */
  private downloadCV(candidate: Candidate): void {
    console.log(' Téléchargement du CV de:', candidate.name);
    
    if (!candidate.cvUrl) {
      console.error(' Aucun CV disponible pour ce candidat');
      return;
    }

    this.filtrageService.downloadCV(candidate.cvUrl);
  }
}