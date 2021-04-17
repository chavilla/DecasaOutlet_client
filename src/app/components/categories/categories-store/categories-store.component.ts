import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';
import { categoryModel } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-categories-store',
  templateUrl: './categories-store.component.html',
  styleUrls: ['./categories-store.component.css']
})
export class CategoriesStoreComponent {

  // Attributes
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<categoryModel>;
  loading: boolean = true;
  redirect: RedirectionHelper;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(
    private categoryService:CategoryService,
    private loginService: LoginService,
    private route:Router,
  ) {
    this.getCategories().then(res => {      
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( err => {
      if (err.status ===401) {
        this.redirect = new RedirectionHelper(this.loginService, this.route, err);
      }
    });
  }

  getCategories() {
    return new Promise((resolve, reject)=>{
      this.categoryService.getIdAndNameCategories().subscribe( res =>{
        resolve(res);
      }, err => {
        reject(err);
      });
    }); // end promise
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCategory(category:categoryModel){
    //this.categoryService.populateForm(category);
    this.route.navigate([`app/categories/add/${category.id}`],{ queryParams: { editionMode:1} });
  }
}
