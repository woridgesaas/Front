import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSidebarItemComponent } from './settings-sidebar-item.component';

describe('SettingsSidebarItemComponent', () => {
  let component: SettingsSidebarItemComponent;
  let fixture: ComponentFixture<SettingsSidebarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSidebarItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
