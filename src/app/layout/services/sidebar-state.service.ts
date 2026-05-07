import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  readonly toggleSideBar = new BehaviorSubject<string>(
    localStorage.getItem('isMiniSidebar') || 'false',
  );

  readonly toggleMobileSideBar = new BehaviorSubject<string>(
    localStorage.getItem('isMobileSidebar') || 'false',
  );

  readonly expandSideBar = new BehaviorSubject<boolean>(false);

  switchSideMenuPosition(): void {
    if (localStorage.getItem('isMiniSidebar')) {
      this.toggleSideBar.next('false');
      localStorage.removeItem('isMiniSidebar');
    } else {
      this.toggleSideBar.next('true');
      localStorage.setItem('isMiniSidebar', 'true');
    }
  }

  switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next('false');
      localStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next('true');
      localStorage.setItem('isMobileSidebar', 'true');
    }
  }
}
