import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { InspeccionRoutingModule } from './inspeccion-routing.module';
import { InspeccionComponent } from './pages/inspeccion/inspeccion.component';
import { DashboardModule } from "../dashboard/dashboard.module";
import { InspeccionLayoutComponent } from './layout/inspeccion-layout/inspeccion-layout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        InspeccionComponent,
        InspeccionLayoutComponent
    ],
    imports: [
        CommonModule,
        InspeccionRoutingModule,
        DashboardModule,
        MaterialModule,
        FormsModule 
    ]
})
export class InspeccionModule { }
