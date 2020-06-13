package com.professional.curdproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages= {"com.professional.curdproject","com.professional.curdproject.config","com.professional.curdproject.models","com.professional.curdproject.repsitory"})
public class CurdprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CurdprojectApplication.class, args);
	}

}
