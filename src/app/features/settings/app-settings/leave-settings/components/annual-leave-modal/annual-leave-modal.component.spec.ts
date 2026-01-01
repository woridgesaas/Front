import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualLeaveModalComponent } from './annual-leave-modal.component';

describe('AnnualLeaveModalComponent', () => {
  let component: AnnualLeaveModalComponent;
  let fixture: ComponentFixture<AnnualLeaveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualLeaveModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualLeaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
