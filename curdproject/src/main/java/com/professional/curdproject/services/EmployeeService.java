package com.professional.curdproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.professional.curdproject.models.Employee;

import com.professional.curdproject.repsitory.EmployeeRepository;

@Service
public class EmployeeService {
   
	@Autowired
	private EmployeeRepository empRepository;

    
    public List<Employee> getAll() {
    	return empRepository.findAll();
    }
    
    
    public Employee getOne(long id) {
    	return empRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("No Employees Match This Id"));
    }
    
    
    public String delete(long id)  {
    	Employee employee = getOne(id);
    	empRepository.delete(employee);
    	return "deleted";
    }
    
    
    public Employee update(long id , Employee employee) {
    	Employee selectedEmployee = getOne(id);
   	   selectedEmployee.setEmpName(employee.getEmpName());
   	   selectedEmployee.setEmpSalary(employee.getEmpSalary());
   	   selectedEmployee.setDepartment(employee.getDepartment());
   	   selectedEmployee.setEmployeeAddress(employee.getEmployeeAddress());
   	   return empRepository.save(selectedEmployee);
    }
    
    
    public Employee add(Employee employee) {
    	return empRepository.save(employee);
    }
    
    
    public Employee getByName(String name) {
    	return empRepository.findByempName(name);
    }
    
    
    public List<String> getNames(){
    	return empRepository.findAllNames();
    }
}
