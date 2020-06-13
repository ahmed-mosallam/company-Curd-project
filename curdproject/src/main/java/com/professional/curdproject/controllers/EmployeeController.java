package com.professional.curdproject.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.professional.curdproject.models.Employee;
import com.professional.curdproject.services.EmployeeService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/employee-api")
public class EmployeeController {
	 @Autowired
	 EmployeeService empService;
	 
	 
	    @GetMapping("employees")
	    public List<Employee> findAllEmployees(){
	      	 return empService.getAll();
	    }
	    
	    @GetMapping("employees/search/employeeId/{empId}")
	    public Employee findEmployeeById(@PathVariable("empId") int empId) {
	    	 return empService.getOne(empId);
	    }
	    
	    @GetMapping("employees/search/employeeName/{empName}")
	    public Employee findEmployeeByName(@PathVariable("empName")String empName) {
	    	return empService.getByName(empName);
	    }
	    
	    
	    @GetMapping("employees/names")
	    public List<String> getEmployeesNames(){
	    	return empService.getNames();
	    }
	    
	    
	    @PostMapping("employees")
	    public Employee saveEmployee(@RequestBody Employee employee ) {
	    	  return empService.add(employee);
	    }
	    
	    
	    @PutMapping("employees/{empId}")
	    public Employee update(@RequestBody Employee newEmployee,@PathVariable("empId") int empId) {
	     	  return empService.update(empId, newEmployee);
	    }
	    
	    
	    @DeleteMapping("employees/{empId}")
	    public String delete(@PathVariable("empId") int empId){
	    	 return empService.delete(empId);
	    }
	    

}
