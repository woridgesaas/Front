import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsDropdownComponent } from './apps-dropdown.component';

describe('AppsDropdownComponent', () => {
  let component: AppsDropdownComponent;
  let fixture: ComponentFixture<AppsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
