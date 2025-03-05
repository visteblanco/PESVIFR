import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardModule } from "../dashboard/dashboard.module";
import { SettingsLayoutComponent } from './layout/settings-layout/settings-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyComponent } from './pages/company/company.component';
import { CompanyLogoPipe } from './pipes/company-logo.pipe';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';


@NgModule({
    declarations: [
        SettingsComponent,
        SettingsLayoutComponent,
        UsersComponent,
        CompanyComponent,
        CompanyLogoPipe,
        VehiclesComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        DashboardModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class SettingsModule { }
