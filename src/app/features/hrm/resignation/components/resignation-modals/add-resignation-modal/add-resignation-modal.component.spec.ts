import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResignationModalComponent } from './add-resignation-modal.component';

describe('AddResignationModalComponent', () => {
  let component: AddResignationModalComponent;
  let fixture: ComponentFixture<AddResignationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResignationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResignationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
