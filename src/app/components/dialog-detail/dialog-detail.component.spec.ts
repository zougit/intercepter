import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailComponent } from './dialog-detail.component';

describe('DialogDetailComponent', () => {
  let component: DialogDetailComponent;
  let fixture: ComponentFixture<DialogDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailComponent]
    });
    fixture = TestBed.createComponent(DialogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
