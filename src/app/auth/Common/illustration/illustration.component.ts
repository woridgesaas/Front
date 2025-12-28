import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-illustration',
  imports: [],
  templateUrl: './illustration.component.html',
  styleUrl: './illustration.component.scss',
})
export class IllustrationComponent {
  @Input() backgroundImage!: string;

}

