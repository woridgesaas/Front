import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {

  /** Titre dynamique */
  @Input() title!: string;

  /** Paragraphe dynamique */
  @Input() text!: string;

}
