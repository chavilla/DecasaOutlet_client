import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductStoreComponent } from './components/products/product-store/product-store.component';
import { ProductAddFrameComponent } from './components/products/product-add-frame/product-add-frame.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'app', component: HomeComponent, children: [
            { path: 'product', component: ProductStoreComponent },
            { path: 'product/add', component: ProductAddFrameComponent },
        ]
    },
    { path: '', redirectTo: '/app', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);