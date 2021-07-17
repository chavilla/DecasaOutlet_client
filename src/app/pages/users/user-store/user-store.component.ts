import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/user.service';
import { UserUpdateComponent } from '../user-update/user-update.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.css']
})
export class UserStoreComponent implements OnInit {

   //Attributes
   displayedColumns: string[] = ['name','email','role','active','edit', 'setRole'];
   dataSource: MatTableDataSource<UserModel>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   loading:boolean =true;
   redirect:RedirectionHelper;

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private route:Router,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers().then( res =>{
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

  getUsers(): Promise<any> {
    return new Promise((resolve,reject) => {
      this.userService.getUserService().subscribe( res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  onUpdate(user:UserModel) {
   
   let userToUpdate =_.omit(user, ['active', 'role']);

    let dialogRef = this.dialog.open(UserUpdateComponent, {
      minWidth: 300,
      hasBackdrop: true,
      panelClass: 'dialog-responsive',
      autoFocus: true,
      data: { ...userToUpdate }
    });

    dialogRef.afterClosed().subscribe((res:UserModel[])=> {
      this.refresh();
    })
  }

  onSetRole(user:UserModel) {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert("No tienes permiso para realizar esta acción"); return;
    }
    else {
      alert('adelante');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    // Assign the data to the data source for the table to render
    this.getUsers().then(res => {
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
