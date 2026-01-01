import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTabItemComponent } from './settings-tab-item.component';

describe('SettingsTabItemComponent', () => {
  let component: SettingsTabItemComponent;
  let fixture: ComponentFixture<SettingsTabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTabItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
