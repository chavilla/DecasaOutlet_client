import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientModel } from 'src/app/models/Client.model';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-store',
  styleUrls: ['client-store.component.css'],
  templateUrl: 'client-store.component.html',
})
export class ClientStoreComponent  {

  //Attributes
  displayedColumns: string[] = ['ruc', 'name', 'lastName', 'phone' ,'email'];
  dataSource: MatTableDataSource<ClientModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading:boolean =true;
  redirect:RedirectionHelper;

  constructor(
    private clientService:ClientService,
    private loginService: LoginService,
    private route:Router,
    public dialog: MatDialog,
  ) {
    // Assign the data to the data source for the table to render
    this.getClients().then( res =>{
      
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch( err =>{
      if(err.status ===401){
        this.redirect = new RedirectionHelper(this.loginService,this.route,err);
      }
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
   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdate(client: ClientModel) {
    let dialogRef = this.dialog.open(ClientUpdateComponent, {
      minWidth: 900,
      data: { ...client }
    });


    dialogRef.afterClosed().subscribe((res:ClientModel[])=> {
      //this.clientService.updateProductOnView(this.dataSource.data, res);
      this.refresh();
    })
  }

  refresh() {
     // Assign the data to the data source for the table to render
     this.getClients().then( res =>{
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}


