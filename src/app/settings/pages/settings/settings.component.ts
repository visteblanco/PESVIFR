import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})


export class SettingsComponent {

  menuItems = [
    // { name: 'General', icon: 'settings', route: './users' },
    { name: 'Compañia', icon: 'local_shipping', route: './company' },
    { name: 'Usuarios', icon: 'account_circle', route: './users' },
    { name: 'Notificaciones', icon: 'notifications', route: '/configuracion/notificaciones' },
    { name: 'Seguridad', icon: 'security', route: '/configuracion/seguridad' }
  ];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
