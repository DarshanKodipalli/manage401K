import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

export interface Companies {
  name: string;
  ssn: string;
  number: string;
  email: string;
  department: string;
  address: string;
  salary: string;
  contri401K: string;
}

const ELEMENT_DATA: Companies[] = [
];

@Component({
  selector: 'app-recordPayment',
  templateUrl: './recordPayment.html',
  styleUrls: ['./recordPayment.component.scss']
})
export class RecordPaymentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'ssn', 'number', 'email', 'department', 'address', 'salary', 'contri401K','actionRe'];
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

  ngOnInit() {
    var data = [];
      this.http.getEmployees({companyName:JSON.parse(localStorage.getItem("login")).companyName}).subscribe(
        (response)=>{
          console.log(response.json());
          data = response.json().data;
          data.map(function(dataItem){
            dataItem.e_contri401K = dataItem.e_salary - dataItem.e_salary*(1-(dataItem.e_401K_contribution/100));
          })
          console.log(data);
          this.dataSource = new MatTableDataSource<Companies>(data);      
        },(error)=>{
          console.log(error);
        });
  }
  makePayment(forRecord){
    console.log(forRecord);
    this.allList = true;
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
  }
  recordPayment(){
    Swal({
      title: 'Record the payment for: '+this.ename+'?',
      text: 'This\'ll Record a Payment!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Record',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      var paymentObj:any = {};
      paymentObj.m_company_name = this.ecompany;
      paymentObj.m_company_id = this.ecompanyid;
      paymentObj.m_employee_ssn = this.essn;
      paymentObj.m_salary = this.esalary;
      paymentObj.e_email = this.eemail;
      paymentObj.e_name = this.ename;
      paymentObj.m_salary_monthly = this.esalarymonthly;
      paymentObj.m_contribution_to_401k = this.esalary401kmonthly;
      paymentObj.e401k = this.e401k;
      console.log(paymentObj);
      this.http.recordPayment(paymentObj).subscribe(
        (response)=>{
          console.log(response.json());
          Swal(
            'Payment Recorded, TransactionId: ',
            response.json().transactionId
          ).then((newResult)=>{
             this.route.navigate(['/allPayments']);
          })   
        },(error)=>{
          console.log(error);
        }
      )
    })
  }
}