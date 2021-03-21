import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsAddComponent } from './inputs-add.component';

describe('InputsAddComponent', () => {
  let component: InputsAddComponent;
  let fixture: ComponentFixture<InputsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
