import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Product.models';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string;

  constructor(
    private _http:HttpClient
  ) 
  {
    this.baseUrl = baseUrl;
  }

  getProductServie(): Observable<any> {
    return this._http.get(`${this.baseUrl}/products`);
  }

  addProductService(product: ProductModel): Observable<any> {
  return this._http.post(`${this.baseUrl}/products`, product);
  }

}
