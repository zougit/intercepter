import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPacViewComponent } from './app-pac-view.component';

describe('AppPacViewComponent', () => {
  let component: AppPacViewComponent;
  let fixture: ComponentFixture<AppPacViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPacViewComponent]
    });
    fixture = TestBed.createComponent(AppPacViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
