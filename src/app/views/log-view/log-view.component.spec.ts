import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewComponent } from './log-view.component';

describe('LogViewComponent', () => {
  let component: LogViewComponent;
  let fixture: ComponentFixture<LogViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogViewComponent]
    });
    fixture = TestBed.createComponent(LogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
