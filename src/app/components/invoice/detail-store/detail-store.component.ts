import { Component, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DetailModel } from 'src/app/models/Detail.model';
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.css']
})
export class DetailStoreComponent implements OnDestroy  {

  dataSource: MatTableDataSource<DetailModel>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'codebar', 'amount' ,'description', 'reference', 'priceTotal', 'tax', 'priceTotalSale'];
  details:Array<DetailModel>;

  constructor(
    private detailService:DetailService,
  ) { 
    this.details = this.detailService.details;    
  }

  removeItem(detail:DetailModel){
    this.detailService.removeItemService(detail);
  }

  ngOnDestroy():void {
    this.detailService.details=[];
  }

}
