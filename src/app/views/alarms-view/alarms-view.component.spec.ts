import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsViewComponent } from './alarms-view.component';

describe('AlarmsViewComponent', () => {
  let component: AlarmsViewComponent;
  let fixture: ComponentFixture<AlarmsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmsViewComponent]
    });
    fixture = TestBed.createComponent(AlarmsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
