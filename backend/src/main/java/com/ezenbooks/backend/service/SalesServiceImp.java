package com.ezenbooks.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ezenbooks.backend.dao.SalesDAO;
import com.ezenbooks.backend.dto.SalesDTO;

@Service
public class SalesServiceImp implements SalesService{

	@Autowired
	private SalesDAO salesDAO;
	public SalesServiceImp() {
		// TODO Auto-generated constructor stub
	}
	@Override
	public List<SalesDTO> SalesSearch() throws Exception {
		// TODO Auto-generated method stub
		return salesDAO.getSalesList();
	}
	
	
	
	
}
