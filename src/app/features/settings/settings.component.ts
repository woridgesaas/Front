import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { breadCrumbItems } from '../../shared/models/models';
import { routes } from '../../shared/routes/routes';
import { BreadcrumbsComponent } from '../common/breadcrumbs/breadcrumbs.component';
import { CollapseHeaderComponent } from '../common/collapse-header/collapse-header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    BreadcrumbsComponent,
    CollapseHeaderComponent,
    FooterComponent,
    CommonModule,
  ],
})
export class SettingsComponent implements OnInit {
  breadCrumbItems: breadCrumbItems[] = [];
  routes = routes;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const activeRoute = this.getDeepestChild(this.activatedRoute);
        const pageLabel = activeRoute.snapshot.data['breadcrumb'];

        this.breadCrumbItems = [
          { label: 'Paramètres' },
          ...(pageLabel ? [{ label: pageLabel, active: true }] : []),
        ];
      });
  }

  //* Get deepest active child route 
  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
