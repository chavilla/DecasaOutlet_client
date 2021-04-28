// Modules
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { PagesModule } from './pages/pages.module';
// services
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AuthServiceGuard } from './auth-guard-service.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProductService } from './services/product-service.service';
import { CategoryService } from './services/category.service';
// Components
import { NoFoundComponent } from './no-found/no-found.component';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NoFoundComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    PagesModule,
    SharedModule,
  ],
  providers: [
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
