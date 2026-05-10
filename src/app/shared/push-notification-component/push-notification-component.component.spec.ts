import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationComponentComponent } from './push-notification-component.component';

describe('PushNotificationComponentComponent', () => {
  let component: PushNotificationComponentComponent;
  let fixture: ComponentFixture<PushNotificationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushNotificationComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushNotificationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
