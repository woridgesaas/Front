import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChangesModalComponent } from './view-changes-modal.component';

describe('ViewChangesModalComponent', () => {
  let component: ViewChangesModalComponent;
  let fixture: ComponentFixture<ViewChangesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChangesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChangesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
