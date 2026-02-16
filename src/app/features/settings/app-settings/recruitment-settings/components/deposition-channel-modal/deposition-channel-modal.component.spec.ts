import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositionChannelModalComponent } from './deposition-channel-modal.component';

describe('DepositionChannelModalComponent', () => {
  let component: DepositionChannelModalComponent;
  let fixture: ComponentFixture<DepositionChannelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositionChannelModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositionChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
