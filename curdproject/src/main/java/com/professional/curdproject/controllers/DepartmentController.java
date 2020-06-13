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
import com.professional.curdproject.models.Department;
import com.professional.curdproject.services.DepartmentService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/department-api")
public class DepartmentController {
	 @Autowired
	 DepartmentService depService;
	 
	 
	    @GetMapping("departments")
	    public List<Department> findAll(){
	    	 return depService.getAll();
	    }
	    
	    @GetMapping("departments/names")
	    public List<String> findDepartmentsNames(){
	    	return depService.findNames();
	    }
	    
	    
	    @GetMapping("departments/search/departmentId/{deptId}")
	    public Department findDepartmentById(@PathVariable("deptId") int deptId) {
	    	 return depService.getOne(deptId);
	    }
	    
	    
	    @GetMapping("departments/departmentName/{deptId}")
	    public String getDepartmentName(@PathVariable("deptId") int deptId ) {
	    	 return depService.getNameById(deptId);
	    }
	    
	    
	    @GetMapping("departments/departmentId/{deptName}")
	    public int getDepartmentId(@PathVariable("deptName") String deptName) {
	    	return depService.getIdByName(deptName); 
	    }
	    
	    
	    @GetMapping("departments/search/departmentName/{deptName}")
	    public Department findDepartmentByName(@PathVariable("deptName")String deptName) {
	    	return depService.getByName(deptName);
	    }
	    
	    
	    @PostMapping("departments")
	    public Department saveDepartment( @RequestBody Department department) {
	    	return depService.add(department);
	    }
	    
	    
	    @PutMapping("departments/{deptId}")
	    public Department updateDepartment(@RequestBody Department newDepartment , @PathVariable("deptId")int deptId) {
	        return depService.update(newDepartment,deptId);
	    }
	    
	    
	    @DeleteMapping("departments/{deptId}")
	    public String deleteDepartment(@PathVariable("deptId") int deptId) {
	    	return depService.delete(deptId);   
	    }
}
