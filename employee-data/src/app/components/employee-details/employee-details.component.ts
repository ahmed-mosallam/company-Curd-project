import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { Employee } from 'src/app/common/employee';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {  
  
  employeeData:Employee[]


  constructor(private empService :EmployeeService, private router :Router) { }

  ngOnInit(): void {
    // get all employees data 
    this.empService.getEmployees().subscribe(data=>this.employeeData=data)
   
    
  } 

  // delete selected employee
  onDelete(empId:number){
    this.empService.deleteEmployee(empId).subscribe()
    location.reload()
    
  }
  
  // navigate to employee update component 
  onUpdate(empId:number){
    this.router.navigate(['employee-update',empId])
  }

}
