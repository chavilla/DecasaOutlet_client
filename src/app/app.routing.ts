import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthServiceGuard } from './auth-guard-service.guard';
import { NoFoundComponent } from './no-found/no-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full', canActivate: [AuthServiceGuard] },
  { path: '**', component: NoFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
