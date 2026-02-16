import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from '../common/common.service';
import { LayoutMode } from '../models/layout.model';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private renderer: Renderer2;
  base = '';
  page = '';
  last = '';

  public hoverState = new BehaviorSubject<'over' | 'out'>('out');

  //* Layout mode
  public layoutMode = new BehaviorSubject<LayoutMode>('aside');

  //* Theme color
  public themeColor = new BehaviorSubject<string>(
    localStorage.getItem('themeColor') || '1'
  );

  //* Loader
  public isLoader = new BehaviorSubject<string>(
    localStorage.getItem('isLoader') || '1'
  );

  constructor(
    rendererFactory: RendererFactory2,
    private common: CommonService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.common.base.subscribe((res) => (this.base = res));
    this.common.page.subscribe((res) => (this.page = res));
    this.common.last.subscribe((res) => (this.last = res));
  }

  //* Init layout (on app load)
  public initLayout(): void {
    const saved = (localStorage.getItem('layoutMode') as LayoutMode) || 'aside';

    this.switchLayout(saved);
  }

  //* Switch layout
  public switchLayout(mode: LayoutMode): void {
    this.layoutMode.next(mode);
    localStorage.setItem('layoutMode', mode);

    this.renderer.setAttribute(
      document.documentElement,
      'data-layout',
      mode === 'aside' ? 'mini' : 'horizontal'
    );
  }

  //* Theme
  public changeThemeColor(themeColor: string): void {
    this.themeColor.next(themeColor);
    localStorage.setItem('themeColor', themeColor);

    this.renderer.setAttribute(
      document.documentElement,
      'data-theme',
      themeColor === '1' ? 'light' : 'dark'
    );
  }

  //* Loader
  public changeLoaderState(isLoader: string): void {
    this.isLoader.next(isLoader);
    localStorage.setItem('isLoader', isLoader);

    this.renderer.setAttribute(
      document.documentElement,
      'data-loader',
      isLoader === '1' ? 'enable' : 'disable'
    );
  }
}
