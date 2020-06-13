import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { EmployeeService } from 'src/app/services/employee-service.service';
import { DepartmentService } from 'src/app/services/department-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Projects } from 'src/app/common/projects';
import { FormBuilder ,FormArray } from '@angular/forms';
import { Employee } from 'src/app/common/employee';
import { Department } from 'src/app/common/department';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {
  projectId:number=0
  employeeNames:string[] 
  departmentNames:string[]
  departmentName:string
  employeeData:Employee[]=[]
  departmentData:Department
  projectData:Projects
  testEmployeeName:string[]=[] 
  isRepeated:boolean=false

  //getters for project form controls
  get projectName(){
    return this.projectForm.get('projectName')
  }
   get employees(){
    return this.projectForm.get('employees') as FormArray
  }
  get department(){
    return this.projectForm.get('department')
  }

  constructor(private projectService:ProjectsService,private employeeService:EmployeeService,private formBuilder:FormBuilder,
    private departmentService:DepartmentService,private router:Router,private route:ActivatedRoute) { }

  
  ngOnInit(): void {
   this.getSelectedProject()   
  }

  // create project form 
  projectForm=this.formBuilder.group({
    projectName:[''],
    employees:this.formBuilder.array([]), 
    department:[],
  })


  //get data of selected project
  getSelectedProject(){
    //fill select control with employees names
    this.employeeService.getEmployeeNames().subscribe(data=>this.employeeNames=data)
    //fill select control with departments names
    this.departmentService.getDepartmentName().subscribe(data=>this.departmentNames=data)
    //get id of selected project
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.projectId=+param.get('id')
      //get data of selected project by id
      this.projectService.getProject(this.projectId).subscribe(data=>{this.projectData=data
        this.getNumberofEmployees()
        this.getEmployeeNames()       
        this.departmentData=this.projectData.department
        this.employeeData=this.projectData.employee      
       //fill project form with selected project data       
        this.projectForm.patchValue({
          projectName:this.projectData.name,
          employees:this.projectData.employee,
          department:this.projectData.department.deptName 
       })       
     })
    })    
  }

  //get number of employees for selected project 
  getNumberofEmployees(){
    for(let employeedata of this.projectData.employee){
    this.employees.push(this.formBuilder.control(''))
    }
  }

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


  //get names of employees for selected project
  getEmployeeNames(){
   for(let existingEmployeeData of this.projectData.employee){          
    this.testEmployeeName.push(existingEmployeeData.empName)
   }
  } 

  // get employee names and test repeated names 
  onSelectMoreEmployees(name:string,index:number){    
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
  
  
 //get object of department by name 
 onSelectDepartment(name:string){
   this.departmentService.getDepartmentByName(name).subscribe(data=>this.departmentData=data)
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


 // send updated project data to the server
 onSubmit(){  
   //create new object of project data for updating selected project data  
   this.projectData= new Projects(this.projectName.value,this.employeeData,this.departmentData)
   this.projectService.updateProject(this.projectId,this.projectData).subscribe(data=>console.log(data))
   this.router.navigate(['project-details'])
 }   
 
}
