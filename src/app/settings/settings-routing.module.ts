import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsLayoutComponent } from './layout/settings-layout/settings-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { CompanyComponent } from './pages/company/company.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [
      { path:'',component: SettingsComponent },
      { path:'users',component: UsersComponent },
      { path:'company',component: CompanyComponent },
      { path:'vehicles',component: VehiclesComponent },
      { path:'**',redirectTo: 'settings' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
