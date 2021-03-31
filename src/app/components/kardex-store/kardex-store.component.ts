import { Component, OnDestroy, OnInit } from '@angular/core';
import { KardexModel } from 'src/app/models/Kardex.model';
import { KardexService } from 'src/app/services/kardex.service';

@Component({
  selector: 'app-kardex-store',
  templateUrl: './kardex-store.component.html',
  styleUrls: ['./kardex-store.component.css']
})
export class KardexStoreComponent implements OnDestroy {

  kardexStored:Array<KardexModel>;

  constructor(
    private kardexService:KardexService,
  ) {
    this.kardexStored = this.kardexService.kardexes; 
  }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.kardexService.kardexes = [];
  }

}
