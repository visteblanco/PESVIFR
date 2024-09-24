import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROLES } from 'src/app/shared/roles';

// Asegúrate de importar el modelo de usuario adecuadamente
export interface User {
  id?: string;
  email: string;
  name: string;
  password?: string;
  isActive: boolean;
  roles: string[];
  company: string; // Assuming this will be a string ID
  vehicles: Vehicle[];
  activeDevice: string;
}

// Asegúrate de importar el modelo de usuario adecuadamente
export interface Vehicle {
  id: string;
  name: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ROLES = ROLES;
  roleKeys: (keyof typeof ROLES)[] = Object.keys(ROLES) as (keyof typeof ROLES)[];
  showForm: boolean = false;
  showTable: boolean = true;
  public userForm: FormGroup;
  public users: User[] = [];
  public displayedColumns: string[] = ['email', 'name', 'isActive', 'roles', 'actions'];

  constructor(private fb: FormBuilder, ) {
    this.userForm = this.fb.group({
      id: [null],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: [''],
      isActive: [true],
      roles: ['', Validators.required],
      company: [''],
      vehicles: [[]],
      activeDevice: ['']
    });
  }

  ngOnInit(): void {
    // Simular carga inicial de datos desde una API o servicio
    this.users = [
      {
        id: '1',
        email: 'user1@example.com',
        name: 'User 1',
        password: 'password1',
        isActive: true,
        roles: ['admin'],
        company: 'ObjectId1', // Aquí debería ser un ID válido de la compañía según tu modelo
        vehicles: [{ id: 'ObjectId1', name: 'Vehicle 1' }], // Debes inicializar correctamente con objetos de vehículos según tu modelo
        activeDevice: 'Device 1'
      },
      {
        id: '2',
        email: 'user2@example.com',
        name: 'User 2',
        password: 'password2',
        isActive: false,
        roles: ['user'],
        company: 'ObjectId2', // Aquí debería ser un ID válido de la compañía según tu modelo
        vehicles: [{ id: 'ObjectId2', name: 'Vehicle 2' }], // Debes inicializar correctamente con objetos de vehículos según tu modelo
        activeDevice: 'Device 2'
      }
    ];
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      if (formValue.id) {
        // Actualizar usuario existente
        const index = this.users.findIndex(user => user.id === formValue.id);
        if (index !== -1) {
          this.users[index] = formValue;
        }
      } else {
        // Añadir nuevo usuario
        formValue.id = (this.users.length + 1).toString(); // Convertir a string si es necesario
        this.users.push(formValue);
      }
      this.userForm.reset();
    }
    // Después de guardar, puedes reiniciar el formulario o cerrar el formulario, según tu diseño
    this.showForm = false;
    this.showTable = true;
  }

  editUser(user: User): void {
    this.userForm.patchValue(user);
  }

  deleteUser(id: string): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
