import { Injectable } from '@angular/core';
import { Http,ResponseContentType } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private loginData:any = {};  
  constructor(private http: Http) {
      this.loginData = localStorage.getItem("login")  
  }

  SignUp(signUpData){
    return this.http.post("http://192.168.0.21:3000/signup",signUpData,{withCredentials: true});
  }  
  signIn(signInData){
    return this.http.post("http://localhost:3000/login", signInData,{withCredentials: true});
  }
  companySignIn(signInCompanyData){
    return this.http.post("http://localhost:3000/company/companyLogin", signInCompanyData,{withCredentials: true});    
  }
  employeeSignIn(employeeSignInData){
    return this.http.post("http://localhost:3000/employee/employeeLogin", employeeSignInData,{withCredentials: true});    
  }
  checkOTPCompany(otp){
    console.log(otp);
    return this.http.post("http://localhost:3000/company/checkOTP", otp,{withCredentials: true});    
  }
  signOut(logoutData){
    return this.http.post("http://localhost:3000/logout", logoutData,{withCredentials: true});
  }
  addCompany(companyData){
    console.log(companyData);
    return this.http.post("http://localhost:3000/addCompany", companyData,{withCredentials: true});
  }
  addEmployee(employeeData){
    console.log(employeeData);
    return this.http.post("http://localhost:3000/company/addEmployee", employeeData,{withCredentials: true});
  }
  getEmployees(companyObj){
    return this.http.post("http://localhost:3000/company/getEmployees",companyObj,{withCredentials: true});
  }
  getEmployeesForEmployee(companyObj){
    return this.http.post("http://localhost:3000/employee/getEmployees",companyObj,{withCredentials: true});
  }
  getPayments(paymentObj){
    return this.http.post("http://localhost:3000/company/getAllPayments",paymentObj,{withCredentials: true});
  }  
  getPaymentsEmployee(paymentEmployeeObj){
    console.log(paymentEmployeeObj);
    return this.http.post("http://localhost:3000/employee/getAllEmployeePayments",paymentEmployeeObj,{withCredentials: true});
  }
  getCompanies(){
    return this.http.get("http://localhost:3000/getCompanies",{withCredentials: true});
  }
  recordPayment(paymentData){
    return this.http.post("http://localhost:3000/company/makePayment",paymentData,{withCredentials: true});
  }
  update401K(updateData){
    return this.http.post("http://localhost:3000/employee/updateRecord",updateData,{withCredentials: true});
  }
  getDashboardPaymentData(companyInfo){
    return this.http.post("http://localhost:3000/company/usersContri",companyInfo,{withCredentials: true});    
  }
  getDeptEmployeeLists(companyInfo){
    return this.http.post("http://localhost:3000/company/getDeptEmployeeLists",companyInfo,{withCredentials: true});    
  }
}

/*curl -X POST -d "{"username":"maneeshd","password":"qwerty","usertype":"customer"}" http://104.194.106.22:80/rideshare/Login*/
