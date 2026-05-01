import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionalLeavesModalComponent } from './exceptional-leaves-modal.component';

describe('ExceptionalLeavesModalComponent', () => {
  let component: ExceptionalLeavesModalComponent;
  let fixture: ComponentFixture<ExceptionalLeavesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExceptionalLeavesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExceptionalLeavesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
