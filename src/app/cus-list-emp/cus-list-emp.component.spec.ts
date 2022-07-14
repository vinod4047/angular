import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusListEmpComponent } from './cus-list-emp.component';

describe('CusListEmpComponent', () => {
  let component: CusListEmpComponent;
  let fixture: ComponentFixture<CusListEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusListEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusListEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
