package com.professional.curdproject.models;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Employee {
@Id
@GeneratedValue(strategy=GenerationType.AUTO)
@Column(name="Employee_Id",nullable=false)
 private long empId;
@Column(name="Name",nullable=false,length=50)
private String empName;
@Column(name="Salary",nullable=false)
private BigDecimal empSalary;
@Embedded
private EmployeeAddress employeeAddress;
@ManyToOne
@JoinColumn(name="Department")
private Department department;

}
