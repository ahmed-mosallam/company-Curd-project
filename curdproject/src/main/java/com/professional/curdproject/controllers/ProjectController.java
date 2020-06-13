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

import com.professional.curdproject.models.Projects;
import com.professional.curdproject.services.ProjectService;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("project-api")
public class ProjectController {
    
	@Autowired
	private ProjectService projService;
    
    
    @GetMapping("projects")
    public List<Projects> getProjects(){
    	return projService.getAll();
    }
    
    @GetMapping("projects/search/id/{id}")
    public Projects getProjectById(@PathVariable("id") long id) {
    	return projService.getOne(id);
    }
    
    @PostMapping("projects")
    public Projects addProject(@RequestBody Projects project) {
    	return projService.add(project);
    }
    
    @PutMapping("projects/{id}")
    public Projects updateProject(@PathVariable("id")long id ,@RequestBody Projects project) {
	   return projService.update(id, project);
   } 
    
    @DeleteMapping("projects/{id}")
    public String deleteProject(@PathVariable("id")long id) {
	   return projService.delete(id);
   } 
    
 }  
