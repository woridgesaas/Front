import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../Common/logo/logo.component';
import { IllustrationComponent } from '../Common/illustration/illustration.component';
import { DescriptionComponent } from '../Common/description/description.component';
import { ButtonComponent } from '../Common/button/button.component';

@Component({
    selector: 'app-error-500',
    templateUrl: './error-500.component.html',
    styleUrl: './error-500.component.scss',
    imports: [CommonModule,LogoComponent,IllustrationComponent,DescriptionComponent,ButtonComponent]
})
export class Error500Component {

  constructor(
    private router: Router,
    private renderer:Renderer2
  ){}
  navigation(){
    this.router.navigate([routes.index])
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-linear-gradiant');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-linear-gradiant');
  }
}
