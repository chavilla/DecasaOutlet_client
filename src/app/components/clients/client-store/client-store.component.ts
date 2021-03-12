import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ClientModel } from 'src/app/models/Client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-store',
  styleUrls: ['client-store.component.css'],
  templateUrl: 'client-store.component.html',
})
export class ClientStoreComponent implements AfterViewInit {
  displayedColumns: string[] = ['ruc', 'name', 'lastName', 'email'];
  dataSource: MatTableDataSource<ClientModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading:boolean =true;

  constructor(
    private clientService:ClientService,
  ) {
    // Assign the data to the data source for the table to render
    this.getClients().then( res =>{
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getClients() {

    return new Promise((resolve,reject) =>{
      this.clientService.getClientService().subscribe( res =>{
        resolve(res)
      }, err =>{
        reject(err);
      });
    });
  }
  
  ngAfterViewInit() {}
   

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


