import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusListAdminComponent } from './cus-list-admin.component';

describe('CusListAdminComponent', () => {
  let component: CusListAdminComponent;
  let fixture: ComponentFixture<CusListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CusListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
