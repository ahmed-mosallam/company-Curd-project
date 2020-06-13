import { Department } from './department'
import { Employee } from './employee'

export class Projects {
 
    name:string    
    employee:Employee[]
    department:Department
    constructor(
        name:string,        
        employee:Employee[],
        department:Department
        ){
            this.name=name             
            this.employee=employee
            this.department=department
        }
   
}
