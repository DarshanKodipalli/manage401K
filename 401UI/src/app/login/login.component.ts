import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:string="";
  private loginData:any = {};
  private signUpData:any = {};
  private otpBoolean:boolean = true;
  private productList:any = []; 
  constructor(private app: AppComponent,
            private http: RestService,
            private router: Router ) {
            }

  ngOnInit() {
    this.loginData.username = "darshan.kodipalli@gmail.com";
    this.loginData.password = "mn78ma";
    this.loginData.usertype = "application_admin";    
  }

  login(loginData){
    loginData.city = "Chicago";
    loginData.state = "Illinois";
    console.log(loginData);
    if(loginData.role === "admin"){
      loginData.role = "Application Admin";
      this.http.signIn(loginData).subscribe(
        (response)=>{
          console.log(response.json());
          loginData.role = response.json().role;
          console.log(loginData);
          localStorage.setItem("login",JSON.stringify(loginData));
          this.router.navigate(['/dashboard']);
        },(error)=>{
          console.log(error);
        })
    }else if(loginData.role === "company"){
      this.loginData.role = "Company Representative";
      console.log("Company Login");
      this.http.companySignIn(this.loginData).subscribe(
        (response)=>{
          console.log(response.json());
          loginData.role = response.json().role;
          console.log(this.loginData);
          this.loginData.companyName = response.json().companyName;
          this.otpBoolean = false;
/*          localStorage.setItem("login",JSON.stringify(loginData));
          this.router.navigate(['/dashboard']);*/
        },(error)=>{
          console.log(error);
        })
    }else{
      loginData.role = "Employee";
      console.log("Employee")
      this.http.employeeSignIn(this.loginData).subscribe(
        (response)=>{
          console.log(response.json());
          loginData.role = response.json().role;
          console.log(this.loginData);
          this.otpBoolean = false;
        },(error)=>{
          console.log(error);
        })
    }
  }

submitOTP(){
  if(this.loginData.otp){
    this.http.checkOTPCompany(this.loginData).subscribe(
      (response)=>{
        console.log(response.json());
        localStorage.setItem("login",JSON.stringify(this.loginData));
        this.router.navigate(['/dashboard']);
      },(error)=>{
        console.log(error);
      }
    )
  }
}
}