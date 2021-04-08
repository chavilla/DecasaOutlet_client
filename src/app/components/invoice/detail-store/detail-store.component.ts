import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DetailModel } from 'src/app/models/Detail.model';
import { DetailService } from 'src/app/services/detail.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientsModalComponent } from '../../clients/clients-modal/clients-modal.component';
import { FormGroup } from '@angular/forms';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.css']
})
export class DetailStoreComponent implements OnDestroy, OnInit {

  @Input() details: Array<DetailModel>;
  @Input() invoice_number:string;
  @Output() cleanDetails: EventEmitter<DetailModel> = new EventEmitter();
  @Output() removeItem: EventEmitter<DetailModel> = new EventEmitter();
  @ViewChild('total') totalToPay: ElementRef;
  form: FormGroup;
  redirect: RedirectionHelper;

  constructor(
    private detailService: DetailService,
    public dialog: MatDialog,
    private loginService: LoginService,
    private route: Router,
  ) {
    this.form = this.detailService.formInvoice;
  }

  ngOnInit() {
    this.parseInvoiceNumber();
  }

  ngOnDestroy() {
    this.form.reset();
  }

  startRemoveItem(detail: DetailModel) {
    this.removeItem.emit(detail);
  }

  cleanAllDetails() {
    this.cleanDetails.emit();
  }

  getSubTotal() {
    return this.details.reduce((acum, det) => acum += det.priceTotalSale, 0);
  }

  getTaxTotal() {
    return this.details.reduce((acum, det) => acum += det.tax, 0);
  }

  getTotalToPay() {
    return this.getSubTotal() + this.getTaxTotal();
  }

  addInvoice(details: Array<DetailModel>, form: FormGroup) {

    let totalToPay = this.getTotalToPay();    
    //activate the contol number_invoice
    form.get('invoice_number').enable();

    details.forEach(detail => {
      delete detail.codebar;
      delete detail.description;
      delete detail.reference;
      delete detail.tax;
    });

    const data = {
      details,
      totalToPay,
      ...form.value,
    }
    
    this.detailService.saveInvoiceService(data).subscribe(res => {
      alert(res);
      this.form.reset();
      this.cleanAllDetails();
    },
      err => {
        console.log(err);
        
        if (err.status === 401) {
          this.redirect = new RedirectionHelper(this.loginService, this.route, err);
        }
      });
  }

  // open dialog
  onSelectClient() {
    let dialogRef = this.dialog.open(ClientsModalComponent, { minWidth: 1000 });

    dialogRef.afterClosed().subscribe(res => {
      this.form.controls['ruc'].setValue(res.ruc);
      this.form.controls['client_id'].setValue(res.id);
    })
  }

  parseInvoiceNumber(){ 

    let numInvoice=parseInt(this.invoice_number);
    let numInvString : string;

    if (numInvoice < 10) {
      numInvString= `000${numInvoice+1}`; 
    }

    else if( numInvoice >= 10 && numInvoice < 100 ) {
      numInvString= `00${numInvoice+1}`;
    }

    else if (numInvoice >=100 && numInvoice < 1000 ) {
      numInvString = `0${numInvoice+1}`;
    }

    else {
      numInvString = `${numInvoice}`;
    }
    
    this.form.controls['invoice_number'].setValue(numInvString);
    this.form.get('invoice_number').disable();
    
  }
}
