import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../interfaces/company.interface';

@Pipe({
  name: 'companyLogo'
})
export class CompanyLogoPipe implements PipeTransform {
  transform(company:Company): string {
    if(company.alt_img){
      return company.alt_img;
    }
    if(!company.alt_img || company.alt_img == '')
      return 'assets/images/no-image.png'
    return company.alt_img
  }

}
