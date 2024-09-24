import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardBodyComponent } from './layouts/dashboard-body/dashboard-body.component';
import { SettingsComponent } from '../settings/pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path:'',component: DashboardBodyComponent },
      { path: 'settings', component: SettingsComponent },
      { path:'**',redirectTo: 'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
