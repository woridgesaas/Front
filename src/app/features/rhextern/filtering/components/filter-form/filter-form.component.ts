import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterForm } from '../../models/filter-form.model';
import { Language, LanguageLevel } from '../../models/candidate.model';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent {
  @Output() onFilter = new EventEmitter<FilterForm>();
  @Output() onReset = new EventEmitter<void>();

  submitted = false;

  form: FilterForm = {
    jobTitle: '',
    skills: [],
    tools: [],
    experience: '',
    diploma: '',
    languages: [],
    location: '',
    certifications: '',
    softSkills: [],
  };

  // Inputs tags
  skillInput = '';
  toolInput = '';
  jobTitleInput = '';

  // Langues temporaires
  tempLanguage = '';
  tempLevel = '';

  // Listes filtrées autocomplete
  filteredSkills: string[] = [];
  filteredTools: string[] = [];
  filteredJobTitles: string[] = [];

  // ── Traductions FR → EN ─────────────────────────────────────────────

  private readonly diplomaMap: Record<string, string> = {
    Bac: 'High School',
    'Bac+2 (DUT/BTS)': 'Associate',
    'Bac+3 (Licence)': 'Bachelor',
    'Bac+5 (Master/Ingénieur)': 'Master',
    'Bac+8 (Doctorat)': 'PhD',
    'Tous les diplômes': '',
  };

  private readonly experienceMap: Record<string, number> = {
    '0-1 an': 0,
    '1-2 ans': 1,
    '2-3 ans': 2,
    '3-5 ans': 3,
    '5-7 ans': 5,
    '7-10 ans': 7,
    '10+ ans': 10,
  };

  private readonly languageMap: Record<string, string> = {
    Français: 'French',
    Anglais: 'English',
    Arabe: 'Arabic',
    Espagnol: 'Spanish',
    Allemand: 'German',
    Italien: 'Italian',
    Portugais: 'Portuguese',
    Chinois: 'Chinese',
  };

  private readonly levelMap: Record<string, string> = {
    Débutant: 'A1',
    Intermédiaire: 'B1',
    Avancé: 'B2',
    Courant: 'C1',
    Bilingue: 'C2',
  };

  private readonly locationMap: Record<string, string> = {
    Casablanca: 'Casablanca',
    Rabat: 'Rabat',
    Marrakech: 'Marrakech',
    Fès: 'Fes',
    Tanger: 'Tangier',
    Agadir: 'Agadir',
    Oujda: 'Oujda',
    Kenitra: 'Kenitra',
    Tétouan: 'Tetouan',
    Meknès: 'Meknes',
    Salé: 'Sale',
    Temara: 'Temara',
    Mohammedia: 'Mohammedia',
    'El Jadida': 'El Jadida',
  };

  private readonly softSkillMap: Record<string, string> = {
    Leadership: 'Leadership',
    Communication: 'Communication',
    'Travail en équipe': 'Teamwork',
    Créativité: 'Creativity',
    'Résolution de problèmes': 'Problem Solving',
    'Gestion du temps': 'Time Management',
    Adaptabilité: 'Adaptability',
    Autonomie: 'Autonomy',
    'Esprit critique': 'Critical Thinking',
    'Gestion de projet': 'Project Management',
    Négociation: 'Negotiation',
    Empathie: 'Empathy',
  };

  // ── Construit le FormData traduit avant émission ─────────────────────

  private buildTranslatedForm(): FilterForm {
    return {
      ...this.form,
      diploma: this.diplomaMap[this.form.diploma] ?? this.form.diploma,
      location: this.locationMap[this.form.location] ?? this.form.location,
      softSkills: this.form.softSkills.map((s) => this.softSkillMap[s] ?? s),
      languages: this.form.languages.map((l) => ({
        name: this.languageMap[l.name] ?? l.name,
        level: (this.levelMap[l.level] ?? l.level) as LanguageLevel, // ← cast ici
      })),
      experienceMin: this.experienceMap[this.form.experience] ?? 0,
    };
  }

  // ── jobTitle autocomplete ────────────────────────────────────────────

  readonly jobTitleOptions = [
    'Accountant',
    'Advocate',
    'Agriculture',
    'Apparel',
    'Architecture',
    'Arts',
    'Automobile',
    'Aviation',
    'BPO',
    'Banking',
    'Blockchain',
    'Building and Construction',
    'Business Analyst',
    'Civil Engineer',
    'Consultant',
    'Data Science',
    'Database',
    'Designing',
    'DevOps',
    'Digital Media',
    'DotNet Developer',
    'ETL Developer',
    'Education',
    'Electrical Engineering',
    'Finance',
    'Food and Beverages',
    'Health and Fitness',
    'Human Resources',
    'Information Technology',
    'Java Developer',
    'Management',
    'Mechanical Engineer',
    'Network Security Engineer',
    'Operations Manager',
    'PMO',
    'Public Relations',
    'Python Developer',
    'React Developer',
    'SAP Developer',
    'SQL Developer',
    'Sales',
    'Testing',
    'Web Designing',
  ];

  filterJobTitles(value: string = ''): void {
  const input = (value || this.jobTitleInput).toLowerCase().trim();
  if (!input) {
    this.form.jobTitle     = '';
    this.filteredJobTitles = [];
    return;
  }
  this.filteredJobTitles = this.jobTitleOptions
    .filter(t => t.toLowerCase().includes(input))
    .slice(0, 8);
}

  selectJobTitle(title: string): void {
    this.form.jobTitle = title;
    this.jobTitleInput = title;
    this.filteredJobTitles = [];
  }

  clearJobTitle(): void {
    this.form.jobTitle = '';
    this.jobTitleInput = '';
    this.filteredJobTitles = [];
  }


  onJobTitleBlur(): void {
    setTimeout(() => {
      this.filteredJobTitles = [];
    }, 150);
  }

  // ── Skills ───────────────────────────────────────────────────────────

  readonly availableSkills = [
    'Angular',
    'React',
    'Vue.js',
    'Node.js',
    'Python',
    'Java',
    'TypeScript',
    'JavaScript',
    'PHP',
    'C#',
    'C++',
    'Ruby',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'Oracle',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'GCP',
    'Spring Boot',
    'Django',
    'Laravel',
    'Express.js',
    '.NET',
  ];

  filterSkills(): void {
    const input = this.skillInput.toLowerCase().trim();
    if (!input) {
      this.filteredSkills = [];
      return;
    }
    this.filteredSkills = this.availableSkills
      .filter(
        (s) => s.toLowerCase().includes(input) && !this.form.skills.includes(s)
      )
      .slice(0, 10);
  }

  selectSkill(skill: string): void {
    if (!this.form.skills.includes(skill)) this.form.skills.push(skill);
    this.skillInput = '';
    this.filteredSkills = [];
  }

  addSkill(): void {
    const skill = this.skillInput.trim();
    if (skill && !this.form.skills.includes(skill)) {
      this.form.skills.push(skill);
      this.skillInput = '';
      this.filteredSkills = [];
    }
  }

  removeSkill(skill: string): void {
    this.form.skills.splice(this.form.skills.indexOf(skill), 1);
  }

  // ── Tools ────────────────────────────────────────────────────────────

  readonly availableTools = [
    'Git',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'GitLab CI',
    'CircleCI',
    'Jira',
    'Confluence',
    'Trello',
    'Asana',
    'Notion',
    'VS Code',
    'IntelliJ',
    'Eclipse',
    'PyCharm',
    'Postman',
    'Insomnia',
    'Swagger',
    'Figma',
    'Adobe XD',
    'Sketch',
  ];

  filterTools(): void {
    const input = this.toolInput.toLowerCase().trim();
    if (!input) {
      this.filteredTools = [];
      return;
    }
    this.filteredTools = this.availableTools
      .filter(
        (t) => t.toLowerCase().includes(input) && !this.form.tools.includes(t)
      )
      .slice(0, 10);
  }

  selectTool(tool: string): void {
    if (!this.form.tools.includes(tool)) this.form.tools.push(tool);
    this.toolInput = '';
    this.filteredTools = [];
  }

  addTool(): void {
    const tool = this.toolInput.trim();
    if (tool && !this.form.tools.includes(tool)) {
      this.form.tools.push(tool);
      this.toolInput = '';
      this.filteredTools = [];
    }
  }

  removeTool(tool: string): void {
    this.form.tools.splice(this.form.tools.indexOf(tool), 1);
  }

  // ── Langues ──────────────────────────────────────────────────────────

  readonly availableLanguages = [
    'Français',
    'Anglais',
    'Arabe',
    'Espagnol',
    'Allemand',
    'Italien',
    'Portugais',
    'Chinois',
  ];

  readonly languageLevels = [
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Courant',
    'Bilingue',
  ];

  addLanguage(): void {
    if (!this.tempLanguage || !this.tempLevel) return;
    if (this.form.languages.find((l) => l.name === this.tempLanguage)) return;
    this.form.languages.push({
      name: this.tempLanguage,
      level: this.tempLevel as any,
    });
    this.tempLanguage = '';
    this.tempLevel = '';
  }

  removeLanguage(lang: Language): void {
    this.form.languages.splice(this.form.languages.indexOf(lang), 1);
  }

  // ── Soft Skills ──────────────────────────────────────────────────────

  readonly softSkillsOptions = [
    'Leadership',
    'Communication',
    'Travail en équipe',
    'Créativité',
    'Résolution de problèmes',
    'Gestion du temps',
    'Adaptabilité',
    'Autonomie',
    'Esprit critique',
    'Gestion de projet',
    'Négociation',
    'Empathie',
  ];

  toggleSoftSkill(skill: string): void {
    const idx = this.form.softSkills.indexOf(skill);
    idx >= 0
      ? this.form.softSkills.splice(idx, 1)
      : this.form.softSkills.push(skill);
  }

  isSoftSkillSelected(skill: string): boolean {
    return this.form.softSkills.includes(skill);
  }

  // ── Divers ───────────────────────────────────────────────────────────

  readonly experienceOptions = [
    '0-1 an',
    '1-2 ans',
    '2-3 ans',
    '3-5 ans',
    '5-7 ans',
    '7-10 ans',
    '10+ ans',
  ];

  readonly diplomaOptions = [
    'Bac',
    'Bac+2 (DUT/BTS)',
    'Bac+3 (Licence)',
    'Bac+5 (Master/Ingénieur)',
    'Bac+8 (Doctorat)',
  ];

  readonly locationOptions = [
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
    'Salé',
    'Temara',
    'Mohammedia',
    'El Jadida',
  ];

  // ── Actions ──────────────────────────────────────────────────────────

  submit(): void {
    this.submitted = true;
    if (!this.form.jobTitle) return;
    // Émet le formulaire TRADUIT en anglais
    this.onFilter.emit(this.buildTranslatedForm());
  }

  reset(): void {
    this.form = {
      jobTitle: '',
      skills: [],
      tools: [],
      experience: '',
      diploma: '',
      languages: [],
      location: '',
      certifications: '',
      softSkills: [],
    };
    this.skillInput = '';
    this.toolInput = '';
    this.jobTitleInput = '';
    this.tempLanguage = '';
    this.tempLevel = '';
    this.filteredSkills = [];
    this.filteredTools = [];
    this.filteredJobTitles = [];
    this.submitted = false;
    this.onReset.emit();
  }
}
