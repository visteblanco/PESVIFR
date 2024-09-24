import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspeccionLayoutComponent } from './layout/inspeccion-layout/inspeccion-layout.component';
import { InspeccionComponent } from './pages/inspeccion/inspeccion.component';

const routes: Routes = [
  // {
  //   path: 'inspeccion',
  //   canActivate: [ isAuthenticatedGuard ],
  //   loadChildren: () => import('./inspeccion.module').then( m => m.InspeccionModule ),
  // },

  {
    path: '',
    component: InspeccionLayoutComponent,
    children: [
      { path:'',component: InspeccionComponent },
      { path:'**',redirectTo: 'inspeccion' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionRoutingModule { }
