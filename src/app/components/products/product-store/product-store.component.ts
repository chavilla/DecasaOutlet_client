import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/Product.models';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { RedirectionHelper } from 'src/app/helpers/redirection.helper';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css']
})
export class ProductStoreComponent  {

  // Attributes
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ProductModel>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','codebar', 'description', 'reference', 'category_id', 'stock', 'cost', 'tax', 'priceTotal', 'active'];
  loading:boolean = true;
  redirect:RedirectionHelper;

  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private route: Router,
    public dialog: MatDialog,
  ) {
    // Assign the data to the data source for the table to render
    this.getProducts().then( res =>{
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

  getProducts() {
    return new Promise((resolve,reject) =>{
      this.productService.getProductService().subscribe( res =>{
        resolve(res)
      }, err =>{
        reject(err);
      });
    });
  }

  // disabled a product from service
  inactivateProduct(id: number) {
    this.productService.inactivateProductService(id).subscribe(
      res => {
        this.productService.disabledProductOnView(this.dataSource.data, id);
      },
      err => {
        if (err.status === 401) {
          alert('Su sesión ha expirado');
          this.loginService.logout();
          this.route.navigate(['../login']);
        }
      });
  } // end inactivate

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // update product
  onUpdate(product: object) {
    let dialogRef = this.dialog.open(ProductUpdateComponent, {
      minWidth: 900,
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe((res:ProductModel[])=> {
      this.refresh();
    })
  }

  refresh() {
    // Assign the data to the data source for the table to render
    this.getProducts().then( res =>{
      this.loading = false;
      this.dataSource = new MatTableDataSource(res[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
