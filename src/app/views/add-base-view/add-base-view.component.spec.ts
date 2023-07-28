import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseViewComponent } from './add-base-view.component';

describe('AddBaseViewComponent', () => {
  let component: AddBaseViewComponent;
  let fixture: ComponentFixture<AddBaseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBaseViewComponent]
    });
    fixture = TestBed.createComponent(AddBaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
