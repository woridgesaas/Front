import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryTemplatesModalComponent } from './manage-category-templates-modal.component';

describe('ManageCategoryTemplatesModalComponent', () => {
  let component: ManageCategoryTemplatesModalComponent;
  let fixture: ComponentFixture<ManageCategoryTemplatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCategoryTemplatesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategoryTemplatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
