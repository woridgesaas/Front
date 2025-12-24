import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-remove-confirmation',
  imports: [FormsModule,CommonModule],
  templateUrl: './remove-confirmation.component.html',
  styleUrl: './remove-confirmation.component.scss',
})
export class RemoveConfirmationComponent{
    @Input() show = false;
  @Input() membreNom = '';
  @Output() confirme = new EventEmitter<boolean>();

  onYes() {
    this.confirme.emit(true);
    this.show = false;
  }

  onNoo() {
    this.confirme.emit(false);
    this.show = false;
  }
}
