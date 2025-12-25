import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';

// Interface Candidat
export interface CandidateInfo {
  id: number;
  Candidate_ID: string;
  Name: string;
  Email: string;
  Phone: string;
  Score_IA: number;
  Experience_Years: number;
  Skills: string[];
  Location: string;
  CV_URL: string;
  Status: 'En attente' | 'Accepté' | 'Refusé';
  Contract_Type?: string;
  Languages?: { langue: string; niveau: string }[];
  Diploma?: string;
  Tools?: string[];
  Certifications?: string[];
  Soft_Skills?: string[];
  Sector?: string;
  isSelected?: boolean;
}

// Interface Formulaire
interface FiltrageForm {
  competences: string[];
  outils: string[];
  experience: string;
  diplome: string;
  langues: { langue: string; niveau: string }[];
  localisation: string;
  certifications: string;
  soft_skills: string[];
}

@Component({
  selector: 'app-filtrage-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSortModule,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './filtrage-list.component.html',
  styleUrls: ['./filtrage-list.component.scss'],
})
export class FiltrageListComponent implements OnDestroy {
  initChecked = false;

  // Variables de pagination
  public pageSize = 10;
  public tableData: CandidateInfo[] = [];
  public actualData: CandidateInfo[] = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<CandidateInfo>;

  // Modal pour voir toutes les compétences
  showAllSkillsModal = false;
  selectedCandidateSkills: string[] = [];

  // Formulaire de filtrage
  filtrageForm: FiltrageForm = {
    competences: [],
    outils: [],
    experience: '',
    diplome: '',
    langues: [],
    localisation: '',
    certifications: '',
    soft_skills: [],
  };

  // Inputs temporaires pour tags
  competenceInput = '';
  outilInput = '';
  langueInput = '';
  niveauInput = '';

  // Listes prédéfinies
  competencesDisponibles = [
    'Angular',
    'React',
    'Vue.js',
    'Node.js',
    'Python',
    'Java',
    'PHP',
    'C#',
    'JavaScript',
    'TypeScript',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Machine Learning',
    'Data Science',
  ];

  outilsDisponibles = [
    'Git',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'GitLab CI',
    'Jira',
    'Confluence',
    'Trello',
    'Slack',
    'VS Code',
    'IntelliJ',
    'Postman',
    'Figma',
    'Adobe XD',
    'Photoshop',
  ];

  experiencesDisponibles = [
    '0-1 an',
    '1-2 ans',
    '2-3 ans',
    '3-5 ans',
    '5-7 ans',
    '7-10 ans',
    '10+ ans',
  ];

  diplomesDisponibles = [
    'Bac',
    'Bac+2 (DUT/BTS)',
    'Bac+3 (Licence)',
    'Bac+5 (Master/Ingénieur)',
    'Bac+8 (Doctorat)',
  ];

  languesDisponibles = [
    'Français',
    'Anglais',
    'Arabe',
    'Espagnol',
    'Allemand',
    'Italien',
  ];

  niveauxLangue = [
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Courant',
    'Bilingue',
  ];

  softSkillsDisponibles = [
    'Leadership',
    'Communication',
    'Travail en équipe',
    'Créativité',
    'Problem solving',
    'Gestion du temps',
    'Adaptabilité',
    'Autonomie',
    'Esprit critique',
    'Gestion de projet',
  ];

