import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductAddComponent } from './detail-product-add.component';

describe('DetailProductAddComponent', () => {
  let component: DetailProductAddComponent;
  let fixture: ComponentFixture<DetailProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProductAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
