import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZoneFormComponent } from './edit-zone-form.component';

describe('EditZoneFormComponent', () => {
  let component: EditZoneFormComponent;
  let fixture: ComponentFixture<EditZoneFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditZoneFormComponent]
    });
    fixture = TestBed.createComponent(EditZoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
