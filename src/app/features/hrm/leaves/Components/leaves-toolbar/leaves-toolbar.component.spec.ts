import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesToolbarComponent } from './leaves-toolbar.component';

describe('LeavesToolbarComponent', () => {
  let component: LeavesToolbarComponent;
  let fixture: ComponentFixture<LeavesToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavesToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavesToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
