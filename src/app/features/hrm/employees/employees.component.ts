import { Component } from '@angular/core';
import { FooterComponent } from '../../common/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
// import { EmployeesModalComponent } from './employees-modal/employees-modal.component';

@Component({
  selector: 'app-employees',
  imports: [FooterComponent,RouterModule,ToastComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

}
