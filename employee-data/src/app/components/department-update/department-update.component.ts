import { Component, OnInit } from '@angular/core';
import{FormBuilder, Validators} from '@angular/forms'
import { Department } from 'src/app/common/department';
import { DepartmentService } from 'src/app/services/department-service.service';
import {  ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})
export class DepartmentUpdateComponent implements OnInit {
 
 
  departmentData:Department
  departmentId:number

  // getter for department form 
  get deptName(){
    return this.departmentForm.get('deptName')
  }
  
  constructor(private fb :FormBuilder,private depService:DepartmentService,private route:ActivatedRoute 
   ,private router:Router) { }
  
  // create department form control 
  departmentForm= this.fb.group({
     deptName:['',[Validators.required,Validators.pattern("[a-z A-Z]{1,30}")]]
  })


  ngOnInit(): void {
      // get id of selected department 
      const id= parseInt(this.route.snapshot.paramMap.get('id'))
      this.departmentId = id
      // get data of selected department by id 
      this.depService.getDepartment(this.departmentId).subscribe(data=>{this.departmentData=data
      // fill department form with selectd department data  
      this.departmentForm.patchValue({
           deptName:this.departmentData.deptName
     })
   })
  }

  // send updated department data to the server
  onSubmit(){
    this.departmentData=this.departmentForm.value
    this.depService.updateDepartment(this.departmentData,this.departmentId).subscribe(data=>console.log(data))
    this.router.navigate(['department-details'])
  }

}
