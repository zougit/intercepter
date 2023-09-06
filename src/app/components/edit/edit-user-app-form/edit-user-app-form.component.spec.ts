import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAppFormComponent } from './edit-user-app-form.component';

describe('EditUserAppFormComponent', () => {
  let component: EditUserAppFormComponent;
  let fixture: ComponentFixture<EditUserAppFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserAppFormComponent]
    });
    fixture = TestBed.createComponent(EditUserAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
