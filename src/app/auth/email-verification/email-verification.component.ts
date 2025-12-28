import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IllustrationComponent } from '../Common/illustration/illustration.component';
import { LogoComponent } from '../Common/logo/logo.component';
import { DescriptionComponent } from '../Common/description/description.component';
import { FooterComponent } from '../Common/footer/footer.component';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrl: './email-verification.component.scss',
    imports: [
      CommonModule,
      IllustrationComponent,
      LogoComponent,
      DescriptionComponent,
      FooterComponent,

    ]
})
export class EmailVerificationComponent {
  public routes = routes;

  constructor(
    private router: Router,
    private renderer:Renderer2
  ){}
  navigation(){
    this.router.navigate([routes.index])
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-white');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-white');
  }
}
