import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../material/angular-material.module';
import { SharedModule } from '../shared/shared.module';

const elements = [
  LoginComponent,
];

@NgModule({
  declarations: elements,
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:
elements,
})
export class AuthModule { }
