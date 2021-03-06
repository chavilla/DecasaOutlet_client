import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../models/Client.model';
import { baseUrl } from './baseUrl'; 

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl:string = baseUrl;

  constructor(
    private _http:HttpClient,
  ) { }

  public saveClientService(client:ClientModel):Observable<any>{
    return this._http.post(`${this.baseUrl}/clients`, client);
  }
}
