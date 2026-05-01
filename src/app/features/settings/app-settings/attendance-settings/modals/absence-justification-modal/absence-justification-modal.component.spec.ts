import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceJustificationModalComponent } from './absence-justification-modal.component';

describe('AbsenceJustificationModalComponent', () => {
  let component: AbsenceJustificationModalComponent;
  let fixture: ComponentFixture<AbsenceJustificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceJustificationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceJustificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
