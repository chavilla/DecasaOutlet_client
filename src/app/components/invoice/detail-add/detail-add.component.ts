import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailModel } from 'src/app/models/Detail.model';
import { DetailService } from 'src/app/services/detail.service';
import { ProductService } from 'src/app/services/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';


@Component({
  selector: 'app-detail-add',
  templateUrl: './detail-add.component.html',
  styleUrls: ['./detail-add.component.css']
})
export class DetailAddComponent {

  form: FormGroup;
  detail: DetailModel;
  details: Array<DetailModel>;
  message: string;
  loading: boolean;
  item: boolean;

  constructor(
    private detailService: DetailService,
    private productService: ProductService,
  ) {
    this.form = this.detailService.form;
    this.details = this.detailService.details;
  }

  //validate the codebar is not empty
  getCodebar(code: object) {
    let codebar = code.toString();
    if (codebar.trim() === '') {
      alert('Debes ingresar un código');
      return;
    }
    this.getProductByCodebar(codebar)
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
          if (this.detailService.exists(res[0])) {
            this.detailService.initializeFormGroup();
            alert('Este Producto ya está agregado');
            return;
          }
          this.setProductOnItem(res[0]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  setProductOnItem(detail: any) {
    this.item = true;
    detail.priceTotalSale = detail.priceTotal;
    detail.amount = 1;
    this.detailService.populateForm(detail);

  }

  onSubmit(form: FormGroup) {

    //set priceTotalsale
    this.form.controls['priceTotalSale'].setValue(form.value.amount * form.value.priceTotal);
    const { id, amount, priceTotal, priceTotalSale, description, codebar, tax, reference } = this.form.value;

    // a new DetailModel object is made
    this.detail = new DetailModel(id, amount, priceTotal, priceTotalSale, description, codebar, tax, reference);

    // a DetailModel is pushed into detailService array
    this.detailService.details.push(this.detail);
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

}
