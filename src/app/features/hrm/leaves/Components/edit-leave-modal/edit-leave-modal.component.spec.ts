import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveModalComponent } from './edit-leave-modal.component';

describe('EditLeaveModalComponent', () => {
  let component: EditLeaveModalComponent;
  let fixture: ComponentFixture<EditLeaveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLeaveModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLeaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
