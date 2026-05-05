import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFiltersComponent } from './post-filters.component';

describe('PostFiltersComponent', () => {
  let component: PostFiltersComponent;
  let fixture: ComponentFixture<PostFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
