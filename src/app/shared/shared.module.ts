import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularMaterialModule } from '../material/angular-material.module';

const pages = [
  SidebarComponent,
  SpinnerComponent,
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
