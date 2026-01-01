import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-technicien-list',
  imports: [],
  templateUrl: './technicien-list.component.html',
  styleUrl: './technicien-list.component.scss',
})
export class TechnicienListComponent {
  @Input() techniciens:any=[];
}
