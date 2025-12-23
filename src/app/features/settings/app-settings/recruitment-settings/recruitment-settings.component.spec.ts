import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentSettingsComponent } from './recruitment-settings.component';

describe('RecruitmentSettingsComponent', () => {
  let component: RecruitmentSettingsComponent;
  let fixture: ComponentFixture<RecruitmentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruitmentSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
