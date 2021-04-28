import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const elements = [
  LoginComponent
];

@NgModule({
  declarations: elements,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    elements,
  ]
})
export class AuthModule { }
