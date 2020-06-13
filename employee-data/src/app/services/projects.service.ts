import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projects } from '../common/projects';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl:string = "http://localhost:8080/project-api/projects"
  constructor(private http:HttpClient) { }
  getProjects():Observable<Projects[]>{
    return this.http.get<Projects[]>(this.baseUrl)
  }
  getProject(id:number):Observable<Projects>{
    const searchUrl=`${this.baseUrl}/search/id/${id}`
    return this.http.get<Projects>(searchUrl)
  }
  addProject(project:Projects):Observable<Projects>{
    return this.http.post<any>(this.baseUrl,project)
  }
  updateProject(id:number , project:Projects):Observable<Projects>{
    const updateUrl=`${this.baseUrl}/${id}`
    return this.http.put<any>(updateUrl,project)
  }
  deleteProjcet(id:number){
    const deleteUrl=`${this.baseUrl}/${id}`    
    return this.http.delete(deleteUrl)
  }
}
