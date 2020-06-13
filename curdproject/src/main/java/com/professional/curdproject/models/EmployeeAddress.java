package com.professional.curdproject.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class EmployeeAddress {
 private String city;
 private String Street;
 @Column(name="House_Number")
 private int houseNum;
}
