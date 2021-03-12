import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { categoryModel } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category.service';
import { CategoriesStoreDataSource } from './categories-store-datasource';

@Component({
  selector: 'app-categories-store',
  templateUrl: './categories-store.component.html',
  styleUrls: ['./categories-store.component.css']
})
export class CategoriesStoreComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<categoryModel>;
  dataSource: CategoriesStoreDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(
    private categoryService:CategoryService,
    private route:Router,
  ) {}

  ngOnInit() {
    this.dataSource = new CategoriesStoreDataSource(this.categoryService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openCategory(category:categoryModel){
    //this.categoryService.populateForm(category);
    this.route.navigate([`app/categories/add/${category.id}`],{ queryParams: { editionMode:1} });
  }
}
