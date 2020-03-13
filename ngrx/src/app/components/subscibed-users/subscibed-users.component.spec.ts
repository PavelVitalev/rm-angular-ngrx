import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscibedUsersComponent } from './subscibed-users.component';

describe('SubscibedUsersComponent', () => {
  let component: SubscibedUsersComponent;
  let fixture: ComponentFixture<SubscibedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscibedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscibedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
