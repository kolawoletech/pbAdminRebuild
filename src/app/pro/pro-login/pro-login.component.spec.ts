import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProLoginComponent } from './pro-login.component';

describe('ProLoginComponent', () => {
  let component: ProLoginComponent;
  let fixture: ComponentFixture<ProLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
