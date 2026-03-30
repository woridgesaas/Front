import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PayrollService } from '../../services/payroll.service';
import { PayrollSummary } from '../../models/payroll.model';
import { FooterComponent } from '../../../../common/footer/footer.component';

@Component({
  selector: 'app-rh-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule,FooterComponent],
  templateUrl: './rh-payroll.component.html',
  styleUrl: './rh-payroll.component.scss'
})
export class RhPayrollComponent implements OnInit {

  allPayrolls: PayrollSummary[] = [];
  filteredPayrolls: PayrollSummary[] = [];
  selectedIds: Set<string> = new Set();

  // PDF Modal
  selectedPayrollId: string | null = null;
  selectedPayrollStatus: string | null = null;
  pdfUrl: SafeResourceUrl | null = null;
  isLoadingPdf = false;

  isLoading = false;
  isGenerating = false;
  errorMessage = '';
  successMessage = '';

  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  selectedStatus: string = '';

  months = [
    { value: 1,  label: 'Janvier' },
    { value: 2,  label: 'Février' },
    { value: 3,  label: 'Mars' },
    { value: 4,  label: 'Avril' },
    { value: 5,  label: 'Mai' },
    { value: 6,  label: 'Juin' },
    { value: 7,  label: 'Juillet' },
    { value: 8,  label: 'Août' },
    { value: 9,  label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' },
  ];

  years = [2024, 2025, 2026];

  constructor(
    private payrollService: PayrollService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.selectedIds.clear();
    this.payrollService.getAllPayrolls(this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => {
        this.allPayrolls = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement.';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPayrolls = this.allPayrolls.filter(p =>
      !this.selectedStatus || p.status === this.selectedStatus
    );
  }

  generatePayrolls(): void {
    this.isGenerating = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.payrollService.generatePayrolls(this.selectedMonth, this.selectedYear).subscribe({
      next: () => {
        this.successMessage = `Fiches de ${this.getMonthLabel(this.selectedMonth)} ${this.selectedYear} générées !`;
        this.isGenerating = false;
        this.loadPayrolls();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la génération.';
        this.isGenerating = false;
      }
    });
  }

  // Ouvre le modal avec le PDF
  viewDetail(payroll: PayrollSummary): void {
    this.isLoadingPdf = true;
    this.selectedPayrollId = payroll.id;
    this.selectedPayrollStatus = payroll.status;
    this.pdfUrl = null;

    this.payrollService.downloadPayroll(payroll.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.isLoadingPdf = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement du PDF.';
        this.isLoadingPdf = false;
        this.selectedPayrollId = null;
      }
    });
  }

  closeModal(): void {
    this.pdfUrl = null;
    this.selectedPayrollId = null;
    this.selectedPayrollStatus = null;
    this.isLoadingPdf = false;
  }

  validate(payrollId: string): void {
    this.payrollService.validatePayroll(payrollId).subscribe({
      next: () => {
        this.successMessage = 'Fiche validée avec succès !';
        this.closeModal();
        this.loadPayrolls();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la validation.';
      }
    });
  }

  reject(payrollId: string): void {
    this.payrollService.rejectPayroll(payrollId).subscribe({
      next: () => {
        this.successMessage = 'Fiche rejetée.';
        this.closeModal();
        this.loadPayrolls();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du rejet.';
      }
    });
  }

  // Sélection en masse
  toggleSelect(id: string): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  get allSelected(): boolean {
    return this.filteredPayrolls.length > 0 &&
           this.filteredPayrolls.every(p => this.selectedIds.has(p.id));
  }

  toggleSelectAll(): void {
    if (this.allSelected) {
      this.selectedIds.clear();
    } else {
      this.filteredPayrolls.forEach(p => this.selectedIds.add(p.id));
    }
  }

  validateSelected(): void {
    const ids = Array.from(this.selectedIds);
    let completed = 0;
    ids.forEach(id => {
      this.payrollService.validatePayroll(id).subscribe({
        next: () => {
          completed++;
          if (completed === ids.length) {
            this.successMessage = `${ids.length} fiche(s) validée(s) !`;
            this.selectedIds.clear();
            this.loadPayrolls();
          }
        }
      });
    });
  }

  // Stats
  get totalFiches(): number { return this.allPayrolls.length; }
  get enAttente(): number { return this.allPayrolls.filter(p => p.status === 'EN_ATTENTE').length; }
  get validees(): number { return this.allPayrolls.filter(p => p.status === 'VALIDEE').length; }
  get totalMasse(): number {
    return this.allPayrolls
      .filter(p => p.status === 'VALIDEE')
      .reduce((sum, p) => sum + p.netSalary, 0);
  }

  get isModalOpen(): boolean {
    return this.selectedPayrollId !== null;
  }

  getMonthLabel(month: number): string {
    return this.months.find(m => m.value === month)?.label ?? '';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'VALIDEE':    return 'badge-soft-success';
      case 'EN_ATTENTE': return 'badge-soft-warning';
      case 'REJETEE':    return 'badge-soft-danger';
      default:           return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'VALIDEE':    return 'Validée';
      case 'EN_ATTENTE': return 'En attente';
      case 'REJETEE':    return 'Rejetée';
      default:           return status;
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'VALIDEE':    return 'ti ti-circle-check';
      case 'EN_ATTENTE': return 'ti ti-clock';
      case 'REJETEE':    return 'ti ti-circle-x';
      default:           return '';
    }
  }
}