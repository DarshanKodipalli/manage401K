import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { RestService } from '../services/rest.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];
@Component({
  selector: 'app-companies-new',
  templateUrl: './company-create.html',
  styleUrls: ['./company-create.scss']
})
export class CreateCompanyComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  private companyData :any = {};
  private address:String="";
  constructor( private http:RestService,  private rout: Router, private spinnerService:Ng4LoadingSpinnerService) {
      this.companyData.companyName = "Manifest";
      this.companyData.number = "(312)-901-1723";
      this.companyData.email = "mani.fest@gmail.com";
      this.companyData.cin = "12783HABS871";
      this.companyData.address = "1307, 2951 S King Drive";
      this.companyData.owner = "John Doe";
      this.companyData.industry = "Information Technology";
      this.companyData.zip = 60616;
   }

  ngOnInit() {
  }

  public handleAddressChange1(event) {
    console.log(event.formatted_address);
    this.address = event.formatted_address;
  }  
  addCompany(companyData){
    Swal({
      title: 'Create new Company: '+companyData.companyName+'?',
      text: 'This\'ll Create a New Company!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      companyData.address = this.address;
        this.http.addCompany(this.companyData).subscribe(
          (response)=>{
            console.log(response.json());
            Swal(
              'Company Created! Login with the Password: '+response.json().tempPasswordCreated+'',
              'Success'
            ).then((newResult)=>{
              this.rout.navigate(['/allCompanies']);
            })
          },(error)=>{
            console.log(error);
          })
      },(error)=>{
        console.log(error);
      })    
  }
}
