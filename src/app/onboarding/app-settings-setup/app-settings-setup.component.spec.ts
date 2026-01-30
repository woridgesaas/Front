import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingsSetupComponent } from './app-settings-setup.component';

describe('AppSettingsSetupComponent', () => {
  let component: AppSettingsSetupComponent;
  let fixture: ComponentFixture<AppSettingsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSettingsSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSettingsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
