import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfoStepComponent } from './bank-info-step.component';

describe('BankInfoStepComponent', () => {
  let component: BankInfoStepComponent;
  let fixture: ComponentFixture<BankInfoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankInfoStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
