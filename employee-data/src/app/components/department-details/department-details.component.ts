import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department-service.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/common/department';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  constructor(private depservice:DepartmentService , private router:Router) { }
   
  
  departmentData:Department[]


  ngOnInit(): void {
    // get all departments data 
    this.depservice.getDepartments().subscribe(data=>this.departmentData=data)
  }

  // delete selected department 
  onDelete(deptId:number){
   this.depservice.deleteDepartment(deptId).subscribe()
   location.reload()
  }

  // navigate to department update component 
  onUpdate(deptId:number){
    this.router.navigate(['department-update',deptId])
  }


}
