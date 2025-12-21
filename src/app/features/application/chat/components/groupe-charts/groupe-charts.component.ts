import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-groupe-charts',
  imports: [],
  templateUrl: './groupe-charts.component.html',
  styleUrl: './groupe-charts.component.scss',
})
export class GroupeChartsComponent {
  @Input() stats: any;
  getPourcentageActifs(): number {
    if (!this.stats || this.stats.totalGroups === 0) return 0;
    return Math.round((this.stats.activeGroups / this.stats.totalGroups) * 100);
  }
  getMoyenneMembres(): string {
    if (!this.stats || this.stats.totalGroups === 0) return '0';
    const moyenne = this.stats.totalMembers / this.stats.totalGroups;
    return moyenne.toFixed(1); // 1 décimale
  }
  getAutresTypes(): number {
    if (!this.stats) return 0;
    const autres = this.stats.totalGroups - 
                  (this.stats.typeStats?.department || 0) - 
                  (this.stats.typeStats?.announcement || 0);
    return Math.max(0, autres);
  }
   getTendance(): string {
    const pourcentage = this.getPourcentageActifs();
    if (pourcentage > 80) return 'up';
    if (pourcentage < 50) return 'down';
    return 'stable';
  }
  getTendanceColor(): string {
    const tendance = this.getTendance();
    switch (tendance) {
      case 'up': return 'success';
      case 'down': return 'danger';
      default: return 'muted';
    }
  }
}
