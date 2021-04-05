import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product-service.service';
import { categoryModel } from 'src/app/models/Category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {

  form: FormGroup;
  categories: categoryModel;
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
  ) { }

  ngOnInit(): void {
      this.productService.populateForm(this.data);
      this.form =this.productService.form;
      this.getCategories();       
  }

  public getCategories(): void {
    this.categoryService.getIdAndNameCategories().subscribe(
      res => this.categories = res,
      err => {
        if(err.status ===401){
          this.redirect = new RedirectionHelper(this.loginService,this.route,err);
        }
        this.message = err.error.error
      }
    )
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
