import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayrollService } from '../../services/payroll.service';
import { PayrollSummary, PayrollStatus } from '../../models/payroll.model';
import { FooterComponent } from '../../../../common/footer/footer.component';

@Component({
  selector: 'app-employee-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule,FooterComponent],
  templateUrl: './employee-payroll.component.html',
  styleUrl: './employee-payroll.component.scss'
})
export class EmployeePayrollComponent implements OnInit {

  allPayrolls: PayrollSummary[] = [];
  filteredPayrolls: PayrollSummary[] = [];
  isLoading = false;
  errorMessage = '';
  downloadingId: string | null = null;

  // Filtres
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = 0; // 0 = tous les mois
  selectedStatus: string = '';

  years: number[] = [];

  months = [
    { value: 0,  label: 'Tous les mois' },
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

  monthNames = [
    '', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  constructor(private payrollService: PayrollService) {
    // Génère les années disponibles
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 3; y--) {
      this.years.push(y);
    }
  }

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.isLoading = true;
    this.payrollService.getMyPayrolls().subscribe({
      next: (data) => {
        this.allPayrolls = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des fiches.';
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPayrolls = this.allPayrolls.filter(p => {
      const yearMatch = p.year === this.selectedYear;
      const monthMatch = this.selectedMonth === 0 || p.month === this.selectedMonth;
      const statusMatch = !this.selectedStatus || p.status === this.selectedStatus;
      return yearMatch && monthMatch && statusMatch;
    });
  }

  downloadPdf(payroll: PayrollSummary): void {
    if (payroll.status !== 'VALIDEE') return;
    this.downloadingId = payroll.id;
    this.payrollService.downloadPayroll(payroll.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Fiche_Paie_${this.monthNames[payroll.month]}_${payroll.year}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.downloadingId = null;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du téléchargement.';
        this.downloadingId = null;
      }
    });
  }

  // Stats
  get totalFiches(): number { return this.allPayrolls.length; }
  get fichesValidees(): number { return this.allPayrolls.filter(p => p.status === 'VALIDEE').length; }
  get fichesEnAttente(): number { return this.allPayrolls.filter(p => p.status === 'EN_ATTENTE').length; }
  get totalNet(): number {
    return this.allPayrolls
      .filter(p => p.status === 'VALIDEE' && p.year === this.selectedYear)
      .reduce((sum, p) => sum + p.netSalary, 0);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'VALIDEE':    return 'badge-soft-success';
      case 'EN_ATTENTE': return 'badge-soft-warning';
      case 'REJETEE':    return 'badge-soft-danger';
      default:           return 'badge-soft-secondary';
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
      default:           return 'ti ti-help';
    }
  }
}