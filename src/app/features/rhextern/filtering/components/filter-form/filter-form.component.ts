
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterForm } from '../../models/filter-form.model';
import { Language } from '../../models/candidate.model';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {
  @Output() onFilter = new EventEmitter<FilterForm>();
  @Output() onReset = new EventEmitter<void>();

  // Formulaire principal
  form: FilterForm = {
    skills: [],
    tools: [],
    experience: '',
    diploma: '',
    languages: [],
    location: '',
    certifications: '',
    softSkills: []
  };

  // Inputs pour les tags
  skillInput = '';
  toolInput = '';

  // Inputs temporaires pour les langues
  tempLanguage = '';
  tempLevel = '';

  // Listes filtrées pour l'autocomplete
  filteredSkills: string[] = [];
  filteredTools: string[] = [];

  // Données disponibles
  readonly availableSkills = [
    'Angular', 'React', 'Vue.js', 'Node.js', 'Python', 'Java',
    'TypeScript', 'JavaScript', 'PHP', 'C#', 'C++', 'Ruby',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Oracle',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Spring Boot', 'Django', 'Laravel', 'Express.js', '.NET'
  ];

  readonly availableTools = [
    'Git', 'GitHub', 'GitLab', 'Bitbucket',
    'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'CircleCI',
    'Jira', 'Confluence', 'Trello', 'Asana', 'Notion',
    'VS Code', 'IntelliJ', 'Eclipse', 'PyCharm',
    'Postman', 'Insomnia', 'Swagger',
    'Figma', 'Adobe XD', 'Sketch'
  ];

  readonly experienceOptions = [
    '0-1 an', '1-2 ans', '2-3 ans', '3-5 ans', 
    '5-7 ans', '7-10 ans', '10+ ans'
  ];

  readonly diplomaOptions = [
    'Bac', 'Bac+2 (DUT/BTS)', 'Bac+3 (Licence)', 
    'Bac+5 (Master/Ingénieur)', 'Bac+8 (Doctorat)'
  ];

  readonly availableLanguages = [
    'Français', 'Anglais', 'Arabe', 'Espagnol', 
    'Allemand', 'Italien', 'Portugais', 'Chinois'
  ];

  readonly languageLevels = [
    'Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Bilingue'
  ];

  readonly softSkillsOptions = [
    'Leadership', 'Communication', 'Travail en équipe',
    'Créativité', 'Résolution de problèmes', 'Gestion du temps',
    'Adaptabilité', 'Autonomie', 'Esprit critique',
    'Gestion de projet', 'Négociation', 'Empathie'
  ];

  readonly locationOptions = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger',
    'Agadir', 'Oujda', 'Kenitra', 'Tétouan', 'Meknès',
    'Salé', 'Temara', 'Mohammedia', 'El Jadida'
  ];

  // ==================== COMPÉTENCES ====================

  /**
   * Filtre les compétences pour l'autocomplete
   */
  filterSkills(): void {
    const input = this.skillInput.toLowerCase().trim();
    
    if (!input) {
      this.filteredSkills = [];
      return;
    }

    this.filteredSkills = this.availableSkills
      .filter(skill => 
        skill.toLowerCase().includes(input) && 
        !this.form.skills.includes(skill)
      )
      .slice(0, 10);
  }

  /**
   * Sélectionne une compétence depuis l'autocomplete
   */
  selectSkill(skill: string): void {
    if (!this.form.skills.includes(skill)) {
      this.form.skills.push(skill);
    }
    this.skillInput = '';
    this.filteredSkills = [];
  }

  /**
   * Ajoute une compétence manuellement
   */
  addSkill(): void {
    const skill = this.skillInput.trim();
    
    if (skill && !this.form.skills.includes(skill)) {
      this.form.skills.push(skill);
      this.skillInput = '';
      this.filteredSkills = [];
    }
  }

  /**
   * Supprime une compétence
   */
  removeSkill(skill: string): void {
    const index = this.form.skills.indexOf(skill);
    if (index >= 0) {
      this.form.skills.splice(index, 1);
    }
  }

  // ==================== OUTILS ====================

  /**
   * Filtre les outils pour l'autocomplete
   */
  filterTools(): void {
    const input = this.toolInput.toLowerCase().trim();
    
    if (!input) {
      this.filteredTools = [];
      return;
    }

    this.filteredTools = this.availableTools
      .filter(tool => 
        tool.toLowerCase().includes(input) && 
        !this.form.tools.includes(tool)
      )
      .slice(0, 10);
  }

  /**
   * Sélectionne un outil depuis l'autocomplete
   */
  selectTool(tool: string): void {
    if (!this.form.tools.includes(tool)) {
      this.form.tools.push(tool);
    }
    this.toolInput = '';
    this.filteredTools = [];
  }

  /**
   * Ajoute un outil manuellement
   */
  addTool(): void {
    const tool = this.toolInput.trim();
    
    if (tool && !this.form.tools.includes(tool)) {
      this.form.tools.push(tool);
      this.toolInput = '';
      this.filteredTools = [];
    }
  }

  /**
   * Supprime un outil
   */
  removeTool(tool: string): void {
    const index = this.form.tools.indexOf(tool);
    if (index >= 0) {
      this.form.tools.splice(index, 1);
    }
  }

  // ==================== LANGUES ====================

  /**
   * Ajoute une langue
   */
  addLanguage(): void {
    if (!this.tempLanguage || !this.tempLevel) {
      return;
    }

    const exists = this.form.languages.find(l => l.name === this.tempLanguage);
    
    if (exists) {
      return;
    }

    this.form.languages.push({
      name: this.tempLanguage,
      level: this.tempLevel as any
    });

    this.tempLanguage = '';
    this.tempLevel = '';
  }

  /**
   * Supprime une langue
   */
  removeLanguage(lang: Language): void {
    const index = this.form.languages.indexOf(lang);
    if (index >= 0) {
      this.form.languages.splice(index, 1);
    }
  }

  //  SOFT SKILLS

  /**
   * Toggle une soft skill
   */
  toggleSoftSkill(skill: string): void {
    const index = this.form.softSkills.indexOf(skill);
    
    if (index >= 0) {
      this.form.softSkills.splice(index, 1);
    } else {
      this.form.softSkills.push(skill);
    }
  }

  /**
   * Vérifie si une soft skill est sélectionnée
   */
  isSoftSkillSelected(skill: string): boolean {
    return this.form.softSkills.includes(skill);
  }

  // ==================== ACTIONS ====================

  /**
   * Soumet le formulaire
   */
  submit(): void {
    this.onFilter.emit(this.form);
  }

  /**
   * Réinitialise le formulaire
   */
  reset(): void {
    this.form = {
      skills: [],
      tools: [],
      experience: '',
      diploma: '',
      languages: [],
      location: '',
      certifications: '',
      softSkills: []
    };

    this.skillInput = '';
    this.toolInput = '';
    this.tempLanguage = '';
    this.tempLevel = '';
    this.filteredSkills = [];
    this.filteredTools = [];

    this.onReset.emit();
  }
}