  localisationsDisponibles = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fès',
    'Tanger',
    'Agadir',
    'Oujda',
    'Kenitra',
    'Tétouan',
    'Meknès',
  ];

  filteredLocalisations: string[] = [];
  filteredCompetences: string[] = [];
  filteredOutils: string[] = [];

  // États
  isLoading = false;
  showResults = false;
  isOpen = false;

  // Données mockées
  private mockCandidates: CandidateInfo[] = [
    {
      id: 1,
      Candidate_ID: 'CAN-001',
      Name: 'Youssef Benali',
      Email: 'y.benali@email.com',
      Phone: '0612345678',
      Score_IA: 95,
      Experience_Years: 5,
      Skills: ['Angular', 'Node.js', 'MongoDB', 'TypeScript', 'Docker'],
      Location: 'Casablanca',
      CV_URL: 'assets/cv/youssef_benali.pdf',
      Status: 'En attente',
      Contract_Type: 'CDI',
      Languages: [
        { langue: 'Français', niveau: 'Courant' },
        { langue: 'Anglais', niveau: 'Avancé' },
      ],
      Diploma: 'Bac+5 (Master/Ingénieur)',
      Tools: ['Git', 'Docker', 'Jenkins'],
      Certifications: ['AWS Certified', 'Angular Expert'],
      Soft_Skills: ['Leadership', 'Communication', 'Travail en équipe'],
      Sector: 'Informatique',
      isSelected: false,
    },
    {
      id: 2,
      Candidate_ID: 'CAN-002',
      Name: 'Fatima El Amrani',
      Email: 'f.elamrani@email.com',
      Phone: '0698765432',
      Score_IA: 88,
      Experience_Years: 3,
      Skills: ['Figma', 'Adobe XD', 'Photoshop', 'React'],
      Location: 'Rabat',
      CV_URL: 'assets/cv/fatima_elamrani.pdf',
      Status: 'Accepté',
      Contract_Type: 'CDI',
      Languages: [
        { langue: 'Français', niveau: 'Bilingue' },
        { langue: 'Anglais', niveau: 'Intermédiaire' },
      ],
      Diploma: 'Bac+3 (Licence)',
      Tools: ['Figma', 'Adobe XD', 'Git'],
      Certifications: ['UX Design Certificate'],
      Soft_Skills: ['Créativité', 'Communication', 'Autonomie'],
      Sector: 'Design',
      isSelected: false,
    },
    {
      id: 3,
      Candidate_ID: 'CAN-003',
      Name: 'Mohammed Chakir',
      Email: 'm.chakir@email.com',
      Phone: '0656789012',
      Score_IA: 92,
      Experience_Years: 7,
      Skills: ['React', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
      Location: 'Marrakech',
      CV_URL: 'assets/cv/mohammed_chakir.pdf',
      Status: 'Refusé',
      Contract_Type: 'CDI',
      Languages: [
        { langue: 'Français', niveau: 'Courant' },
        { langue: 'Anglais', niveau: 'Courant' },
      ],
      Diploma: 'Bac+5 (Master/Ingénieur)',
      Tools: ['Git', 'Docker', 'Kubernetes', 'Jira'],
      Certifications: ['AWS Solutions Architect', 'Python Expert'],
      Soft_Skills: ['Problem solving', 'Autonomie', 'Leadership'],
      Sector: 'Informatique',
      isSelected: false,
    },
  ];

  constructor() {
    this.filteredLocalisations = this.localisationsDisponibles;
  }

  ngOnDestroy(): void {
    this.isOpen = false;
    this.showAllSkillsModal = false;
  }

  // Gestion des tags de compétences avec autocomplete
  ajouterCompetence(): void {
    const comp = this.competenceInput.trim();
    if (comp && !this.filtrageForm.competences.includes(comp)) {
      this.filtrageForm.competences.push(comp);
      this.competenceInput = '';
      this.filteredCompetences = [];
    }
  }

  supprimerCompetence(comp: string): void {
    const index = this.filtrageForm.competences.indexOf(comp);
    if (index >= 0) {
      this.filtrageForm.competences.splice(index, 1);
    }
  }

  filterCompetences(): void {
    const search = this.competenceInput.toLowerCase();
    if (search) {
      this.filteredCompetences = this.competencesDisponibles.filter(
        (comp) =>
          comp.toLowerCase().includes(search) &&
          !this.filtrageForm.competences.includes(comp)
      );
    } else {
      this.filteredCompetences = [];
    }
  }

  selectCompetence(comp: string): void {
    if (!this.filtrageForm.competences.includes(comp)) {
      this.filtrageForm.competences.push(comp);
      this.competenceInput = '';
      this.filteredCompetences = [];
    }
  }

  // Gestion des outils techniques avec autocomplete
  ajouterOutil(): void {
    const outil = this.outilInput.trim();
    if (outil && !this.filtrageForm.outils.includes(outil)) {
      this.filtrageForm.outils.push(outil);
      this.outilInput = '';
      this.filteredOutils = [];
    }
  }

  supprimerOutil(outil: string): void {
    const index = this.filtrageForm.outils.indexOf(outil);
    if (index >= 0) {
      this.filtrageForm.outils.splice(index, 1);
    }
  }

  filterOutils(): void {
    const search = this.outilInput.toLowerCase();
    if (search) {
      this.filteredOutils = this.outilsDisponibles.filter(
        (outil) =>
          outil.toLowerCase().includes(search) &&
          !this.filtrageForm.outils.includes(outil)
      );
    } else {
      this.filteredOutils = [];
    }
  }

  selectOutil(outil: string): void {
    if (!this.filtrageForm.outils.includes(outil)) {
      this.filtrageForm.outils.push(outil);
      this.outilInput = '';
      this.filteredOutils = [];
    }
  }

  // Gestion des langues avec niveau
  ajouterLangue(): void {
    if (this.langueInput && this.niveauInput) {
      const existe = this.filtrageForm.langues.find(
        (l) => l.langue === this.langueInput
      );
      if (!existe) {
        this.filtrageForm.langues.push({
          langue: this.langueInput,
          niveau: this.niveauInput,
        });
        this.langueInput = '';
        this.niveauInput = '';
      }
    }
  }

  supprimerLangue(langue: { langue: string; niveau: string }): void {
    const index = this.filtrageForm.langues.indexOf(langue);
    if (index >= 0) {
      this.filtrageForm.langues.splice(index, 1);
    }
  }

  // Gestion des soft skills (checkbox)
  toggleSoftSkill(skill: string): void {
    const index = this.filtrageForm.soft_skills.indexOf(skill);
    if (index >= 0) {
      this.filtrageForm.soft_skills.splice(index, 1);
    } else {
      this.filtrageForm.soft_skills.push(skill);
    }
  }

  isSoftSkillSelected(skill: string): boolean {
    return this.filtrageForm.soft_skills.includes(skill);
  }

  // Autocomplete localisation
  filterLocalisations(): void {
    const search = this.filtrageForm.localisation.toLowerCase();
    this.filteredLocalisations = this.localisationsDisponibles.filter((loc) =>
      loc.toLowerCase().includes(search)
    );
  }

  selectLocalisation(loc: string): void {
    this.filtrageForm.localisation = loc;
    this.filteredLocalisations = [];
  }

  // Modal compétences
  voirToutesCompetences(skills: string[]): void {
    this.selectedCandidateSkills = skills;
    this.showAllSkillsModal = true;
  }

  fermerModalCompetences(): void {
    this.showAllSkillsModal = false;
    this.selectedCandidateSkills = [];
  }

  // Filtrage par IA
  public filtrageParIA(): void {
    this.isLoading = true;
    this.showResults = false;

    setTimeout(() => {
      let filteredCandidates = [...this.mockCandidates];

      // Filtrage par compétences
      if (this.filtrageForm.competences.length > 0) {
        filteredCandidates = filteredCandidates.filter((c) =>
          this.filtrageForm.competences.some((comp) =>
            c.Skills.some((skill) =>
              skill.toLowerCase().includes(comp.toLowerCase())
            )
          )
        );
      }

      // Filtrage par outils
      if (this.filtrageForm.outils.length > 0) {
        filteredCandidates = filteredCandidates.filter(
          (c) =>
            c.Tools &&
            this.filtrageForm.outils.some((outil) =>
              c.Tools!.some((t) =>
                t.toLowerCase().includes(outil.toLowerCase())
              )
            )
        );
      }

      // Filtrage par expérience
      if (this.filtrageForm.experience) {
        const expRange = this.filtrageForm.experience;
        if (expRange === '0-1 an') {
          filteredCandidates = filteredCandidates.filter(
            (c) => c.Experience_Years <= 1
          );
        } else if (expRange === '1-2 ans') {
          filteredCandidates = filteredCandidates.filter(
            (c) => c.Experience_Years >= 1 && c.Experience_Years <= 2
          );
        } else if (expRange === '2-3 ans') {
          filteredCandidates = filteredCandidates.filter(
            (c) => c.Experience_Years >= 2 && c.Experience_Years <= 3
          );
        } else if (expRange === '3-5 ans') {
          filteredCandidates = filteredCandidates.filter(
            (c) => c.Experience_Years >= 3 && c.Experience_Years <= 5
          );
        } else if (expRange === '5-7 ans') {
          filteredCandidates = filteredCandidates.filter(
            (c) => c.Experience_Years >= 5 && c.Experience_Years <= 7
          );
        } else if (expRange === '7-10 ans') {
          filteredCandidates = filteredCandidates.filter(
            (c) => c.Experience_Years >= 7 && c.Experience_Years <= 10
          );
        } else if (expRange === '10+ ans') {
          filteredCandidates = filteredCandidates.filter(
            (c) => c.Experience_Years >= 10
          );
        }
      }

      // Filtrage par diplôme
      if (this.filtrageForm.diplome) {
        filteredCandidates = filteredCandidates.filter(
          (c) => c.Diploma === this.filtrageForm.diplome
        );
      }

      // Filtrage par langues
      if (this.filtrageForm.langues.length > 0) {
        filteredCandidates = filteredCandidates.filter(
          (c) =>
            c.Languages &&
            this.filtrageForm.langues.every((fl) =>
              c.Languages!.some((cl) => cl.langue === fl.langue)
            )
        );
      }

      // Filtrage par localisation
      if (this.filtrageForm.localisation) {
        filteredCandidates = filteredCandidates.filter((c) =>
          c.Location.toLowerCase().includes(
            this.filtrageForm.localisation.toLowerCase()
          )
        );
      }

      // Filtrage par certifications
      if (this.filtrageForm.certifications) {
        const certs = this.filtrageForm.certifications.toLowerCase();
        filteredCandidates = filteredCandidates.filter(
          (c) =>
            c.Certifications &&
            c.Certifications.some((cert) => cert.toLowerCase().includes(certs))
        );
      }

      // Filtrage par soft skills
      if (this.filtrageForm.soft_skills.length > 0) {
        filteredCandidates = filteredCandidates.filter(
          (c) =>
            c.Soft_Skills &&
            this.filtrageForm.soft_skills.every((ss) =>
              c.Soft_Skills!.includes(ss)
            )
        );
      }

      // Trier par score IA
      filteredCandidates.sort((a, b) => b.Score_IA - a.Score_IA);

      this.actualData = filteredCandidates;
      this.tableData = filteredCandidates;
      this.totalData = filteredCandidates.length;
      this.dataSource = new MatTableDataSource<CandidateInfo>(this.actualData);

      this.isLoading = false;
      this.showResults = true;
    }, 2000);
  }

  public resetForm(): void {
    this.filtrageForm = {
      competences: [],
      outils: [],
      experience: '',
      diplome: '',
      langues: [],
      localisation: '',
      certifications: '',
      soft_skills: [],
    };
    this.competenceInput = '';
    this.outilInput = '';
    this.langueInput = '';
    this.niveauInput = '';
    this.showResults = false;
    this.tableData = [];
  }

  public sortData(sort: Sort): void {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
  }

  selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
  }

  public acceptCandidate(candidate: CandidateInfo): void {
    candidate.Status = 'Accepté';
  }

  public refuseCandidate(candidate: CandidateInfo): void {
    candidate.Status = 'Refusé';
  }

  public downloadCV(candidate: CandidateInfo): void {
    window.open(candidate.CV_URL, '_blank');
  }

  public viewCandidate(candidate: CandidateInfo): void {
    console.log('Voir:', candidate.Name);
  }

  public getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'En attente': 'badge-warning',
      Accepté: 'badge-success',
      Refusé: 'badge-danger',
    };
    return classes[status] || 'badge-secondary';
  }

  public getScoreColor(score: number): string {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-info';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  }
}
