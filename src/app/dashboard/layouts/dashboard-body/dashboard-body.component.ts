import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ROLES } from 'src/app/shared/roles';



@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent {
  ROLES = ROLES;
  userRoles?: string[] = [];
  idCompani :string |undefined;
  isModalVisible: boolean = false;


  constructor(private authService: AuthService, private router: Router,private modalService: ModalService, ) {
    const user = this.authService.currentUser();
    this.userRoles = user?.roles;
    this.idCompani = user?.company;
    if (!this.idCompani) {
      this.openModal();
    }
  }
  openModal(): void {
    this.modalService.showMessage('Debe registrar la compañia para poder ver las aplicaciones o contacte al administrador');
  }
  realizarAccion(accion: string) {
    if (accion === 'inspeccion') {
      this.router.navigateByUrl('/inspeccion');
    } else {
    }
  }
}
