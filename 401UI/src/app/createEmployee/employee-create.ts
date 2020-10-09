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
  selector: 'app-employee-new',
  templateUrl: './employee-create.html',
  styleUrls: ['./employee-create.scss']
})
export class CreateEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  private employeeData :any = {};
  private address:String="";
  constructor( private http:RestService,  private rout: Router, private spinnerService:Ng4LoadingSpinnerService) {
      this.employeeData.name = "John Doe";
      this.employeeData.number = "(312)-901-1723";
      this.employeeData.email = "dkodipalli@hawk.iit.edu";
      this.employeeData.ssn = "817263187236";
      this.employeeData.address = "1307, 2951 S King Drive";
      this.employeeData.dept = "Finance";
      this.employeeData.salary = 85000;
   }

  ngOnInit() {
  }

  public handleAddressChange1(event) {
    console.log(event.formatted_address);
    this.address = event.formatted_address;
  }  
  addEmployee(employeeData){
    Swal({
      title: 'Create new Employee: '+employeeData.name+'?',
      text: 'This\'ll Create a New Employee!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      employeeData.address = this.address;
      this.employeeData.loginData = JSON.parse(localStorage.getItem("login"));
        this.http.addEmployee(this.employeeData).subscribe(
          (response)=>{
            console.log(response.json());
            Swal(
              'Employee Created! Password: '+response.json().tempPasswordCreated,
              'Success'
            ).then((newResult)=>{
               this.rout.navigate(['/allEmployees']);
            })
          },(error)=>{
            console.log(error);
          })
      },(error)=>{
        console.log(error);
      })    
  }
}
