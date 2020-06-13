import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DepartmentUpdateComponent } from './components/department-update/department-update.component'
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectUpdateComponent } from './components/project-update/project-update.component';

const routes: Routes = [
  {path:'',redirectTo:'employee',pathMatch:'full'}, 
  {path:'employee', component:EmployeeFormComponent},
  {path:'department',component:DepartmentFormComponent},
  {path:'project',component:ProjectFormComponent},
  {path :'employee-details',component:EmployeeDetailsComponent},
  {path:'department-details',component:DepartmentDetailsComponent},
  {path:'project-details',component:ProjectDetailsComponent},
  {path:'employee-update/:id',component:EmployeeUpdateComponent},
  {path:'department-update/:id',component:DepartmentUpdateComponent},
  {path:'project-update/:id',component:ProjectUpdateComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[EmployeeFormComponent,DepartmentFormComponent,ProjectFormComponent,
  EmployeeDetailsComponent,DepartmentDetailsComponent,ProjectDetailsComponent,
  EmployeeUpdateComponent,DepartmentUpdateComponent,ProjectUpdateComponent,
  PageNotFoundComponent]
