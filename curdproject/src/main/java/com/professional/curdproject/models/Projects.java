package com.professional.curdproject.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Entity
@Getter
@Setter
@ToString 
public class Projects {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
 private long id ;
	@Column(name="project_name",nullable=false,length=100)
 private String name ;
	@ManyToMany
	@JoinTable(name="work_on",joinColumns= {@JoinColumn(name="project")},
	inverseJoinColumns= {@JoinColumn(name="employee")})
 private List<Employee> employee ;
	@ManyToOne
	@JoinColumn(name="Department")
 private Department department;
}
