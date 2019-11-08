import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

export interface Companies {
  name: string;
  owner: string;
  number: string;
  email: string;
  industry: string;
  zip: string;
  cin: string;
}

const ELEMENT_DATA: Companies[] = [
];

@Component({
  selector: 'app-allCompanies',
  templateUrl: './allCompanies.component.html',
  styleUrls: ['./allCompanies.component.scss']
})
export class AllCompaniesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'owner', 'number', 'email', 'industry', 'zip', 'cin'];
  dataSource:any = new MatTableDataSource<Companies>(ELEMENT_DATA);
  selection = new SelectionModel<Companies>(true, []);

  
  @Input() changing: Subject<boolean>;

  loadGridSpinner:boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: RestService, private route: Router) { }
  private fileUrl:string
  private role:String;
  private createInvoice:any = {};
  private searchParams:any = {};
  ngOnInit() {
    var data = [];
    this.http.getCompanies().subscribe(
      (response)=>{
        console.log(response.json());
        data = response.json().data;
        console.log(data);
        this.dataSource = new MatTableDataSource<Companies>(data);      
      },(error)=>{
        console.log(error);
      });
  }

}
