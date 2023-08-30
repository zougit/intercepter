import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAppFormComponent } from './add-user-app-form.component';

describe('AddUserAppFormComponent', () => {
  let component: AddUserAppFormComponent;
  let fixture: ComponentFixture<AddUserAppFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserAppFormComponent]
    });
    fixture = TestBed.createComponent(AddUserAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
