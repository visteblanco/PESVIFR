import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../interfaces/company.interface';
import { CompanyService } from '../../services/company.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  public company? : Company | undefined;
  showEditButton: boolean = false;
  companyForm: FormGroup;
  profileImageUrl: string = '';
  userRoles?: string[] = [];
  idCompani :string |undefined;
  idUser :string |undefined;
  ImageUrl: any;
  file:any;
  companyData: any;
  logoImageUrl: string | undefined;

  constructor(private fb: FormBuilder, private companyService: CompanyService,private authService: AuthService) {
    const user = this.authService.currentUser();
    this.userRoles = user?.roles;
    this.idCompani = user?.company;
    this.idUser = user?._id;
    this.companyForm = this.fb.group({
      name: [{ value: this.company?.name || '', disabled: !!this.company }, Validators.required],
      address: [''],
      phone: [''],
      logo: ['']
    });
    this.company = this.companyForm.value;
    if (this.idCompani) {
      this.companyForm.controls['name'].disable();
    } else {
      this.companyForm.controls['name'].enable();
    }
  }

  async ngOnInit(): Promise<void>  {
    try {
      if (this.idCompani || this.idCompani !== undefined ){this.getCompany(this.idCompani);}
    } catch (error) {
      console.error('Error al obtener la imagen del logo:', error);
    }
  }

  openFileExplorer(): void {
    this.fileInput?.nativeElement.click();
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
        if(this.company){
          this.company.alt_img = this.profileImageUrl;
        }
      };
      reader.readAsDataURL(file);
      this.file = file;
    }
  }
  private getCompany(idcom:string):void {
    this.companyService.getCompanyById(idcom).subscribe({
      next: response => {
        const gComany = response;
        this.company = gComany;
      },
      error: error => {
        console.error('Error al obtener la compañía:', error);
      }
    });
    this.companyService.getLogoById(idcom).subscribe({
      next: response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.ImageUrl = reader.result;
          this.profileImageUrl = this.ImageUrl;
        };
        reader.readAsDataURL(response);
      },
      error: error => {
        console.error('Error al obtener la compañía:', error);
      }
    });
  }
  onSubmit(): void {
    if (this.companyForm.valid) {
      const formData = this.companyForm.value;
      const companyData: Company = {
        _id: this.idCompani,
        name: (formData.name ?? '').trim(),
        address: (formData.address ?? '').trim() ,
        phone: (formData.phone ?? '').trim(),
        alt_img: formData.logo,
      };

      if (this.company && this.idCompani) {
        this.updateCompany(companyData);
      } else {
        this.registerCompany(companyData);
      }

      this.companyForm.reset();
    }
  }
  registerCompany(companyData: Company): void {
    const idUser = this.idUser;
    if(idUser){
      this.companyService.registerCompany(companyData, this.file, idUser).subscribe(
        (createCompany: Company) => {
          console.log('Company updated successfully');
          this.company = createCompany;
          this.companyForm = this.fb.group({
            name: [{ value: this.company?.name || '', disabled: !!this.company }, Validators.required],
            address: [this.company?.address],
            phone: [this.company?.phone]
          });
        },
        error => {
          console.error('Error updating company:', error);
          // Manejo de errores
        }
      );
    }
  }
  updateCompany(companyData: Company): void {
    this.companyService.updateCompany(companyData, this.file).subscribe(
      (updatedCompany: Company) => {
        console.log('Company updated successfully');
        this.company = updatedCompany;
        this.companyForm = this.fb.group({
          name: [{ value: this.company?.name || '', disabled: !!this.company }, Validators.required],
          address: [this.company?.address],
          phone: [this.company?.phone]
        });
      },
      error => {
        console.error('Error updating company:', error);
        // Manejo de errores
      }
    );
  }
}
