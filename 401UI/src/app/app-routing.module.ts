import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AllCompaniesComponent } from './all-companies/allCompanies.component';
import { BookRideComponent } from './book-ride/bookRide.component';
import { CreateCompanyComponent } from './createCompany/company-create';
import { CreateEmployeeComponent } from './createEmployee/employee-create';
import { AllEmployeesComponent } from './all-employees/allEmployees.component';
import { AllEmployeesEmployeeComponent } from './all-employeesEmployee/allEmployeesEmployee.component';
import { RecordPaymentComponent } from './record-payment/recordPayment.component';
import { AllPaymentsComponent } from './all-payments/allPayments.component';
import { AllPaymentsEmployeeComponent } from './all-employeepayments/allPaymentsEmployee.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'allCompanies', component: AllCompaniesComponent},
  { path: 'bookRide', component: BookRideComponent},
  { path: 'addCompanies', component:CreateCompanyComponent},
  { path: 'addEmployee', component:CreateEmployeeComponent},
  { path: 'allEmployees', component:AllEmployeesComponent},
  { path: 'allEmployeesEmployee', component:AllEmployeesEmployeeComponent},
  { path: 'recordPayment', component:RecordPaymentComponent},
  { path: 'allPayments', component:AllPaymentsComponent},
  { path: 'allEmployeePayments', component:AllPaymentsEmployeeComponent},
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
