import { Department } from './department'


export class Employee {
    
    empName:string
    empSalary:number 
    department:Department
    employeeAddress :{
        city:string ,
        street:string,
        houseNum:number
    }
    constructor(
        empName:string,
        empSalary:number,
        department:Department,
        employeeAddress :{
            city:string ,
            street:string,
            houseNum:number
        }
        )
        {        
        this.empName=empName
        this.empSalary=empSalary
        this.department=department
        this.employeeAddress=employeeAddress
    }
}
