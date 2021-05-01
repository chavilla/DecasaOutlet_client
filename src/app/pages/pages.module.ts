import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesStoreComponent } from './categories/categories-store/categories-store.component';
import { ClientStoreComponent } from './clients/client-store/client-store.component';
import { ClientUpdateComponent } from './clients/client-update/client-update.component';
import { ClientsAddComponent } from './clients/clients-add/clients-add.component';
import { ClientsModalComponent } from './clients/clients-modal/clients-modal.component';
import { InputStoreComponent } from './inputs/input-store/input-store.component';
import { InputsAddComponent } from './inputs/inputs-add/inputs-add.component';
import { DetailAddComponent } from './invoice/detail-add/detail-add.component';
import { DetailStoreComponent } from './invoice/detail-store/detail-store.component';
import { InvoiceStoreComponent } from './invoice/invoice-store/invoice-store.component';
import { KardexStoreComponent } from './kardex-store/kardex-store.component';
import { KardexComponent } from './kardex/kardex.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserStoreComponent } from './users/user-store/user-store.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../material/angular-material.module';
import { ProductAddFrameComponent } from './products/product-add-frame/product-add-frame.component';
import { ProductStoreComponent } from './products/product-store/product-store.component';

const pages = [
  CategoriesAddComponent,
  CategoriesStoreComponent,
  ClientsAddComponent,
  ClientsModalComponent,
  ClientStoreComponent,
  ClientUpdateComponent,
  DashboardComponent,
  DetailAddComponent,
  DetailStoreComponent,
  InvoiceStoreComponent,
  InputsAddComponent,
  InputStoreComponent,
  KardexComponent,
  KardexStoreComponent,
  PagesComponent,
  ProductAddFrameComponent,
  ProductUpdateComponent,
  ProductStoreComponent,
  UserStoreComponent,
  UserAddComponent,
  UserUpdateComponent,
  UserStoreComponent,
];

@NgModule({
  declarations: pages,
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports : pages,
})
export class PagesModule { }
