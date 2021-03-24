import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/ui/page-not-found/page-not-found.component';
import { ProductStoreComponent } from './components/products/product-store/product-store.component';
import { ProductAddFrameComponent } from './components/products/product-add-frame/product-add-frame.component';
import { DashboardComponent } from './components/ui/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthServiceGuard } from './auth-guard-service.guard';
import { CategoriesAddComponent } from './components/categories/categories-add/categories-add.component';
import { ClientsAddComponent } from './components/clients/clients-add/clients-add.component';
import { CategoriesStoreComponent } from './components/categories/categories-store/categories-store.component';
import { ClientStoreComponent } from './components/clients/client-store/client-store.component';
import { UserAddComponent } from './components/users/user-add/user-add.component';
import { UserStoreComponent } from './components/users/user-store/user-store.component';
import { InputsAddComponent } from './components/inputs/inputs-add/inputs-add.component';
import { InputStoreComponent } from './components/inputs/input-store/input-store.component';
import { InvoiceAddComponent } from './components/invoice/invoice-add/invoice-add.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'app', component: HomeComponent, children: [
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
            { path: 'sales', component: InvoiceAddComponent },
            { path: 'sales/add', component: InvoiceAddComponent },
            { path: '**', redirectTo:'', pathMatch:'full' },
        ],
        canActivate:[ AuthServiceGuard],
    },
    { path: '', redirectTo: '/app', pathMatch: 'full', canActivate: [AuthServiceGuard] },
    { path: '**', component: PageNotFoundComponent,  canActivate:[ AuthServiceGuard], },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);