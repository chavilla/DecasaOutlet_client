import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { DetailModel } from 'src/app/models/Detail.model';
import { DetailService } from 'src/app/services/detail.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-detail-add',
  templateUrl: './detail-add.component.html',
  styleUrls: ['./detail-add.component.css']
})
export class DetailAddComponent implements OnInit {

  form: FormGroup;
  formGetProduct: FormGroup;
  detail: DetailModel;
  details: Array<DetailModel> =[];
  message: string;
  loading: boolean;
  item: boolean;
  redirect:RedirectionHelper;
  invoice_number:string;

  constructor(
    private detailService: DetailService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private loginService:LoginService,
    private route:Router,
  ) {
    this.form = this.detailService.form;
    this.formGetProduct = this.detailService.formGetProduct;
  }

  ngOnInit():void {
    this.getLastNoInvoice();
  }

  getLastNoInvoice() {
    this.invoiceService.getLastNoInvoiceService().subscribe( res =>{
     this.invoice_number = res;
    },
    err => {
      if(err.status === 401) {
        this.redirect = new RedirectionHelper(this.loginService,this.route,err);
      }
      console.log(err);
    });
  }

  //validate the codebar is not empty
  getCodebar(formGetProduct:FormGroup) {
    let { codebar }=formGetProduct.value;
    if (codebar.trim() === '') {
      alert('Debes ingresar un código');
      return;
    }
    this.getProductByCodebar(codebar);
  }

  //if the codebar is not empty, get the product
  getProductByCodebar(codebar: string) {

    this.loading = true;
    this.message = 'Buscando';
    this.productService.getProductByIdService(codebar).subscribe(
      (res) => {
        if (res.length === 0) {
          this.loading = false;
          this.detailService.initializeFormGroup();
          this.message = 'Producto No encontrado';
        }
        else {

          this.loading = false;
          this.message = null;

          //validate to item is not exists
          if (this.detailService.exists(res[0], this.details)) {
            this.detailService.initializeFormGroup();
            alert('Este Producto ya está agregado');
            return;
          }
          this.setProductOnItem(res[0]);
        }
      },
      err => {
        if(err.status === 401) {
          this.redirect = new RedirectionHelper(this.loginService,this.route,err);
        }
      }
    );
  }

  setProductOnItem(detail: any) {
    this.item = true;
    detail.priceTotalSale = detail.priceTotal;
    detail.amount = 0;
    this.detailService.populateForm(detail);

  }

  onSubmit(form: FormGroup) {

    //set priceTotalsale
    this.form.controls['priceTotalSale'].setValue(form.value.amount * form.value.priceTotal);
    const { id, stock, amount, priceTotal, priceTotalSale, description, codebar, tax, reference } = this.form.value;

    if(amount>stock) {
      alert('La cantidad no puede ser mayor al stock');
      return;
    }

    if(amount ===0 ) {
      alert('La Cantidad no puede ser Cero');
      return;
    }

    // a new DetailModel object is made
    this.detail = new DetailModel(id, amount, priceTotal, priceTotalSale, description, codebar, tax, reference);

    // a DetailModel is pushed into detailService array
    this.details.push(this.detail);
    this.item = false;
    this.form.reset();

  }

  stockValidator(form: FormGroup) {
    const { stock, amount } = form.value;
    if (amount > stock) {
      alert('La cantidad no puede ser mayor al stock');
      this.form.controls['amount'].setValue(0);
    }
  }

  cleanDetails():void {
    this.details =[];
  }

  removeItem($event:DetailModel){
    let item = this.details.indexOf($event);
    this.details.splice(item,1);

  }
}
