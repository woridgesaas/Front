import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrageListComponent } from './filtrage-list.component';

describe('FiltrageListComponent', () => {
  let component: FiltrageListComponent;
  let fixture: ComponentFixture<FiltrageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
