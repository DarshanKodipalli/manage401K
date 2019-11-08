import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

export interface Companies {
  name: string;
  company: string;
  company_id: string;
  number: string;
  email: string;
  department: string;
  salary: string;
  contri401K: string;
}

const ELEMENT_DATA: Companies[] = [
];

@Component({
  selector: 'app-allEmployeesEmployee',
  templateUrl: './allEmployeesEmployee.component.html',
  styleUrls: ['./allEmployeesEmployee.component.scss']
})
export class AllEmployeesEmployeeComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'company','company_id', 'number', 'email', 'department', 'salary', 'contri401K'];
  dataSource:any = new MatTableDataSource<Companies>(ELEMENT_DATA);
  selection = new SelectionModel<Companies>(true, []);

  
  @Input() changing: Subject<boolean>;

  loadGridSpinner:boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: RestService, private route: Router) { }
  private fileUrl:string
  private forEmployee:boolean = true;
  private role:String;
  private createInvoice:any = {};
  private searchParams:any = {};
  private allList:boolean = false;
  private ename:String = "";
  private eaddress:String = "";
  private essn:String = "";
  private ecompany:String = "";
  private ecompanyid:String = "";
  private edepartment:String = "";
  private esalary = 0.0;
  private esalarymonthly = 0.0;
  private e401k = 0.0;
  private esalary401k = 0.0;
  private esalary401kmonthly = 0.0;
  private enumber:String = "";
  private eemail:String = "";  
  private empData = [];
  ngOnInit() {
    var data = [];
    this.http.getEmployeesForEmployee({emailID:JSON.parse(localStorage.getItem("login")).username}).subscribe(
      (response)=>{
        console.log(response.json());
        data = response.json().data;
        this.empData = data;
        data.map(function(dataItem){
          dataItem.e_contri401K = dataItem.e_salary - dataItem.e_salary*(1-(dataItem.e_401K_contribution/100));
        })
        console.log(data);
        this.dataSource = new MatTableDataSource<Companies>(data);      
      },(error)=>{
        console.log(error);
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log(numSelected + " " + numRows);
    this.allList = true;
    var forRecord = this.empData[numSelected-1];
    this.ename = forRecord.e_name;
    this.essn = forRecord.e_ssn;
    this.eaddress = forRecord.e_address;
    this.ecompany = forRecord.e_company_name;
    this.ecompanyid = forRecord.e_company_id;
    this.edepartment = forRecord.e_dept;
    this.esalary = forRecord.e_salary;
    this.esalarymonthly = forRecord.e_salary/12;
    this.esalarymonthly = Math.round(this.esalarymonthly * 100) / 100;
    this.e401k = forRecord.e_401K_contribution;
    this.esalary401k = forRecord.e_contri401K;
    this.esalary401kmonthly = this.esalary401k/12;
    this.esalary401kmonthly = Math.round(this.esalary401kmonthly * 100) / 100;
    this.enumber = forRecord.e_contact_number;
    this.eemail = forRecord.e_contact_email;
    return numSelected === numRows;
  } 
  updateRecord(){
    Swal({
      title: 'Update the Value to: '+this.e401k+' %?',
      text: 'This\'ll Update the Value!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      var updateObj:any = {};
      updateObj.e_email = this.eemail;
      updateObj.e_401K_contribution = this.e401k;
      updateObj.e_companyName = this.ecompany;
      console.log(updateObj);
      this.http.update401K(updateObj).subscribe(
        (response)=>{
          console.log(response.json());
          Swal(
            'Margin Updated!',
            'Success'
          ).then((newResult)=>{
            //  this.route.navigate(['/dashboard']);
          })   
        },(error)=>{
          console.log(error);
        }
      )
    })    
  } 
}