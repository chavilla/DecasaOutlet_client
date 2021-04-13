import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl:string;

  constructor(
    private _http:HttpClient,
  ) { 
    this.baseUrl = baseUrl;
  }

  getStatistics(): Observable<any> {
    return this._http.get(`${this.baseUrl}/dashboard`);
  }

}
