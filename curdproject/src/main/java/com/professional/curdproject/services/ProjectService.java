package com.professional.curdproject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.professional.curdproject.models.Projects;
import com.professional.curdproject.repsitory.ProjectRepository;

@Service
public class ProjectService {
 @Autowired
 private ProjectRepository projRepo;
 
 
 public List<Projects> getAll(){
	 return projRepo.findAll();
 }
 
 public Projects getOne(long id) {
	 return projRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("No Projects Match This Id"));
 }
 
 public Projects add(Projects project) {
	 return projRepo.save(project);
 }
 
 public Projects update(long id , Projects newProject) {
	 Projects selectedProject=getOne(id);	 
	 selectedProject.setName(newProject.getName());
	 selectedProject.setDepartment(newProject.getDepartment());
	 selectedProject.setEmployee(newProject.getEmployee());
	 return projRepo.save(selectedProject);
 }
 
 public String delete(long id) {
	 Projects project = getOne(id);
	 projRepo.delete(project);
	 return"Deleted Successfuly";
 }
}
