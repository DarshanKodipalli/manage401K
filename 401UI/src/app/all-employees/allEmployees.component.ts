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
  selector: 'app-allEmployees',
  templateUrl: './allEmployees.component.html',
  styleUrls: ['./allEmployees.component.scss']
})
export class AllEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'ssn', 'number', 'email', 'department', 'address', 'salary', 'contri401K'];
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

  }
}