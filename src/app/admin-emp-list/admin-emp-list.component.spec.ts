import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmpListComponent } from './admin-emp-list.component';

describe('AdminEmpListComponent', () => {
  let component: AdminEmpListComponent;
  let fixture: ComponentFixture<AdminEmpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
