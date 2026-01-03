import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationTableComponent } from './justification-table.component';

describe('JustificationTableComponent', () => {
  let component: JustificationTableComponent;
  let fixture: ComponentFixture<JustificationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
