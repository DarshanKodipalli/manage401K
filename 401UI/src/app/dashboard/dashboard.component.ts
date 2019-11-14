import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Chart } from 'chart.js';
import { AppComponent } from '../app.component';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart = [];
  show:boolean = true;

  public labelsList:any = [];
  public valuesList:any = [];
  public deptLable:any = [];
  public deptEmpCount:any = [];
  public companyNameLabels:any = [];
  public exployeeCount:any = [];
  public dateLables:any = [];
  public paymenntsMade:any = [];
  public employeeCompanyNameLables:any = [];
  public employeeCompanyContibutionsList:any = [];
  public employee:boolean = true;
  public heading:String = "Employeewise Contribution";
  constructor(private _service: WeatherService, private app: AppComponent,private http: RestService) { 
    this.http.getDashboardPaymentData({companyName:JSON.parse(localStorage.getItem("login")).companyName}).subscribe(
      (response)=>{
        var dataList = response.json().data;
        var keyArray= [];
        var valueArray = [];
        dataList.map(function(dataSet){
          keyArray.push(dataSet.e_name);
          valueArray.push(dataSet.contri);
        })
        this.labelsList = keyArray;
        this.valuesList = valueArray;
        this.http.getDeptEmployeeLists({companyName:JSON.parse(localStorage.getItem("login")).companyName}).subscribe(
          (response)=>{
            var dataList1 = response.json().data;
            var keyArray= [];
            var valueArray = [];
            dataList1.map(function(dataSet){
              keyArray.push(dataSet.e_dept);
              valueArray.push(dataSet.count);
            })
            this.deptLable = keyArray;
            this.deptEmpCount = valueArray;
            this.http.getEmployeeCompanyList().subscribe(
              (response)=>{
                console.log(response.json());
                var dataList2 = response.json().data;
                var keyArray= [];
                var valueArray = [];
                dataList2.map(function(dataSet){
                  keyArray.push(dataSet.e_company_name);
                  valueArray.push(dataSet.empCount);
                })
                this.companyNameLabels = keyArray;
                this.exployeeCount = valueArray;
                console.log(this.exployeeCount);
                this.http.getMonthWisePayment({companyName:JSON.parse(localStorage.getItem("login")).companyName}).subscribe(
                  (response)=>{
                    console.log(response.json());
                    var dataList3 = response.json().data;
                    var keyArray= [];
                    var valueArray = [];
                    dataList3.map(function(dataSet){
                      keyArray.push(dataSet.date);
                      valueArray.push(dataSet.count);
                    })
                    this.dateLables = keyArray;
                    this.paymenntsMade = valueArray;
                    if(JSON.parse(localStorage.getItem("login")).username){
                      this.employee = false;
                      this.heading = "Companywise Contributions"
                      console.log(JSON.parse(localStorage.getItem("login")).username);
                      this.http.getEmployeeCompany401KContriList({companyName:JSON.parse(localStorage.getItem("login")).username}).subscribe(
                        (response)=>{
                          console.log(response.json());
                          var dataList3 = response.json().data;
                          var keyArray= [];
                          var valueArray = [];
                          dataList3.map(function(dataSet){
                            keyArray.push(dataSet.m_company_name);
                            valueArray.push(dataSet.contri);
                          })
                          this.employeeCompanyNameLables = keyArray;
                          this.employeeCompanyContibutionsList = valueArray;    
                        }                      
                      )  
                    }
                    console.log(this.exployeeCount);
                  }
                )
              }
            )
          },(error)=>{
            console.log(error);
          }
        )              
      },(error)=>{
        console.log(error);
      }
    )          
  }
  
  ngAfterViewInit(){
    
  }

  ngOnInit() {

    setTimeout(() => {
      this.app.setLoggedIn();
      this.app.show();
    } , 0);
    this.show = true;
    this._service.dailyForecast()
      .subscribe(res => {
        
        //console.log(res);
        /*
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt)
        */
        let temp_max = ['10','20','30','40','50','60','70','80'];
        let temp_min = ['0','1','2','3','4','5','6','7'];
        //let alldates = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let alldates = [];
        let weatherDates = []
        alldates.forEach((res) => {
            var jsdate = new Date();
            weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        });
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
              labels: this.dateLables,
              datasets: [{
                  label: '# of Payments Made',
                  data: this.paymenntsMade,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }        });
        this.chart = new Chart('canvas1', {
          type: 'bar',
          data: {
            labels: ["Jan","Jun","Dec"],
            datasets: [{
              label: "Employee Added",
              data: [28, 64, 56],
              backgroundColor: ['#F79F79','#F7D08A']
          }]
          }
        });
        this.chart = new Chart('canvas2', {
          type: 'pie',
          data: {
            datasets: [{
                data: this.exployeeCount,
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
            labels: this.companyNameLabels
        },
          options: {
          }
        });
        this.chart = new Chart('canvas3', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.deptEmpCount,
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.deptLable
        },
          options: {
          }
        });
        console.log(JSON.parse(localStorage.getItem("login")));
        if(JSON.parse(localStorage.getItem("login")).companyName){
          this.heading = "Employeewise Contribution";;
          console.log("This is Company");
          this.chart = new Chart('canvas4', {
            type: 'polarArea',
            data: {
              datasets: [{
                  data: this.valuesList,                  
                  backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
              }],
          
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: this.labelsList
          },
            options: {
            }
          });  
        }else{
          this.heading = "Companywise Distribution";
          console.log("This is User/Employee");
          this.chart = new Chart('canvas4', {
            type: 'polarArea',
            data: {
              datasets: [{
                  data: this.employeeCompanyContibutionsList,
                  backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
              }],
              labels: this.employeeCompanyNameLables
          },
            options: {
            }
          });          
        }
        this.chart = new Chart('canvas5', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
        this.show = false;
      },(error)=>{
        console.log(error);
      });
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.app.hide();
    } , 0);
  }

}
