import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/Auth.model';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = baseUrl;
  }

  public loginService(body:AuthModel): Observable<any> {
    return this._http.post<any>(`${this.url}/api/v1/auth/login`, body);
  }

}
