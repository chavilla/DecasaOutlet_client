import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputModel } from '../models/Input.model';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  form:FormGroup;
  private baseUrl:string;

  constructor(
    private fb:FormBuilder,
    private _http:HttpClient,
  ) {

    this.baseUrl = baseUrl;

    this.form = fb.group({
      product_id : ['', [ Validators.required, Validators.min(1)]],
      amount: ['',[Validators.required, Validators.min(1), Validators.max(999)]],
      cost: ['', [Validators.required, Validators.min(0.05), Validators.max(999.99)]],
    });
  }

  //methods
  public saveInputService(input:InputModel): Observable<any> {
    return this._http.post(`${this.baseUrl}/inputs`,input);
  }

  public getInputService(): Observable<any> {
    return this._http.get(`${this.baseUrl}/inputs`);
  }

}
