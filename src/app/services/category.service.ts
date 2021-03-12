import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { categoryModel } from '../models/Category.model';
import { baseUrl } from './baseUrl'; 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = baseUrl;
  form:FormGroup;

  constructor(
    private _http:HttpClient,
    private fb:FormBuilder,
  ) {
    this.form= this.fb.group({
       // first: defaultValue, validators
       id: '',
       name: ['', [Validators.required, Validators.pattern(/(^[A-Z][a-záéíóú]+$)/)]],
    })
   }

  public saveCategoryService(category:categoryModel): Observable<any>{
    return this._http.post(`${this.baseUrl}/categories`, category);
  }

  public updateCategoryService(category:categoryModel): Observable<any> {
    return this._http.put(`${this.baseUrl}/products/${category.id}`, category);
  }

  public getIdAndNameCategories() : Observable<any> {
    return this._http.get(`${this.baseUrl}/categories/getIdAndNameCategories`);
  }

  public getCategoryById(id:number){
    return this._http.get(`${this.baseUrl}/categories/${id}`);
  }

  // clean all input fields
  public cleanForm(){
    this.form.setValue({
      id: 0,
      name: '',
    })
  }

  // set a product object into the inputs
  public populateForm(category:categoryModel){
    this.form.setValue(category);
  }

}
