import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { BreadcrumbItem } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>(
    []
  );

  readonly breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    //* First render (refresh / direct URL)
    this.buildBreadcrumbs();

    //* Update on navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.buildBreadcrumbs());
  }

  private buildBreadcrumbs(): void {
    const breadcrumbs: BreadcrumbItem[] = [];
    let route: ActivatedRoute | null = this.activatedRoute.root;

    while (route) {
      const label = route.snapshot.data['breadcrumb'];

      if (label) {
        breadcrumbs.push({
          label,
          active: false,
        });
      }

      route = route.firstChild;
    }

    //* Mark last breadcrumb as active
    if (breadcrumbs.length) {
      breadcrumbs[breadcrumbs.length - 1].active = true;
    }

    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
