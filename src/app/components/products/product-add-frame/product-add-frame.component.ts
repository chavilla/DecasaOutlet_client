import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationHelper } from 'src/app/helpers/notification.helper';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { categoryModel } from 'src/app/models/Category.model';
import { ProductModel } from 'src/app/models/Product.models';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
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
  public redirect:RedirectionHelper;
  
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loginService: LoginService,
    private route: Router,
    private render: Renderer2,
  ) {
    super();
  }

  ngOnInit(): void {
      this.form =this.productService.form;
      this.productService.initializeFormGroup();
      this.getCategories(); 
  }

  public setFormBuilder() {
  }
    
  public getCategories(): void {
    this.categoryService.getIdAndNameCategories().subscribe(
      res => this.categories = res,
      err => {
        if(err.status === 401) {
          this.redirect = new RedirectionHelper(this.loginService,this.route,err);
        }
        this.message = err.error.error
      }
    )
  } // end getCategories

  public saveProduct(_frame: FormGroup, messageDialog: HTMLElement) {

    // Destructuring to the components
    const { description, reference, category_id, cost, priceTotal, stock, tax, codebar } = _frame.value;
    this.product = new ProductModel(description, reference, category_id, cost, priceTotal, stock, tax, codebar);

    this.productService.addProductService(this.product).subscribe(
      res => {
        this.toggleElement(this.render, messageDialog, res.msg, 'success');
        this.form.reset();
      },
      err => {
        console.log(err);
        
        if(err.status === 401) {
          this.redirect = new RedirectionHelper(this.loginService,this.route,err);
        }
        this.toggleElement(this.render, messageDialog, err.error.msg, 'failed')
      }
        
    )
  } // end saveProduct

}
