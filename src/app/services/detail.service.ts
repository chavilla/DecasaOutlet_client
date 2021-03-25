import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailModel } from '../models/Detail.model';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  form: FormGroup;
  details: Array<DetailModel>=[];
  private baseUrl: string;

  constructor(
    private fb: FormBuilder,
  ) {
    this.baseUrl = baseUrl;
    this.form = this.fb.group({
      id: '',
      stock: [0, [Validators.required, , Validators.min(1)]],
      priceTotal: [0, [Validators.required, , Validators.min(1)]],
      priceTotalSale:  [0, [Validators.required, , Validators.min(0)]],
      tax: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Z][a-záéíóú0-9]+(\s?[A-Za-záéíóú0-9])+$/)]],
      reference: ['', [Validators.required]],
      codebar: ['', [Validators.required]],
    });
  }

  // form constrols
  initializeFormGroup() {
    this.form.setValue({
      id: '',
      stock: 0,
      priceTotal: 0,
      priceTotalSale: 0,
      tax: 0,
      reference: '',
      description: '',
      codebar: '',
    });
  }

  populateForm(detail: DetailModel) {
    this.form.setValue(detail);
  }

}
