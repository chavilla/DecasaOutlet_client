import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceStoreComponent } from './invoice-store.component';

describe('InvoiceStoreComponent', () => {
  let component: InvoiceStoreComponent;
  let fixture: ComponentFixture<InvoiceStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
