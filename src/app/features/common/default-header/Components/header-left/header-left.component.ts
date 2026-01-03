import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideBarService } from '../../../../../shared/side-bar/side-bar.service';
import { routes } from '../../../../../shared/routes/routes';

@Component({
  selector: 'app-header-left',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-left.component.html',
  styleUrl: './header-left.component.scss',
})
export class HeaderLeftComponent {
  routes = routes;

  constructor(private sideBar: SideBarService) {}

  toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }

  toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
}

