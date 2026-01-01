import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseWebsiteModalComponent } from './showcase-website-modal.component';

describe('ShowcaseWebsiteModalComponent', () => {
  let component: ShowcaseWebsiteModalComponent;
  let fixture: ComponentFixture<ShowcaseWebsiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseWebsiteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseWebsiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
