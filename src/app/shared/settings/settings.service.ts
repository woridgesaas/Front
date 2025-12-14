import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private renderer: Renderer2;
  base = '';
  page = '';
  last = '';
  
  public hoverState = new BehaviorSubject<'over' | 'out'>('out');
  // Layout Mode
  public layoutMode: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutMode') || '2'
  );

    // Theme Color
    public themeColor: BehaviorSubject<string> = new BehaviorSubject<string>(
      localStorage.getItem('themeColor') || '1'
    );



  public isLoader: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isLoader') || '1'
  );




  constructor(rendererFactory: RendererFactory2,private common: CommonService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  
    this.common.base.subscribe((res: string) => {
      this.base = res;
     
    
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
  }





  public changeLayoutMode(layout: string): void {
    this.layoutMode.next(layout);
    localStorage.setItem('layoutMode', layout);
    //DocumentElement c'est la balise html 
    // mappage entre les valeurs et les attributs data-layout
    this.renderer.setAttribute(
      document.documentElement,
      'data-layout',
       layout === '2' || layout === '1'  // ← '2' (mini) OU '1' (défaut) = mini
        ? 'mini'
        : layout === '3' || layout === '14'  // Garde seulement horizontal
        ? 'horizontal'
        : '' 
    );

  }


  public changeThemeColor(themeColor: string): void {
    this.themeColor.next(themeColor);
    localStorage.setItem('themeColor', themeColor);
    this.renderer.setAttribute(
      document.documentElement,
      'data-theme',
      themeColor === '1'
        ? 'light'
        : 'dark'
    );
  }

  public changeLoaderState(isLoader: string): void {
    this.isLoader.next(isLoader);
    localStorage.setItem('isLoader', isLoader);
    this.renderer.setAttribute(
      document.documentElement,
      'data-loader',
      isLoader === '1'
        ? 'enable'
        : 'disable'
    );
  }


}


