import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreate2Component } from './task-create2.component';

describe('TaskCreate2Component', () => {
  let component: TaskCreate2Component;
  let fixture: ComponentFixture<TaskCreate2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCreate2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
