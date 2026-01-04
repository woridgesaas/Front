import { Component, Input } from '@angular/core';
import { KpisComponent } from '../../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-documents-kpis',
  imports: [KpisComponent],
  templateUrl: './documents-kpis.component.html',
  styleUrl: './documents-kpis.component.scss',
})
export class DocumentsKpisComponent {
  @Input() kpiData:any=[];
}
