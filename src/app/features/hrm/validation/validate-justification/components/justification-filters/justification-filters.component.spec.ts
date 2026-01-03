import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationFiltersComponent } from './justification-filters.component';

describe('JustificationFiltersComponent', () => {
  let component: JustificationFiltersComponent;
  let fixture: ComponentFixture<JustificationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
