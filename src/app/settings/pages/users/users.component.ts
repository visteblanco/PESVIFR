import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROLES } from 'src/app/shared/roles';
import { User } from 'src/app/settings/interfaces/user.interface';
import { UserService } from '../../services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../interfaces/company.interface';
// Asegúrate de importar el modelo de usuario adecuadamente


// Asegúrate de importar el modelo de usuario adecuadamente


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public user? : User | undefined;
  ROLES = ROLES;
  roleKeys: (keyof typeof ROLES)[] = Object.keys(ROLES) as (keyof typeof ROLES)[];
  showForm: boolean = false;
  showTable: boolean = true;
  userRoles?: string[] = [];
  idCompani :string |undefined;
  companyName: string = '';
  idUser :string |undefined;
  public userForm: FormGroup;
  public users: User[] = [];
  public displayedColumns: string[] = ['email', 'name', 'isActive', 'roles', 'actions'];

  constructor(private fb: FormBuilder,private userService: UserService,private authService: AuthService,private companyService: CompanyService) {
    const user = this.authService.currentUser();
    this.userRoles = user?.roles;
    this.idCompani = user?.company;
    this.idUser = user?._id;
    this.userForm = this.fb.group({
      id: [null],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: [''],
      isActive: [true],
      roles: ['', Validators.required],
      company: [''],
      vehicles: [[]]
    });
  }

  ngOnInit(): void {
    this.getUsersByCompany();    
    this.getCompanyByIdcompany();
  }

  getUsersByCompany(): void {
    if (this.idCompani) {
      this.userService.getUsersByIdComapny(this.idCompani).subscribe(
        (users: any[]) => {  // Cambié el tipo a 'any[]' para que puedas manipular los datos
          // Mapea los usuarios para usar 'id' en lugar de '_id'
          this.users = users.map(user => ({
            ...user,
            id: user._id
          }));
          console.log('Users:', this.users); // Verifica en la consola si ahora aparece el ID
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
    }
  }
  
  
  getCompanyByIdcompany(): void {
    if (this.idCompani) {
      this.companyService.getCompanyById(this.idCompani).subscribe({
        next: (response: Company) => {
          this.companyName = response.name;
        },
        error: (error) => {
          console.error('Error al obtener el nombre de la compañía:', error);
        }
      });
    }
  }
  
  registerUser(userData: User): void {
    const idUser = this.idUser;
    if(idUser){
      this.userService.registerUser(userData,idUser).subscribe(
        (createUser: User) => {
          console.log('Company updated successfully');
          this.user = createUser;
          this.userForm = this.fb.group({
            name: [{ value: this.user?.name || '', disabled: !!this.user }, Validators.required],
            email: [this.user?.email || '', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            roles: [this.user?.roles || '', Validators.required],
            status: [this.user?.isActive ?? false], 
            company: [this.user?.company || '']
          });
        },
        error => {
          console.error('Error Create User:', error);
          // Manejo de errores
        }
      );
    }
  }

  editUser(user: User): void {
    this.showForm = true;
    this.showTable = false;
    this.userForm.patchValue({
      id: user.id,  // Asegúrate de asignar el ID aquí
      email: user.email,
      name: user.name,
      password: '',  // Deja el campo de contraseña vacío
      isActive: user.isActive,
      roles: user.roles,
      company: user.company,
      vehicles: user.vehicles
    });
  }
  

  cancel(): void {
    this.userForm.reset(); // Limpia el formulario
    this.showForm = false; 
    this.showTable = true; 
  }
  
  
  
  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        (response) => {
          console.log(response.message);
          this.users = this.users.filter(user => user.id !== id);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = {
        ...this.userForm.value,
        roles: this.userForm.value.roles 
          ? (Array.isArray(this.userForm.value.roles) ? this.userForm.value.roles : [this.userForm.value.roles])
          : []
      };      
  
      if (formValue.id) {
        this.userService.updateUser(formValue).subscribe(
          (updatedUser: User) => {
            const index = this.users.findIndex(user => user.id === formValue.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
            this.userForm.reset();
            this.showForm = false;
            this.showTable = true;
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      } else {
        this.registerUser(formValue);
      }
    }
  }  
  
  isDriverSelected(): boolean {
    return this.userForm.get('roles')?.value?.includes('driver');
  }
  
}
