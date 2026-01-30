import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetupModalComponent } from './user-setup-modal.component';

describe('CeoSetupModalComponent', () => {
  let component: UserSetupModalComponent;
  let fixture: ComponentFixture<UserSetupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSetupModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSetupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
