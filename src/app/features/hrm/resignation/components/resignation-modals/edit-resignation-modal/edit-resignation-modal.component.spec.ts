import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResignationModalComponent } from './update-resignation-modal.component';

describe('UpdateResignationModalComponent', () => {
  let component: UpdateResignationModalComponent;
  let fixture: ComponentFixture<UpdateResignationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateResignationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateResignationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
