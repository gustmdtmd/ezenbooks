package com.ezenbooks.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ezenbooks.backend.dao.ReviewDAO;
import com.ezenbooks.backend.dto.ReviewDTO;

@Service
public class ReviewServiceImp implements ReviewService{
	
	@Autowired
	private ReviewDAO reviewDAO;
	
	public ReviewServiceImp() {
	
	}
	
	public void setReviewDAO(ReviewDAO reviewDAO) {
		this.reviewDAO = reviewDAO;
	}
	
	@Override
	public List<ReviewDTO> review() throws Exception {
		return reviewDAO.review();
	}
	
	@Override
	public List<ReviewDTO> reviewList(int book_num) throws Exception {
		return reviewDAO.reviewList(book_num);
	}

	@Override
	public int insert(ReviewDTO dto) throws Exception {
		System.out.println("ReviewService");
		return reviewDAO.insertReview(dto);
	}

	@Override
	public void update(ReviewDTO dto) throws Exception {
		reviewDAO.updateReview(dto);
	}

	@Override
	public int delete(int review_num) throws Exception {
		return reviewDAO.deleteReview(review_num);
	}
}