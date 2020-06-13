package com.professional.curdproject.repsitory;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.professional.curdproject.models.Department;



public interface DepartmentRepository extends JpaRepository<Department, Integer> {

	@Query("select deptId from Department where deptName=?1")
    int findIdByName(@Param("name")String name );

	
	@Query("select deptName from Department where deptId=?1" )
    String findNameById(@Param("id") int id);
    
	
	@Query("select deptName from Department")
    List<String> findAllNames();
    
	
	Department findBydeptName(@Param("deptName")String deptName);

}
