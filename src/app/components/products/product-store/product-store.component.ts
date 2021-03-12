import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/Product.models';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product-service.service';
import { ProductStoreDataSource } from './product-store-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ProductUpdateComponent } from '../product-update/product-update.component';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css']
})
export class ProductStoreComponent implements AfterViewInit, OnInit {

  // Attributes
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductModel>;
  dataSource: ProductStoreDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'description', 'reference', 'category_id', 'stock', 'cost', 'tax', 'priceTotal', 'active'];
  productStore: Array<ProductModel>;
  loading: Array<any>;

  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private route: Router,
    public dialog: MatDialog,
    private ChangeDetectorRef:ChangeDetectorRef,
  ) { }

  // end attributes

  ngOnInit() {
    this.dataSource = new ProductStoreDataSource(this.productService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    
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

  // update product
  onUpdate(product: object) {
    let dialogRef = this.dialog.open(ProductUpdateComponent, {
      minWidth: 900,
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe((res:ProductModel[])=> {
      this.productService.updateProductOnView(this.dataSource.data, res);
      this.refresh(res);
    })
  }

  refresh(itemUpdated) {
    this.dataSource.data.map((i) => i.id === itemUpdated.id ? itemUpdated : i);
    this.dataSource.data = this.dataSource.data;
  }

}
