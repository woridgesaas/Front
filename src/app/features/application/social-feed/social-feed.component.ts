import { AfterViewInit, Component } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { CreateAnnonceModalComponent } from './admin/annonce/create-annonce-modal/create-annonce-modal.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { SondageListComponent } from './components/sondage-list/sondage-list.component';
import { routes } from '../../../shared/routes/routes';
import { RouterModule } from '@angular/router'; 
@Component({
    selector: 'app-social-feed',
    templateUrl: './social-feed.component.html',
    styleUrl: './social-feed.component.scss',
    imports:[RouterModule,SondageListComponent,FooterComponent,LightgalleryModule,CreateAnnonceModalComponent]
})
export class SocialFeedComponent implements AfterViewInit {
  private lightGallery!: LightGallery;
  private needRefresh = false;
  routes = routes;
  settings = {
    counter: false,
    plugins: [lgZoom, lgVideo],
  };
  
  ngAfterViewInit() {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { index, prevIndex } = detail;
  };
}
