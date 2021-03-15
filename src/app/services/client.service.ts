import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../models/Client.model';
import { baseUrl } from './baseUrl'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl:string = baseUrl;
  form:FormGroup;

  constructor(
    private _http:HttpClient,
    private fb:FormBuilder,
  ) {
    this.setFormBuilder();
   }

  public setFormBuilder() {
    this.form = this.fb.group({
      // first: defaultValue, validators
      id:'',
      ruc: ['',[Validators.required, Validators.pattern(/^[A-Za-z0-9]\w+$/)]],
      name: ['',[Validators.required, Validators.pattern(/(^[A-ZÁÉÍÓÚ][a-záéíóú]{1,15}$)/)]],
      lastName: ['',[Validators.required, Validators.pattern(/^[A-ZÁÉÍÓÚ][a-záéíóú]{1,15}$/)]],
      phone: ['',[Validators.required, Validators.pattern(/(^6\d{3}-\d{4}$)/)]],
      email: ['',[Validators.required, Validators.pattern(/(^[a-z][\w]+[-\.]?\w+@[a-z]+\.(com)?(net)?(org)?)/)]],
   })
  }

  public saveClientService(client:ClientModel):Observable<any>{
    return this._http.post(`${this.baseUrl}/clients`, client);
  }

  public getClientService(): Observable<any> {
    return this._http.get(`${this.baseUrl}/clients`);
  }

  public updateClientService(client:ClientModel):Observable<any> {
    return this._http.put(`${this.baseUrl}/clients/${client.id}`, client);
  }

  // form constrols
  initializeFormGroup() {
    this.form.setValue({
      id:'',
      ruc: '',
      name: '',
      lastName: '',
      phone: '',
      email: '',
    });
  }

  populateForm(client: Object) {
    this.form.setValue(client);
  }


}
