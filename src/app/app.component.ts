import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Woridge';
  page = '';
  private inactivityTimer?: Subscription;
  private readonly INACTIVITY_TIME = 24 * 60 * 60 * 1000; //! 1 day

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.listenToRouteTitles();
    this.resetTimer();
  }

  ngOnDestroy(): void {
    this.inactivityTimer?.unsubscribe();
  }

  //* Route title listener
  private listenToRouteTitles(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.page = route.snapshot.data['title'] ?? '';
      });
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
