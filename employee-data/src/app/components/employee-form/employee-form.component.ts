import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Employee } from 'src/app/common/employee';
import { Department } from 'src/app/common/department';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { DepartmentService } from 'src/app/services/department-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  departmentNames:string[]
  departmentData:Department
  employeeData:Employee
  // property to avoid adding the same employee again
  isAdded:boolean=false


  //getters for employee form control
  get employeeName(){
    return this.employeeForm.get('empName')
  }
  get salary(){
    return this.employeeForm.get('empSalary')
  } 
  get deptName(){
    return this.employeeForm.get('department') 
  }
  get employeeAddress(){
    return this.employeeForm.get('employeeAddress')
  }
  get city(){
    return this.employeeForm.get('employeeAddress').get('city')
  }
  get street(){
    return this.employeeForm.get('employeeAddress').get('street')
  }
  get houseNum(){
    return this.employeeForm.get('employeeAddress').get('houseNum')
  }
 
  constructor(private fb:FormBuilder ,private empService:EmployeeService ,private depService:DepartmentService,
    private router :Router) { }


  // create employee form controls
  employeeForm= this.fb.group({
    empName:['',[Validators.required  , Validators.pattern("[ a-z A-Z]{1,50}")]],
    empSalary:['',[Validators.required  , Validators.pattern("[0-9\.]{1,11}")]],
    employeeAddress:this.fb.group({
     city:['', Validators.pattern("[ a-z A-Z]{1,30}")],
     street:['', Validators.pattern("[0-9 a-z A-Z]{1,50}")],
     houseNum:[, Validators.pattern("[0-9]{1,5}")]
     }),
    department:['']    
   }
  )
  
 
 ngOnInit(): void {
    // get department names to fill department select control 
    this.depService.getDepartmentName().subscribe(data=>this.departmentNames=data)
 }

 // get department data of selected department name 
 onSelect(name:string){
  this.depService.getDepartmentByName(name).subscribe(data=>this.departmentData=data) 
 }
 
// send employee data to the server
 onSubmit(){   
  this.employeeData=new Employee(this.employeeName.value,this.salary.value,this.departmentData,
    this.employeeAddress.value)                  
  this.empService.addEmployee(this.employeeData).subscribe(data=>{console.log(data)
    this.isAdded=true})
 }

 onReset(){
   this.isAdded=false
 }

 // navigate to employee details component
 goTo(){ 
   this.router.navigate(['employee-details']) 
   }
 
}
