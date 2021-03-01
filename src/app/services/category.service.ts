import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryModel } from '../models/Category.model';
import { baseUrl } from './baseUrl'; 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = baseUrl;

  constructor(
    private _http:HttpClient
  ) { }

  public saveCategoryService(category:categoryModel): Observable<any>{
    return this._http.post(`${this.baseUrl}/categories`, category);
  }

  public getIdAndNameCategories() : Observable<any> {
    return this._http.get(`${this.baseUrl}/categories/getIdAndNameCategories`);
  }

}
