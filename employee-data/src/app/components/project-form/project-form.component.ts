import { Component, OnInit } from '@angular/core';
import {FormBuilder ,FormArray, Validators}  from '@angular/forms';
import { Projects } from 'src/app/common/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { Employee } from 'src/app/common/employee';
import { Department } from 'src/app/common/department';
import { DepartmentService } from 'src/app/services/department-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  employeeNames:string[] 
  departmentNames:string[]
  employeeData:Employee[]=[]
  deparmentData:Department
  projectData:Projects
  testEmployeeName:string[]=[] 
  isRepeated:boolean=false
  // property to avoid adding the same project again
  isAdded:boolean=false
  

  // getters for project form control
  get projectName(){
    return this.projectForm.get('projectName')
  }
 
  get employees(){
    return this.projectForm.get('employees') as FormArray
  }
  get department(){
    return this.projectForm.get('department')
  }


  constructor(private formBuilder:FormBuilder,private projectService:ProjectsService,
    private employeeService:EmployeeService,private departmentService:DepartmentService,
    private router:Router ) { }


  ngOnInit(): void {
     //fill select control with employees names
    this.employeeService.getEmployeeNames().subscribe(data=>this.employeeNames=data)
    //fill select control with departments names
    this.departmentService.getDepartmentName().subscribe(data=>this.departmentNames=data)
  }

  // create project form controls
  projectForm =this.formBuilder.group({
    projectName:['',[Validators.required  , Validators.pattern("[ a-z A-Z]{1,100}")]],   
    employees:this.formBuilder.array([]),
    department:[]
  }) 

  // add more select controls of employees for selected project 
  addEmployee(){
    this.employees.push(this.formBuilder.control(''))    
  }

  // delete selected select control and update testEmployeeName & employeeData
  onReduceEmployees(index:number){ 
    this.employees.controls.splice(index,1)
    this.testEmployeeName.splice(index,1)
    console.log(this.testEmployeeName)
    this.employeeData.splice(index,1)
    this.getEmployeesData(index)   
  } 
 

  // get employee names and test repeated names
  onSelectEmployees(name:string,index:number){    
    if (this.testEmployeeName.includes(name)){
      this.isRepeated=true    
    }
    else{
      if (this.employees.controls.length===this.testEmployeeName.length) 
      {
       this.testEmployeeName= this.testEmployeeName.fill(name,index,index+1)
        this.isRepeated=false 
        this.getEmployeesData(index)
      }
      else{ 
      this.testEmployeeName.push(name)
      this.isRepeated=false
      this.getEmployeesData(index) 
      }  
    }   
  }

 //get department data by name 
  onSelectDepartment(name:string){
    this.departmentService.getDepartmentByName(name).subscribe(data=>this.deparmentData=data)
    
  }


 // get employees data for all selected employees 
  getEmployeesData(index:number){    
    for(let employee of this.testEmployeeName ){
      let exsistingEmployee:Employee=this.employeeData.find(data=>data.empName===employee)
      if(exsistingEmployee===undefined){
        if(this.employeeData.length===this.testEmployeeName.length){
          this.employeeService.getEmployeeByName(employee).subscribe(data=>this.employeeData=this.employeeData.fill(data,index,index+1))
        }
        else{
         this.employeeService.getEmployeeByName(employee).subscribe(data=>this.employeeData.push(data))
        }
      }    
    }    
  }

 // send new project data to the server
  onSubmit(){
    // create new object of project data for sending it to the server
    this.projectData= new Projects(this.projectName.value,this.employeeData,this.deparmentData)        
    this.projectService.addProject(this.projectData).subscribe(data=>{console.log(data)
     this.isAdded=true })    
  }


  onReset(){
    this.isAdded=false
    this.employees.controls.splice(0,this.employees.controls.length)
  }

  // navigate to project details component 
  showProjectDetails(){
    this.router.navigate(['project-details'])
  }
}
