import { baseUrl } from './baseUrl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/User.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //attributes
  private baseUrl:string;
  form:FormGroup;
  formToUpdate:FormGroup;

  constructor(
    private _http:HttpClient,
    private fb:FormBuilder,
  ) { 
    this.baseUrl = baseUrl;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/(^[A-ZÁÉÍÓÚ][a-záéíóú]{1,15}$)/)]],
      email: ['', [Validators.required,  Validators.pattern(/(^[a-z][\w]+[-\.]?\w+@[a-z]+\.[a-z]+(\.)?([a-z]+)?)/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,20}$/)]],
      passwordRepeat: ['', [Validators.required]],
    });

     this.formToUpdate = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/(^[A-ZÁÉÍÓÚ][a-záéíóú]{1,15}$)/)]],
      email: ['', [Validators.required,  Validators.pattern(/(^[a-z][\w]+[-\.]?\w+@[a-z]+\.[a-z]+(\.)?([a-z]+)?)/)]],
    });
  }

  saveUserService(user:UserModel): Observable<any> {    
    return this._http.post(`${this.baseUrl}/user`, user);
  }

  getUserService(): Observable<any> {
    return this._http.get(`${this.baseUrl}/user`);
  }

  updateUserService(user:UserModel, id): Observable<any> {
    let data_to_backend = {
      ...user,
      id
    }
    
    return this._http.put(`${this.baseUrl}/user`, data_to_backend);
  }

  // form constrols
  initializeFormGroup() {
    this.form.setValue({
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    });
  }

  populateForm(user: Object) {
    this.form.setValue(user);
  }

  populateFormToUpdate(user: UserModel) {
    this.formToUpdate.setValue(user);
  }


}
