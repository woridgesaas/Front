import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsTemplateSettingsComponent } from './documents-template-settings.component';

describe('DocumentsTemplateSettingsComponent', () => {
  let component: DocumentsTemplateSettingsComponent;
  let fixture: ComponentFixture<DocumentsTemplateSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsTemplateSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsTemplateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
