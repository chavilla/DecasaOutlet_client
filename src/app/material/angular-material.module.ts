import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  exports: [
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
  ]
})
export class AngularMaterialModule { }
