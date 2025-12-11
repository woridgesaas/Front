import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [CommonModule]
})
export class FooterComponent implements OnInit {
  currentYear!: number;

  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.cdRef.detectChanges();
  }
}
