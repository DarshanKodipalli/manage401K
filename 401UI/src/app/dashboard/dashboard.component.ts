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
  public deptEmpCount:any = []
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
        let temp_max = ['100','200','300','400','500','600','700','800'];
        let temp_min = ['10','20','30','40','50','60','70','80'];
        //let alldates = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let alldates = [];
        let weatherDates = []
        alldates.forEach((res) => {
            var jsdate = new Date();
            weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        });
        this.chart = new Chart('canvas', {
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
        this.chart = new Chart('canvas1', {
          type: 'bar',
          data: {
            labels: ["Jan","Jun","Dec"],
            datasets: [{
              label: "Payments",
              data: [28, 64, 56],
              backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
          }]
          }
        });
        this.chart = new Chart('canvas2', {
          type: 'pie',
          data: {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                '2 Stars',
                '3 Stars',
                '4 Stars'
            ]
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
        this.chart = new Chart('canvas4', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.valuesList,
                backgroundColor: ['#F79F79','#F7D08A','#E3F09B','#87B6A7', '#5B5941']
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.labelsList;
        },
          options: {
          }
        });
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
