import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AddLeaveModalComponent } from '../Components/add-leave-modal/add-leave-modal.component';
import { leaveEmployee } from '../../../../shared/models/models';
import { EditLeaveModalComponent } from '../Components/edit-leave-modal/edit-leave-modal.component';
@Component({
    selector: 'app-leave-modal',
    templateUrl: './leave-modal.component.html',
    styleUrl: './leave-modal.component.scss',
    imports: [
      CommonModule,
      RouterModule,
      BsDatepickerModule,
      FormsModule,
      MatSelectModule,
      MatChipsModule,
      MatIconModule,
      AddLeaveModalComponent,
      EditLeaveModalComponent,
    ]
})
export class LeaveModalComponent {

selectedLeave: leaveEmployee | null = null;

createLeave(payload: any): void {
  console.log('CREATE', payload);
}

updateLeave(leave: leaveEmployee) {
  console.log('UPDATE', leave);
}


}
