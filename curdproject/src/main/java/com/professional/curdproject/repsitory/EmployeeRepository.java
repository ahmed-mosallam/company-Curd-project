package com.professional.curdproject.repsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.professional.curdproject.models.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long>{
     
	
	Employee findByempName(@Param("empName")String empName); 
     
     
     @Query("select empName from Employee")
     List<String> findAllNames();
}
