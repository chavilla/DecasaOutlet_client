import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductStoreComponent } from './components/products/product-store/product-store.component';
import { ProductAddFrameComponent } from './components/products/product-add-frame/product-add-frame.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthServiceGuard } from './auth-guard-service.guard';
import { CategoriesAddComponent } from './components/categories/categories-add/categories-add.component';
import { ClientsAddComponent } from './components/clients/clients-add/clients-add.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'app', component: HomeComponent, children: [
            { path: '', component: DashboardComponent },
            { path: 'product', component: ProductStoreComponent },
            { path: 'product/add', component: ProductAddFrameComponent },
            { path: 'categories/add', component: CategoriesAddComponent },
            { path: 'clients/add', component: ClientsAddComponent },
            { path: '**', redirectTo:'', pathMatch:'full' },
        ],
        canActivate:[ AuthServiceGuard],
    },
    { path: '', redirectTo: '/app', pathMatch: 'full', canActivate: [AuthServiceGuard] },
    { path: '**', component: PageNotFoundComponent,  canActivate:[ AuthServiceGuard], },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);