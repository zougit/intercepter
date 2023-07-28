import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMultiDeviceFormComponent } from './edit-multi-device-form.component';

describe('EditMultiDeviceFormComponent', () => {
  let component: EditMultiDeviceFormComponent;
  let fixture: ComponentFixture<EditMultiDeviceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMultiDeviceFormComponent]
    });
    fixture = TestBed.createComponent(EditMultiDeviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
