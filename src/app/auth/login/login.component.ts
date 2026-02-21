import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IllustrationComponent } from '../Common/illustration/illustration.component';
import { LogoComponent } from '../Common/logo/logo.component';
import { DescriptionComponent } from '../Common/description/description.component';
import { FooterComponent } from '../Common/footer/footer.component';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from '../../core/services/form-validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    RouterLink,
    IllustrationComponent,
    LogoComponent,
    FormsModule,
    DescriptionComponent,
    FooterComponent,
  ],
})
export class LoginComponent {
  public routes = routes;
  password: boolean[] = [false, false];
  email: string = '';
  userPassword: string = '';

  togglePassword(index: number): void {
    this.password[index] = !this.password[index];
  }
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    private toastr: ToastrService,
    public validationService: FormValidationService
  ) {}

  /* navigation() {//cette fonction sert simplement à naviguer vers la page d’accueil (ou index)
    this.router.navigate([routes.index]);
  }*/
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-white');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-white');
  }
  onSubmit(form: any) {
     if (form.invalid) {
    return;
  }

    this.authService
      .login({
        email: this.email,
        password: this.userPassword,
      })
      .subscribe({
        next: (res: any) => {
          const token = res.data;

          this.authService.saveToken(token);

          this.toastr.success('Connexion réussie', 'Bienvenue');

          setTimeout(() => {
            this.router.navigate([routes.index]);
          }, 1000);
        },

        error: (err) => {
          this.handleError(err);
        },
      });
  }
  handleError(err: any) {
    let message = 'Veuillez vérifier les champs saisis'; //400 modelstate is not valid

    switch (err.status) {
      case 401:
        message = 'Mot de passe incorrect.';
        break;

      case 404:
        message = 'Aucun utilisateur ne correspond à cet email.';
        break;

      case 403:
        message = 'Votre compte est désactivé ou bloqué.';
        break;
    }
    this.toastr.error(message, 'Erreur');
  }
}
