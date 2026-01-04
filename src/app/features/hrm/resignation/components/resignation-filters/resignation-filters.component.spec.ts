import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationFiltersComponent } from './resignation-filters.component';

describe('ResignationFiltersComponent', () => {
  let component: ResignationFiltersComponent;
  let fixture: ComponentFixture<ResignationFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResignationFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
