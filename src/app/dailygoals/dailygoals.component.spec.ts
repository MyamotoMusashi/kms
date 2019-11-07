import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailygoalsComponent } from './dailygoals.component';

describe('DailygoalsComponent', () => {
  let component: DailygoalsComponent;
  let fixture: ComponentFixture<DailygoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailygoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailygoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
