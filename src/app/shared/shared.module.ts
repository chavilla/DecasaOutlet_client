import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../material/angular-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';

const pages = [
  SidebarComponent,
  SpinnerComponent
];

@NgModule({
  declarations: pages,
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: pages,
})
export class SharedModule { }
