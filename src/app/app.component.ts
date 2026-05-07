import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ChatbotComponent } from './features/common/chat/chatbot.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AppSettingsService } from './shared/services/app-settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ChatbotComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Woridge';
  page = '';
  showChatbot = false;

  private inactivityTimer?: Subscription;
  private readonly INACTIVITY_TIME = 15 * 60 * 1000; //! 15 minutes
  private readonly subs = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settings: AppSettingsService,
  ) {}

  ngOnInit(): void {
    this.settings.initLayout();
    this.settings.initTheme();

    this.listenToRouteTitles();
    this.listenToChatbotVisibility();
    this.resetTimer();
  }

  ngOnDestroy(): void {
    this.inactivityTimer?.unsubscribe();
    this.subs.unsubscribe();
  }

  //* Route title listener
  private listenToRouteTitles(): void {
    this.subs.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          let route = this.activatedRoute;

          while (route.firstChild) {
            route = route.firstChild;
          }

          this.page = route.snapshot.data['title'] ?? '';
        }),
    );
  }

  //* Hide chatbot on auth pages
  private listenToChatbotVisibility(): void {
    this.subs.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          const navigation = event as NavigationEnd;

          const authRoutes = [
            '/login',
            '/forgot-password',
            '/reset-password',
            '/email-verification',
            '/lock-screen',
            '/onboarding',
          ];

          this.showChatbot = !authRoutes.some((route) =>
            navigation.urlAfterRedirects.startsWith(route),
          );
        }),
    );
  }

  //* Track user activity
  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  @HostListener('document:scroll')
  onActivity(): void {
    this.resetTimer();
  }

  private resetTimer(): void {
    this.inactivityTimer?.unsubscribe();

    this.inactivityTimer = timer(this.INACTIVITY_TIME).subscribe(() => {
      this.router.navigate(['/lock-screen']);
    });
  }
}
