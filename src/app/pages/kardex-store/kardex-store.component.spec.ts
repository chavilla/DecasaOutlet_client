import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexStoreComponent } from './kardex-store.component';

describe('KardexStoreComponent', () => {
  let component: KardexStoreComponent;
  let fixture: ComponentFixture<KardexStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KardexStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
