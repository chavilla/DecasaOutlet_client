import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { KardexModel } from '../models/Kardex.model';
import { baseUrl } from './baseUrl'; 

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  private baseUrl:string;
  form:FormGroup;
  kardexes:Array<KardexModel> = [];

  constructor(
    private _http: HttpClient,
    private fb: FormBuilder,
  ) { 
    this.baseUrl = baseUrl;
    this.form = fb.group({
      codebar: ['', Validators.required],
    })
  }

  getKardexByCodeBar(codebar:string): Observable<any> {
   return this._http.get(`${this.baseUrl}/kardex/${codebar}`);
  }

}
