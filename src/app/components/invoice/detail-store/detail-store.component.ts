import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DetailModel } from 'src/app/models/Detail.model';
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.css']
})
export class DetailStoreComponent {

  @Input() details:Array<DetailModel>;
  @Output() cleanDetails:EventEmitter<DetailModel>=new EventEmitter();
  @Output() removeItem:EventEmitter<DetailModel>=new EventEmitter();
  @ViewChild('total') totalToPay:ElementRef; 

  constructor(
    private detailService:DetailService,
  ){}

  startRemoveItem(detail:DetailModel){
    this.removeItem.emit(detail);
  }

  cleanAllDetails() {
    this.cleanDetails.emit();
  }


  getSubTotal() {
    return this.details.reduce( (acum, det ) => acum += det.priceTotalSale, 0);
  }

  getTaxTotal() {
    return this.details.reduce( (acum, det ) => acum += det.tax, 0);
  }

  getTotalToPay() {
    return this.getSubTotal() + this.getTaxTotal();
  }

  addInvoice(details:Array<DetailModel>) {
    const data = {
      details,
      totalToPay: this.getTotalToPay(),
    }

    this.detailService.saveInvoiceService(data);

  }


}
