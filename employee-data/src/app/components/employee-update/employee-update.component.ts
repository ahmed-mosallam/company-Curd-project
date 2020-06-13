import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { EmployeeService } from 'src/app/services/employee-service.service';
import { DepartmentService } from 'src/app/services/department-service.service';
import { Employee } from 'src/app/common/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/common/department';
@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  departmentNames:string[]
  departmentData:Department
  departmentName:string
  employeeData:Employee
  employeeId:number

  //getters for employee form control
  get empName(){
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


  constructor(private fb:FormBuilder,private empService:EmployeeService ,private depService:DepartmentService
    ,private route :ActivatedRoute,private router:Router) { }
    

  // create employee form controls
  employeeForm= this.fb.group({
    empName:['',[Validators.required  , Validators.pattern("[ a-z A-Z]{1,50}")]],
    empSalary:['',[Validators.required  , Validators.pattern("[0-9\.]{1,11}")]],
    employeeAddress:this.fb.group({
    city:['', Validators.pattern("[ a-z A-Z]{1,30}")],
    street:['', Validators.pattern("[0-9 a-z A-Z]{1,50}")],
    houseNum:[, Validators.pattern("[0-9]{1,5}")]
    }),
    department:[]     
   }
  )
  
  ngOnInit(): void {
     // get id of selected employee
     const id = parseInt( this.route.snapshot.paramMap.get('id'))
     this.employeeId=id
     // get selected employee data by id 
     this.empService.getEmployee(this.employeeId).subscribe(data=>{this.employeeData=data
     // get department name of selected employee for department select control 
     this.departmentName=this.employeeData.department.deptName
     // get department names to fill department select control 
     this.depService.getDepartmentName().subscribe(data=>this.departmentNames=data)
     // fill employee form of selected employee data    
     this.employeeForm.patchValue({
          department:this.employeeData.department,
          empName: this.employeeData.empName,
          empSalary: this.employeeData.empSalary,
          employeeAddress :this.employeeData.employeeAddress
     })
   })
  }


   // get department data of selected department name 
   onSelect(name:string){
    this.depService.getDepartmentByName(name).subscribe(data=>this.departmentData=data)    
  }


  // send updated employee data to the server
  onSubmit(){   
    this.employeeData= new Employee(this.empName.value,this.salary.value,this.departmentData,
    this.employeeAddress.value)
    this.empService.updateEmployee(this.employeeData,this.employeeId).subscribe(data=>console.log(data))
    this.router.navigate(['employee-details'])
  }  
}
