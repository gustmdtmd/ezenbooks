package com.ezenbooks.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ezenbooks.backend.dto.BookDTO;
import com.ezenbooks.backend.dto.DataSetDTO;

@Mapper
@Repository
public interface CurationDAO {
	
	public List<BookDTO> getCurationList(List<Integer> list);
	public List<DataSetDTO> getReviewData();
	public List<DataSetDTO> getOrderDetailData();
	public int getUsersCount();
	public int getBooksCount();
	
}
