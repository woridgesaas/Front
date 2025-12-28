import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../Common/logo/logo.component';
import { DescriptionComponent } from '../Common/description/description.component';
import { FooterComponent } from '../Common/footer/footer.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  imports: [
    CommonModule,
    RouterLink ,
    LogoComponent,
    DescriptionComponent,
    FooterComponent,
    ],
})
export class SuccessComponent {
  public routes = routes;
  constructor(private router: Router, private renderer: Renderer2) {}
  navigation() {
    this.router.navigate([routes.login]);
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-white');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-white');
  }
}
