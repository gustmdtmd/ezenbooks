package com.ezenbooks.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ezenbooks.backend.dto.SalesDTO;

import com.ezenbooks.backend.service.SalesService;

@CrossOrigin("*") //포트번호에 관계없이 응답을 허가해주는 어노테이션
@RestController //= @Controller + @ResponseBody
public class SalesController {
	@Autowired
	private SalesService salesService;

public void setSalesService(SalesService salesService) {
	this.salesService = salesService;
}

public SalesController() {
	// TODO Auto-generated constructor stub
}
@GetMapping("/Saleslist")
public List<SalesDTO> getUserList() throws Exception{
	System.out.println("book: " + salesService.SalesSearch());
	return salesService.SalesSearch();
	
} //end getUserList()	

}
