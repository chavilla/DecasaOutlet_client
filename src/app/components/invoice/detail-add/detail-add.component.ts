import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailModel } from 'src/app/models/Detail.model';
import { DetailService } from 'src/app/services/detail.service';
import { ProductService } from 'src/app/services/product-service.service';
import * as _ from 'lodash';

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

  constructor(
    private detailService: DetailService,
    private productService: ProductService,
  ) {
    this.form = this.detailService.form;
    this.details = this.detailService.details;
  }

  ngOnInit(): void {
  }

  onBlur(code: any) {

    let codebar = code.target.value;
    this.loading = true;
    this.message = '';

    if (codebar.trim() !== '') {
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
    else {
      this.loading = false;
      this.message = 'Producto No encontrado';
      this.detailService.initializeFormGroup();
    }
  }

  setProductOnItem(detail: DetailModel) {
    detail.priceTotalSale = detail.priceTotal;
    this.detailService.populateForm(detail);
   console.log(this.form.value);
   
  }

  onSubmit(form: FormGroup) {
    this.detailService.initializeFormGroup();
    this.detailService.details.push(form.value);
    this.form.reset();

  }

}
