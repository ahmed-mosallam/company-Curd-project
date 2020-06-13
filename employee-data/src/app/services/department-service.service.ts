import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../common/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
     baseUrl = "http://localhost:8080/department-api/departments"

  constructor(private http :HttpClient) { }

  getDepartments():Observable<Department[]>{
   return this.http.get<Department[]>(this.baseUrl)
  }
  getDepartment(deptId:number):Observable<Department>{
   const searchUrl= `${this.baseUrl}/search/departmentId/${deptId}`
   return this.http.get<Department>(searchUrl) 
  }  
  getDepartmentName():Observable<string[]>{
    const searchUrl=`${this.baseUrl}/names`
    return this.http.get<string[]>(searchUrl)
  }
  getDepartmentByName(name:string):Observable<Department>{
    const searchUrl=`${this.baseUrl}/search/departmentName/${name}`
    return this.http.get<Department>(searchUrl)
  }
  getDepartmentNameById(id :number):Observable<string>{
    const searchUrl= `${this.baseUrl}/departmentName/${id}`
    return  this.http.get<string>(searchUrl)
  }
  getDepartmentIdByName(name:string):Observable<number>{
    const searchUrl=`${this.baseUrl}/departmentId/${name}`
    return this.http.get<number>(searchUrl)
  }
  addDepartment(department:Department):Observable<Department>{
    return this.http.post<any>(this.baseUrl,department)
  }
  deleteDepartment(deptId:number):Observable<Department>{
    const deleteUrl=`${this.baseUrl}/${deptId}`
    return this.http.delete<any>(deleteUrl)
  }
  updateDepartment(department:Department,deptId:number):Observable<Department>{
    const updateUrl=`${this.baseUrl}/${deptId}`
    return this.http.put<any>(updateUrl,department)
  }
}
