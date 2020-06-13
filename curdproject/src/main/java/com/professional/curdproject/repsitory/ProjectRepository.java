package com.professional.curdproject.repsitory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.professional.curdproject.models.Projects;


public interface ProjectRepository extends JpaRepository<Projects, Long> {

}
