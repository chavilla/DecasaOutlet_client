import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddFrameComponent } from './product-add-frame.component';

describe('ProductAddFrameComponent', () => {
  let component: ProductAddFrameComponent;
  let fixture: ComponentFixture<ProductAddFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
