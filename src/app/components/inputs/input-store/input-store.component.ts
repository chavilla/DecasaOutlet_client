import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InputModel } from 'src/app/models/Input.model';
import { InputService } from 'src/app/services/input.service';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-input-store',
  styleUrls: ['input-store.component.css'],
  templateUrl: 'input-store.component.html',
})
export class InputStoreComponent {

  //Attributes
  displayedColumns: string[] = ['amount', 'description', 'cost', 'user', 'updated_at'];
  dataSource: MatTableDataSource<InputModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean = true;
  redirect: RedirectionHelper;

  constructor(
    private inputService: InputService,
    private loginService: LoginService,
    private route: Router,
    public dialog: MatDialog,
  ) {
    // Assign the data to the data source for the table to render
    this.getInputs().then(res => {
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      if (err.status === 401) {
        this.redirect = new RedirectionHelper(this.loginService, this.route, err);
      }
    });
  }

  getInputs() {
    return new Promise((resolve, reject) => {
      this.inputService.getInputService().subscribe(res => {
        resolve(res)
      }, err => {
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

  refresh() {
    // Assign the data to the data source for the table to render
    this.getInputs().then(res => {
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      if (err.status === 401) {
        this.redirect = new RedirectionHelper(this.loginService, this.route, err);
      }
    });
  }

}


