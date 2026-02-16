import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePickerModule } from 'primeng/datepicker';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../common/modal-footer/modal-footer.component';

@Component({
  selector: 'app-add-event-modal',
  imports: [DatePickerModule,FormsModule,BsDatepickerModule,ModalHeaderComponent,ModalFooterComponent],
  templateUrl: './add-event-modal.component.html',
})
export class AddEventModalComponent {
  @Output() onEventCreated = new EventEmitter<any>();
  @ViewChild('form') form!:NgForm;
  private newEvent:any={
    title:'',
    date:String,
    start: String,
    end:String
  }
  
  public onSubmit(form:NgForm):void{
    if(form.submitted && form.valid){
      
      this.newEvent = { 
        title: form.value.title,
        date: new Date(form.value.date).toLocaleDateString('fr-FR'),
        start: new Date(form.value.start).toLocaleTimeString('fr-FR'), 
        end: form.value.end ? new Date(form.value.end).toLocaleTimeString() : null };
      this.onEventCreated.emit(this.newEvent);
      this.resetForm();
    }
 
  }
  public closeModal():void{
    const modalEl = document.getElementById('add_event');
    if (modalEl){
      const modal=(window as any).bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }
  public cancelAdd():void{
   this.resetForm();
   this.closeModal();
  }
  private resetForm():void{
     this.newEvent={
       title:'',
      date:'',
      start: '',
      end:''
    }
    this.form.reset();
  }
}
