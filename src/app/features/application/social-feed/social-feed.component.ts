import { AfterViewInit, Component } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { AnoncesChartComponent } from './components/anonces-chart/anonces-chart.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { SondageListComponent } from './components/sondage-list/sondage-list.component';
@Component({
    selector: 'app-social-feed',
    templateUrl: './social-feed.component.html',
    styleUrl: './social-feed.component.scss',
    imports:[SondageListComponent,FooterComponent,LightgalleryModule]
})
export class SocialFeedComponent implements AfterViewInit {
  private lightGallery!: LightGallery;
  private needRefresh = false;
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
