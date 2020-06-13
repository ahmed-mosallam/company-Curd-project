import { Component, OnInit } from '@angular/core';
import{FormBuilder, Validators} from '@angular/forms'
import { Department } from 'src/app/common/department';
import { DepartmentService } from 'src/app/services/department-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  departmentData:Department
  // property to avoid adding the same department again
  isAdded:boolean=false


  // getter for departmet form 
  get departmentName(){
   return this.departmentForm.get('deptName')
 }
 
  constructor(private fb :FormBuilder,private depService:DepartmentService,private router:Router) { }

  // create department form controls
  departmentForm= this.fb.group({
    deptName:['',[Validators.required,Validators.pattern("[a-z A-Z]{1,30}")]]
  })


  ngOnInit(): void {
  }

  // send department data to the server 
  onSubmit(){
   this.departmentData=this.departmentForm.value
   this.depService.addDepartment(this.departmentData).subscribe(data=>{console.log(data)
     this.isAdded=true})
  }

  onReset(){
    this.isAdded=false
  }

  // navigate to department details component 
  goTo(){
   this.router.navigate(['department-details'])
  }
 
}
