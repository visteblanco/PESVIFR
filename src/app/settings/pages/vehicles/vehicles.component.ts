import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { User } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { VehicleService } from '../../services/vehicle.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit{
  public user? : User | undefined;
  userRoles: string[] | undefined;
  idCompany: string | undefined;
  idUser: string | undefined;
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['plate', 'brand', 'vehicleModel', 'year', 'color', 'actions'];
  vehicleForm: FormGroup;
  showForm = false;
  showTable = true;
  editingVehicle: Vehicle | null = null;

  constructor(private fb: FormBuilder,private alertService:AlertService,private authService: AuthService,private vehicleService :VehicleService) {
    const user = this.authService.currentUser();
    this.userRoles = user?.roles;
    this.idCompany = user?.company;
    this.idUser = user?._id;
    this.vehicleForm = this.fb.group({
      plate: ['', Validators.required],
      brand: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      color: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getVehiclesByIdComapny();
  }

  getVehiclesByIdComapny():void{
    if(this.idCompany){
      this.vehicleService.getVehiclesByIdComapny(this.idCompany).subscribe(
        (vehicles:Vehicle[])=>{
          this.vehicles = vehicles;
        },error=>{
          console.log(error)
        }
      )
    }
  }

  addVehicle(): void {
    this.showForm = true;
    this.showTable = false;
    this.vehicleForm.reset();
    this.editingVehicle = null;
  }

  editVehicle(vehicle: Vehicle): void {
    this.showForm = true;
    this.showTable = false;
    this.editingVehicle = vehicle;
    this.vehicleForm.patchValue(vehicle);
  }

  deleteVehicle(id: string): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(id).subscribe(
        response=>{
          this.alertService.success('Delete: '+response.message,'Success!');          
          this.vehicles = this.vehicles.filter(vehicle => vehicle._id !== id);
        },
        error=>{
          this.alertService.error('Error deleting '+error,'Error!');
        }
      )
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      if (this.editingVehicle) {
        this.updateVehicles(this.editingVehicle);
      } else {
        this.createVehicle();
      }
      this.cancel();
    }
  }

  createVehicle():void{
    const newVehicle: Vehicle = {
      idCompany : this.idCompany,
      ...this.vehicleForm.value
    }
    this.vehicleService.registerVehicle(newVehicle).subscribe(
      (vehicle:Vehicle)=>{
        this.alertService.success('Create vehicle: '+vehicle.plate,'Success!');
        this.vehicles = [...this.vehicles, vehicle];
      },
      error => {
        this.alertService.error('Error Create vehicle: ','Error!');
      }
    )
  }
  
  updateVehicles(editingVehicle: Vehicle): void {
    if (!editingVehicle || !editingVehicle._id) {
      this.alertService.error('Invalid vehicle data', 'Error!');
      return;
    }
  
    const updatedVehicle = { ...editingVehicle, ...this.vehicleForm.value };
  
    // Excluir `_id` antes de enviarlo
    const { _id, __v, ...vehicleData } = updatedVehicle;
  
    console.log('Datos enviados al backend:', vehicleData);
  
    this.vehicleService.updateVehiclesById(_id, vehicleData).subscribe(
      (vehicle: Vehicle) => {
        this.vehicles = this.vehicles.map(v =>
          v._id === vehicle._id ? { ...v, ...vehicleData } : v
        );
        this.alertService.success('Update vehicle: ' + vehicle.plate, 'Success!');
      },
      error => {
        console.error('Error en la petición:', error);
        this.alertService.error('Error Update vehicle: ', 'Error!');
      }
    );
  }
  
  cancel(): void {
    this.showForm = false;
    this.showTable = true;
    this.editingVehicle = null;
  }
}
