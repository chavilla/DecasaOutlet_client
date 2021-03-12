import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product-service.service';
import { categoryModel } from 'src/app/models/Category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {

  form: FormGroup;
  categories: categoryModel;
  message:string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
      err => this.message = err.error.error
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
