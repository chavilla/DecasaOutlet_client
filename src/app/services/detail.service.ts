import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailModel } from '../models/Detail.model';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  form: FormGroup;
  formGetProduct: FormGroup;
  formInvoice : FormGroup;
  details: Array<DetailModel>=[];
  private baseUrl: string;

  constructor(
    private fb: FormBuilder,
    private _http:HttpClient,
  ) {
    this.baseUrl = baseUrl;
    this.form = this.fb.group({
      id: '',
      amount: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      priceTotal: ['', [Validators.required, , Validators.min(1)]],
      priceTotalSale:  ['', [Validators.required, , Validators.min(0)]],
      tax: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Z][a-záéíóú0-9]+(\s?[A-Za-záéíóú0-9])+$/)]],
      reference: ['', [Validators.required]],
      codebar: ['', [Validators.required]],
    });
    this.formInvoice = this.fb.group({
      invoice_number: ['', [ Validators.required]],
      client_id: ['', Validators.required],
      ruc: ['', Validators.required],
      payMode: ['', Validators.required],
    });
    this.formGetProduct = this.fb.group({
      codebar: ['', Validators.required ],
    });
  }

  // HTTP methods
  saveInvoiceService(data:Object) {
    return this._http.post(`${this.baseUrl}/invoice`, data);
  }

  // form constrols
  initializeFormGroup() {
    this.form.setValue({
      id: '',
      amount: '',
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

  //if the item exists
  exists(detail:DetailModel, details:Array<DetailModel>){
    let exists:boolean = details.some( det => det.id === detail.id );
    return exists;
  }

  //remove the item
  removeItemService(detail:DetailModel) {
    let item = this.details.indexOf(detail)
    this.details.splice(item,1);
  }

  // form controls to client data in formInvoice
  initializeFormGroupInvoice() {
    this.formInvoice.setValue({
      id: '',
      ruc: '',
      payMode: '',
    })
  }
}
