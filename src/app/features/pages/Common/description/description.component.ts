import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  imports: [],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
})
export class DescriptionComponent {
 /** Titre dynamique */
  @Input() title!: string;

  /** Paragraphe dynamique */
  @Input() text!: string;
}
