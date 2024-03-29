import { ProductModel } from 'src/app/models/Product.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { baseUrl } from './baseUrl';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string;
  form: FormGroup;

  constructor(
    private _http: HttpClient,
    private fb: FormBuilder
  ) {
    this.baseUrl = baseUrl;
    this.form = this.fb.group({
      id: [0, [Validators.required]],
      category_id: ['', [Validators.required]],
      cost: [0, [Validators.required, Validators.min(0.05), Validators.max(999.99)]],
      stock: [0, [Validators.required, , Validators.min(1)]],
      priceTotal: [0, [Validators.required, , Validators.min(1)]],
      tax: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Z][a-záéíóú0-9]+(\s?[A-Za-záéíóú0-9])+$/)]],
      reference: ['', [Validators.required]],
      codebar:[ 0, [ Validators.required, Validators.pattern(/^([0-9]){12,13}$/)]],
      active: 1,
      creador: '',
    });
  }

  getProductService(): Observable<any> {
    return this._http.get(`${this.baseUrl}/products`);
  }

  getProductByIdService(codebar: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/products/${codebar}`);
  }

  getIdAndDescription(): Observable<any> {
    return this._http.get(`${this.baseUrl}/products/getIdAndDescription`);
  }

  addProductService(product: ProductModel): Observable<any> {
    return this._http.post(`${this.baseUrl}/products`, product);
  }

  updateProductService(data:ProductModel): Observable<any> {

    delete data.cost;
    delete data.stock;

    return this._http.put(`${this.baseUrl}/products/${data.id}`, data);
  }

  //inactivate a product on the server
  inactivateProductService(id: number): Observable<any> {
    return this._http.put(`${this.baseUrl}/products/disabled/${id}`, id);
  }

  // disabled a product on the view
  disabledProductOnView(data:Array<ProductModel>,id: number) {
    data.map((i) => i.id === id && i.active === 1 ? i.active = 0 : i.active = 1);
  }

  // form constrols
  initializeFormGroup() {
    this.form.setValue({
      id: 0,
      category_id: '',
      cost: 0,
      stock: 0,
      priceTotal: 0,
      tax: 0,
      reference: '',
      description: '',
      codebar: 0,
      active:1,
      creador:''
    });
  }

  populateForm(product: Object) {
    this.form.setValue(product);
  }


}
