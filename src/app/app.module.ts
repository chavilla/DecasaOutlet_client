import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductStoreComponent } from './components/products/product-store/product-store.component';
import { ProductAddFrameComponent } from './components/products/product-add-frame/product-add-frame.component';
import { PageNotFoundComponent } from './components/ui/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material/angular-material.module';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { DashboardComponent } from './components/ui/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AuthServiceGuard } from './auth-guard-service.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProductService } from './services/product-service.service';
import { CategoriesAddComponent } from './components/categories/categories-add/categories-add.component';
import { CategoryService } from './services/category.service';
import { ClientsAddComponent } from './components/clients/clients-add/clients-add.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { CategoriesStoreComponent } from './components/categories/categories-store/categories-store.component';
import { ProductUpdateComponent } from './components/products/product-update/product-update.component';
import { ClientStoreComponent } from './components/clients/client-store/client-store.component';
import { ClientUpdateComponent } from './components/clients/client-update/client-update.component';
import { UserAddComponent } from './components/users/user-add/user-add.component';
import { UserStoreComponent } from './components/users/user-store/user-store.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductStoreComponent,
    ProductAddFrameComponent,
    PageNotFoundComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesAddComponent,
    ClientsAddComponent,
    SpinnerComponent,
    CategoriesStoreComponent,
    ProductUpdateComponent,
    ClientStoreComponent,
    ClientUpdateComponent,
    UserAddComponent,
    UserStoreComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    appRoutingProviders,
    LoginService,
    ProductService,
    CategoryService,
    AuthServiceGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
