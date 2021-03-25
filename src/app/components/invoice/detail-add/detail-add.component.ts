import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailModel } from 'src/app/models/Detail.model';
import { DetailService } from 'src/app/services/detail.service';
import { ProductService } from 'src/app/services/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { DetailProductAddComponent } from '../detail-product-add/detail-product-add.component';
import { ProductStoreComponent } from '../../products/product-store/product-store.component';

@Component({
  selector: 'app-detail-add',
  templateUrl: './detail-add.component.html',
  styleUrls: ['./detail-add.component.css']
})
export class DetailAddComponent implements OnInit {

  form: FormGroup;
  details: Array<DetailModel>;
  message: string;
  loading: boolean;
  item:boolean;

  constructor(
    private detailService: DetailService,
    private dialog: MatDialog,
    private productService: ProductService,
  ) {
    this.form = this.detailService.form;
    this.details = this.detailService.details;
  }

  ngOnInit(): void {
  }

  //validate the codebar is not empty
  getCodebar(code:object){
    let codebar= code.toString();
    if (codebar.trim()==='') {
      alert('Debes ingresar un código');
      return;
    }
    this.getProductByCodebar(codebar)
  }

  //if the codebar is not empty, get the product
  getProductByCodebar(codebar: string) {    

    this.loading = true;
    this.message = '';
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
          this.setProductOnItem(res[0]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  setProductOnItem(detail: DetailModel) {
    this.item=true;
    detail.priceTotalSale = detail.priceTotal;
    detail.amount=1;
    this.detailService.populateForm(detail);
  }

  onSubmit(form: FormGroup) {

    const { amount, priceTotal } = form.value;
    this.form.controls['priceTotalSale'].setValue(amount*priceTotal);
    this.detailService.details.push(form.value);
    this.item =false;
    this.form.reset();
  }

  stockValidator(form:FormGroup){
    const { stock, amount } = form.value; 
    if (amount>stock) {
      alert('La cantidad no puede ser mayor al stock');
      this.form.controls['amount'].setValue(0);
    }
  }

}
