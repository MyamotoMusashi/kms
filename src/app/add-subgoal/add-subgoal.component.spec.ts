import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubGoalComponent } from './add-subgoal.component';

describe('AddSubGoalComponent', () => {
  let component: AddSubGoalComponent;
  let fixture: ComponentFixture<AddSubGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
