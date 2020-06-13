package com.professional.curdproject.models;

//import java.util.List;

//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Entity
@Getter
@Setter
@ToString
public class Department {
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
@Column(name="Department_Id",nullable=false)
private int deptId;
@Column(name="Name",nullable=false,length=30)
private String deptName;
//@OneToMany(cascade=CascadeType.ALL, mappedBy="department")
//private List<Employee> employee;
}
