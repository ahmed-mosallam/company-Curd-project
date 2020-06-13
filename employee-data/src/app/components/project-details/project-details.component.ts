import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/common/projects';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
 
 
  projectData:Projects[]
 
 
  constructor(private projectService:ProjectsService,private router:Router) { }

 
  ngOnInit(): void {
     // get all projects data 
     this.projectService.getProjects().subscribe(data=>this.projectData=data)
  }

  // delete selected project   
  onDelete(id:number){
    this.projectService.deleteProjcet(id).subscribe(data=>console.log(data))
    location.reload()
  }

  // navigate to project update component 
  onUpdate(id:number){ 
    this.router.navigate(['project-update',id])
  }

}
