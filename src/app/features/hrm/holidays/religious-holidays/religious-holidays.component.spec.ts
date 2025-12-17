import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReligiousHolidaysComponent } from './religious-holidays.component';

describe('ReligiousHolidaysComponent', () => {
  let component: ReligiousHolidaysComponent;
  let fixture: ComponentFixture<ReligiousHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReligiousHolidaysComponent], // ✅ standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ReligiousHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
