import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationTableComponent } from './resignation-table.component';

describe('ResignationTableComponent', () => {
  let component: ResignationTableComponent;
  let fixture: ComponentFixture<ResignationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResignationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
