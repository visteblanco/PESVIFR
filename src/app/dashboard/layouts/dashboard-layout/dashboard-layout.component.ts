import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ROLES} from 'src/app/shared/roles'

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  public sidebarItems = [
    {label: 'Home', icon: 'label', url: './home', roles: [ROLES.ADMIN, ROLES.DRIVER,ROLES.OWNER]},
    {label: 'Ajustes', icon: 'settings', url: '/settings', roles: [ROLES.ADMIN,ROLES.OWNER]}
  ];

  public user: any;
  public userRoles: string[] = [];
  public isOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser();
    this.userRoles = this.user ? this.user.roles : [];
  }

  public filteredSidebarItems() {
    return this.sidebarItems.filter(item => this.hasRole(item.roles));
  }

  public hasRole(allowedRoles: string[]): boolean {
    return allowedRoles.some(role => this.userRoles.includes(role));
  }

  realizarAccion(accion: string) {
    switch (accion) {
      case 'inspeccion':
        this.router.navigateByUrl('/inspeccion');
        break;
      case 'Configuracion':
        this.router.navigateByUrl('/settings');
        break;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
