import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product-service.service';
import { categoryModel } from 'src/app/models/Category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { reject } from 'lodash';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {

  form: FormGroup;
  category: categoryModel;
  message:string;
  redirect:RedirectionHelper;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loginService: LoginService,
    private route: Router,
    private dialog:MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data:object,
  ) { 
  }

  ngOnInit(): void {   
      this.form =this.productService.form;
      this.getCategories().then( res =>{
        this.productService.populateForm(this.data);
        this.category = res[0];
      }).catch( err =>{
        if(err.status ===401){
          this.redirect = new RedirectionHelper(this.loginService,this.route,err);
        }
        this.message = err.error.error
      });       
  }

  public getCategories() {
    return new Promise((resolve, reject) =>{
      this.categoryService.getIdAndNameCategories().subscribe(
        res => resolve(res),
        err => reject(err)
      )
    });
  } // end getCategories

  public updateCategory() {
    this.productService.updateProductService(this.form.value).subscribe(
      res => {
        this.dialog.close(this.form.value);
      },
      err =>{
        console.log(err);
      }
    )
  }


}
