import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerFormComponent } from './add-customer-form.component';

describe('AddCustomerFormComponent', () => {
  let component: AddCustomerFormComponent;
  let fixture: ComponentFixture<AddCustomerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCustomerFormComponent]
    });
    fixture = TestBed.createComponent(AddCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
