import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForthComponent } from './forth.component';

describe('ForthComponent', () => {
  let component: ForthComponent;
  let fixture: ComponentFixture<ForthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
