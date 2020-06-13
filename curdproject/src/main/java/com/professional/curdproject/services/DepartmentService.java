package com.professional.curdproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.professional.curdproject.models.Department;
import com.professional.curdproject.repsitory.DepartmentRepository;

@Service
public class DepartmentService {
	
	@Autowired
    private DepartmentRepository depRepository;
	
	
	public List<Department> getAll(){
		return depRepository.findAll();
	}
	
	
	public Department getOne(int id) {
		return depRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("No Departments Match This Id"));
	}
	
	
	public List<String> findNames(){
    	return depRepository.findAllNames();
    }
	
	
	public Department add(Department department) {
		return depRepository.save(department);
	}
	
	
	public Department update(Department department , int id) {
	Department selectedDepartment = getOne(id);
    selectedDepartment.setDeptName(department.getDeptName());
    return depRepository.save(selectedDepartment);
	}
	
	
	public String delete(int id) {
		 Department department = getOne(id);
	     depRepository.delete(department); 
	     return "Deleted Successfully";   
	}
	
	
	public String getNameById(int id) {
		 return depRepository.findNameById(id);
	}
	
	
	public int getIdByName(String name) {
		return depRepository.findIdByName(name); 
	}
	
	
	public Department getByName(String name) {
		return depRepository.findBydeptName(name);				
	}
}

