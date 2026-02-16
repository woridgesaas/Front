import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesKpisComponent } from './leaves-kpis.component';

describe('LeavesKpisComponent', () => {
  let component: LeavesKpisComponent;
  let fixture: ComponentFixture<LeavesKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavesKpisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavesKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
