package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class IpsApplication {

	@RequestMapping("/")	// 원래 컨트롤러에 작성할 메서드
	public String hello() {		
		return "Hello World!";
	}	
    
	public static void main(String[] args) {
		SpringApplication.run(IpsApplication.class, args );
	}
}
