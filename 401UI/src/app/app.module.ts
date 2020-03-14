import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ParticlesModule } from 'angular-particle';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule,
  MatNativeDateModule
} from '@angular/material';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AllCompaniesComponent } from './all-companies/allCompanies.component';
import { WeatherService } from './services/weather.service';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { RestService } from './services/rest.service';
import { BookRideComponent } from './book-ride/bookRide.component';
import { CreateCompanyComponent } from './createCompany/company-create';
import { CreateEmployeeComponent } from './createEmployee/employee-create';
import { AllEmployeesComponent } from './all-employees/allEmployees.component';
import { AllEmployeesEmployeeComponent } from './all-employeesEmployee/allEmployeesEmployee.component';
import { RecordPaymentComponent } from './record-payment/recordPayment.component';
import { AllPaymentsComponent } from './all-payments/allPayments.component';
import { AllPaymentsEmployeeComponent } from './all-employeepayments/allPaymentsEmployee.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    NavComponent,
    AllCompaniesComponent,
    BookRideComponent,
    CreateCompanyComponent,
    CreateEmployeeComponent,
    AllEmployeesComponent,
    AllEmployeesEmployeeComponent,
    RecordPaymentComponent,
    AllPaymentsComponent,
    AllPaymentsEmployeeComponent        
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyBuJOssBr5xuExQvIigYzLG1nui4AF8TEg',
      libraries : ['geometry'] 
    }),
    ParticlesModule,
    GooglePlaceModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    MatNativeDateModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [WeatherService, RestService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
