import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationHelper } from 'src/app/helpers/notification.helper';
import { categoryModel } from 'src/app/models/Category.model';
import { ProductModel } from 'src/app/models/Product.models';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-add-frame',
  templateUrl: './product-add-frame.component.html',
  styleUrls: ['./product-add-frame.component.css']
})
export class ProductAddFrameComponent extends NotificationHelper implements OnInit {

  public form: FormGroup;
  private product: ProductModel;
  public categories: Array<categoryModel>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private render: Renderer2,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setFormBuilder();
    this.getCategories();
  }

  public setFormBuilder(): void {
    this.form = this.fb.group({
      // first: defaultValue, validators
      category_id: ['', [Validators.required]],
      cost: [0, [Validators.compose([Validators.required, Validators.min(0.05), Validators.max(999.99)])]],
      stock: [0, [Validators.required, , Validators.min(1)]],
      tax: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Z][a-záéíóú0-9]+(\s?[A-Za-záéíóú0-9])+$/)]],
      reference: ['', [Validators.required]],
    })
  } // end setFormBuilder

  public getCategories(): void {
    this.categoryService.getIdAndNameCategories().subscribe(
      res => this.categories = res,
      err => this.message = err.error.error
    )
  } // end getCategories

  public saveProduct(_frame: FormGroup, messageDialog: HTMLElement) {

    // Destructuring to the components
    const { description, reference, category_id, cost, stock, tax } = _frame.value;
    this.product = new ProductModel(description, reference, category_id, cost, stock, tax);
    console.log(this.product);

    this.productService.addProductService(this.product).subscribe(
      res => {
        this.toggleElement(this.render, messageDialog, res.msg, 'success');
        this.form.reset()
      },
      err => this.toggleElement(this.render, messageDialog, err.error.error, 'failed')
    )

  } // end saveProduct

}
