import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaseViewComponent } from './edit-base-view.component';

describe('EditBaseViewComponent', () => {
  let component: EditBaseViewComponent;
  let fixture: ComponentFixture<EditBaseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBaseViewComponent]
    });
    fixture = TestBed.createComponent(EditBaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
