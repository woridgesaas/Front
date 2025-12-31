import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-footer',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss',
})
export class ChatFooterComponent {
   newMessage: string = '';

  @Output() messageSent = new EventEmitter<string>();
  @Output() fileAttached = new EventEmitter<File>();
  @Output() enterPressed = new EventEmitter<string>();

  onSendClick():void{
    if(this.newMessage.trim())
      this.messageSent.emit(this.newMessage.trim());
    this.newMessage=''; //reset local bch mtb9ch bayna f textarea msg l9dim
  }
  //KeyboardEvent interface
  onEnterPress(event :any ):void{
    if(event.key === 'Enter' && !event.shiftKey){
      event.preventDefault();
      this.enterPressed.emit(this.newMessage);
      this.newMessage=''
    }
  }
}
