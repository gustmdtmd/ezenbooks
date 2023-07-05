package com.ezenbooks.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ezenbooks.backend.dto.SalesDTO;
@Service
public interface SalesService {
public List<SalesDTO> SalesSearch() throws Exception;
}
