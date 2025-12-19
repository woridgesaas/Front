import { Component, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../shared/routes/routes';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
    imports: [CommonModule,RouterLink]
})
export class ForgotPasswordComponent {
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
