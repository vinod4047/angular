import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpUpdateDialogComponent } from './emp-update-dialog.component';

describe('DialogComponent', () => {
  let component: EmpUpdateDialogComponent;
  let fixture: ComponentFixture<EmpUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpUpdateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
