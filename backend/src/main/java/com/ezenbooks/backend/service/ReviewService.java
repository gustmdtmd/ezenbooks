package com.ezenbooks.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.ezenbooks.backend.dto.ReviewDTO;

@Service
public interface ReviewService {
	
	public List<ReviewDTO> review() throws Exception;	
	
	public List<ReviewDTO> reviewList(int book_num) throws Exception;	
	public int insert(ReviewDTO dto) throws Exception;
	public void update(ReviewDTO dto) throws Exception;
	public int delete(int review_num) throws Exception;
	
}
