import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthServiceGuard } from '../auth-guard-service.guard';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesStoreComponent } from './categories/categories-store/categories-store.component';
import { ClientStoreComponent } from './clients/client-store/client-store.component';
import { ClientsAddComponent } from './clients/clients-add/clients-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputStoreComponent } from './inputs/input-store/input-store.component';
import { InputsAddComponent } from './inputs/inputs-add/inputs-add.component';
import { DetailAddComponent } from './invoice/detail-add/detail-add.component';
import { InvoiceStoreComponent } from './invoice/invoice-store/invoice-store.component';
import { KardexComponent } from './kardex/kardex.component';
import { ProductAddFrameComponent } from './products/product-add-frame/product-add-frame.component';
import { ProductStoreComponent } from './products/product-store/product-store.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserStoreComponent } from './users/user-store/user-store.component';
import { PagesComponent } from './pages.component';
import { NoFoundComponent } from '../no-found/no-found.component';

const routes: Routes = [
  {
    path: 'app', component: PagesComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'products', component: ProductStoreComponent },
        { path: 'product/add', component: ProductAddFrameComponent },
        { path: 'product/add/:id', component: ProductAddFrameComponent },
        { path: 'categories', component: CategoriesStoreComponent },
        { path: 'categories/add', component: CategoriesAddComponent },
        { path: 'categories/add/:id', component: CategoriesAddComponent },
        { path: 'clients/add', component: ClientsAddComponent },
        { path: 'clients', component: ClientStoreComponent },
        { path: 'users', component: UserStoreComponent },
        { path: 'users/add', component: UserAddComponent },
        { path: 'inputs', component: InputStoreComponent },
        { path: 'inputs/add', component: InputsAddComponent },
        { path: 'sales', component: DetailAddComponent },
        { path: 'sales/add', component: DetailAddComponent },
        { path: 'kardex', component: KardexComponent },
        { path: 'invoices', component: InvoiceStoreComponent },
        { path: '**', component: NoFoundComponent },
    ],
    canActivate: [ AuthServiceGuard],
},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
