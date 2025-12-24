import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceAbsenceSettingsComponent } from './presence-absence-settings.component';

describe('PresenceAbsenceSettingsComponent', () => {
  let component: PresenceAbsenceSettingsComponent;
  let fixture: ComponentFixture<PresenceAbsenceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresenceAbsenceSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PresenceAbsenceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
