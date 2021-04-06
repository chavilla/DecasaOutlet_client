import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationHelper } from 'src/app/helpers/notification.helper';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { InputModel } from 'src/app/models/Input.model';
import { InputService } from 'src/app/services/input.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-inputs-add',
  templateUrl: './inputs-add.component.html',
  styleUrls: ['./inputs-add.component.css']
})
export class InputsAddComponent extends NotificationHelper implements OnInit {

  form:FormGroup;
  products:Object;
  input:InputModel;
  redirect: RedirectionHelper;

  constructor(
    private inputService:InputService,
    private productService:ProductService,
    private render:Renderer2,
    private loginService:LoginService,
    private route:Router,
  ) {
    super();
   }

  ngOnInit(): void {
    this.form = this.inputService.form;
    this.getProducts();
  }

  saveInput(form:FormGroup, messageDialog:HTMLElement){

    const { product_id, amount, cost, invoice_number } = form.value;

    //Creating an objet type Inputmodel
    this.input = new InputModel(product_id, amount, cost, invoice_number);
    
    this.inputService.saveInputService(this.input).subscribe( 
      res => {   
         this.toggleElement(this.render, messageDialog, res.msg, 'success');
         this.form.reset();
      }, 
      err =>{
        if (err.status === 401) {
          this.redirect = new RedirectionHelper(this.loginService, this.route, err);
        }
        this.toggleElement(this.render, messageDialog, err.error.msg, 'failed');
      });
  
  }

  getProducts() {
    this.productService.getIdAndDescription().subscribe( res =>{
      this.products = res;
    }, 
    err => {
      alert(err.error.msg);
    });
  }

}
