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
//shttp://ec2-18-224-96-94.us-east-2.compute.amazonaws.coms:3001/
  SignUp(signUpData){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/signup",signUpData);
  }  
  signIn(signInData){
    console.log("Loggoing in");
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/login", signInData);
  }
  companySignIn(signInCompanyData){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/companyLogin", signInCompanyData);    
  }
  employeeSignIn(employeeSignInData){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/employee/employeeLogin", employeeSignInData);    
  }
  checkOTPCompany(otp){
    console.log(otp);
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/checkOTP", otp);    
  }
  signOut(logoutData){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/logout", logoutData);
  }
  addCompany(companyData){
    console.log(companyData);
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/addCompany", companyData);
  }
  addEmployee(employeeData){
    console.log(employeeData);
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/addEmployee", employeeData);
  }
  getEmployees(companyObj){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/getEmployees",companyObj);
  }
  getEmployeesForEmployee(companyObj){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/employee/getEmployees",companyObj);
  }
  getPayments(paymentObj){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/getAllPayments",paymentObj);
  }  
  getPaymentsEmployee(paymentEmployeeObj){
    console.log(paymentEmployeeObj);
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/employee/getAllEmployeePayments",paymentEmployeeObj);
  }
  getCompanies(){
    return this.http.get("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/getCompanies");
  }
  recordPayment(paymentData){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/makePayment",paymentData);
  }
  update401K(updateData){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/employee/updateRecord",updateData);
  }
  getDashboardPaymentData(companyInfo){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/usersContri",companyInfo);    
  }
  getDeptEmployeeLists(companyInfo){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/getDeptEmployeeLists",companyInfo);    
  }
  getEmployeeCompanyList(){
    return this.http.get("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/getEmployeeCompanyList");
  }
  getMonthWisePayment(companyInfo){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/getMonthWisePayment",companyInfo);    
  }
  getEmployeeCompany401KContriList(employeeInfo){
    return this.http.post("http://ec2-18-224-96-94.us-east-2.compute.amazonaws.com:3001/company/getEmployeeCompany401KContriList",employeeInfo);    
  }
}

/*curl -X POST -d "{"username":"maneeshd","password":"qwerty","usertype":"customer"}" http://104.194.106.22:80/rideshare/Login*/
