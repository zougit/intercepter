import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBOViewComponent } from './admin-bo-view.component';

describe('AdminBOViewComponent', () => {
  let component: AdminBOViewComponent;
  let fixture: ComponentFixture<AdminBOViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBOViewComponent]
    });
    fixture = TestBed.createComponent(AdminBOViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
