import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppViewComponent } from './user-app-view.component';

describe('UserAppViewComponent', () => {
  let component: UserAppViewComponent;
  let fixture: ComponentFixture<UserAppViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAppViewComponent]
    });
    fixture = TestBed.createComponent(UserAppViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
