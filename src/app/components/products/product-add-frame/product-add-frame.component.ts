import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { categoryModel } from 'src/app/models/Category.model';
import { ProductModel } from 'src/app/models/Product.models';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-add-frame',
  templateUrl: './product-add-frame.component.html',
  styleUrls: ['./product-add-frame.component.css']
})
export class ProductAddFrameComponent implements OnInit {

  public frame:FormGroup;
  public message: String = null;
  private product:ProductModel;
  public categories: Array<categoryModel>;

  constructor(
    private fb:FormBuilder,
    private productService:ProductService,
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.setFormBuilder();
    this.getCategories();
  }

  public setFormBuilder(): void {
    this.frame = this.fb.group({
      // first: defaultValue, validators
      category_id: [ '', [Validators.required]],
      cost: [0, [Validators.compose([ Validators.required, Validators.min(0.05), Validators.max(999.99)])]],
      stock: [0, [Validators.required, , Validators.min(1)]],
      tax: [0, [Validators.required,  Validators.min(0)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Z][a-záéíóú0-9]+(\s?[A-Za-záéíóú0-9])+$/)]],
      reference: ['', [ Validators.required]],
   })
  }

  public getCategories(): void {
    this.categoryService.getIdAndNameCategories().subscribe(
      res => this.categories = res,
      err => this.message = err.error.error
    )
  }

  public saveProduct(_frame:FormGroup){

    // Destructuring to the components
    const { description, reference, category_id, cost, stock, tax } = _frame.value;
    this.product = new ProductModel(description, reference, category_id, cost, stock, tax);
    this.productService.addProductService(this.product).subscribe(
      res => console.log(res),
      err => console.log(err)
    )

  }

}
