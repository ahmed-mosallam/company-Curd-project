import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'; 
import {AppRoutingModule,routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeService} from './services/employee-service.service';
import {DepartmentService} from './services/department-service.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
   EmployeeService,
   DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
