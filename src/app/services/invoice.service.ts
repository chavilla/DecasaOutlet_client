import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  form:FormGroup;
  private baseUrl: string;

  constructor(
    private fb:FormBuilder,
    private _http:HttpClient,
  ){
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

  // get last number inserted
  public getLastNoInvoiceService(): Observable<any>{
    return this._http.get(`${this.baseUrl}/invoice/lastID`);
  }

  // get all invoices
  public getInvoicesService(): Observable<any>{
    return this._http.get(`${this.baseUrl}/invoices`);
  } 

}
