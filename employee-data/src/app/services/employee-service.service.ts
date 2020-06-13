import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   baseUrl="http://localhost:8080/employee-api/employees"
  constructor(private http :HttpClient) { }
  getEmployees():Observable<Employee[]>{
     return this.http.get<Employee[]>(this.baseUrl)
  }
  getEmployee(empId:number):Observable<Employee>{
    const searchUrl =`${this.baseUrl}/search/employeeId/${empId}`
    return this.http.get<Employee>(searchUrl)
  }
  getEmployeeNames():Observable<string[]>{
    const searchUrl=`${this.baseUrl}/names`
    return this.http.get<string[]>(searchUrl)
  }
  getEmployeeByName(name:string):Observable<Employee>{
    const searchUrl=`${this.baseUrl}/search/employeeName/${name}`
    return this.http.get<Employee>(searchUrl)
  }
  addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<any>(this.baseUrl,employee)
  }
  deleteEmployee(empId:number){
    const delUrl=`${this.baseUrl}/${empId}`
    return this.http.delete(delUrl)
  }
  updateEmployee( employee:Employee , empId:number ):Observable<Employee>{
   const updateUrl=`${this.baseUrl}/${empId}`
   return this.http.put<any>(updateUrl,employee)
  }
}

