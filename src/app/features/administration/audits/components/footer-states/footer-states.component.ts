import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-states',
  imports: [],
  templateUrl: './footer-states.component.html',

})
export class FooterStatesComponent {
  @Input() auditStates:Record<string , number> ={};
}
