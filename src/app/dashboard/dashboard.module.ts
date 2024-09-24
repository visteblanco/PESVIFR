import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardBodyComponent } from './layouts/dashboard-body/dashboard-body.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';


@NgModule({
  declarations: [
    DashboardBodyComponent,
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  exports: [
    DashboardLayoutComponent
  ]
})
export class DashboardModule { }
