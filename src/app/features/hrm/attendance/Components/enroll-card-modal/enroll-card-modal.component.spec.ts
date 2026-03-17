import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCardModalComponent } from './enroll-card-modal.component';

describe('EnrollCardModalComponent', () => {
  let component: EnrollCardModalComponent;
  let fixture: ComponentFixture<EnrollCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollCardModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
