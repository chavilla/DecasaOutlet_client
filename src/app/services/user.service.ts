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

  constructor(
    private _http:HttpClient,
    private fb:FormBuilder,
  ) { 
    this.baseUrl = baseUrl;
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/(^[A-ZÁÉÍÓÚ][a-záéíóú]{1,15}$)/)]],
      userEmail: ['', [Validators.required,  Validators.pattern(/(^[a-z][\w]+[-\.]?\w+@[a-z]+\.[a-z]+(\.)?([a-z]+)?)/)]],
      userPassword: ['', [Validators.required, Validators.pattern(/^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,20}$/)]],
      userPasswordRepeat: ['', [Validators.required]],
    });
  }

  saveUserService(user:UserModel): Observable<any> {    
    return this._http.post(`${this.baseUrl}/user`, user);
  }

}
