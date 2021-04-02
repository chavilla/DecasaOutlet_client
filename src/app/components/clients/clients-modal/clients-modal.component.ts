import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { ClientModel } from 'src/app/models/Client.model';
import { ClientService } from 'src/app/services/client.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-clients-modal',
  templateUrl: './clients-modal.component.html',
  styleUrls: ['./clients-modal.component.css']
})
export class ClientsModalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ClientModel>;
  displayedColumns: string[] = ['id','ruc', 'name', 'lastName', 'phone' ,'email'];
  redirect:RedirectionHelper;
  loading:boolean =true;

  constructor(
    private clientService:ClientService,
    private loginService:LoginService,
    private route:Router,
    private dialog:MatDialogRef<ClientsModalComponent>,
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
  });;
   }

  ngOnInit(): void {
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

  setRuc(id:string, ruc:string){
    let data = { id, ruc};
    this.dialog.close(data);
  }

}
