package com.ezenbooks.backend.controller;

import java.nio.charset.Charset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ezenbooks.backend.dto.ReviewDTO;
import com.ezenbooks.backend.service.ReviewService;

@CrossOrigin("*")
@RestController
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	public ReviewController() {
	}

	public void setReviewService(ReviewService reviewService) {
		this.reviewService = reviewService;
	}

	@GetMapping("/review/{book_num}")
	public List<ReviewDTO> reviewList(@PathVariable("book_num") int book_num) throws Exception {
		return reviewService.reviewList(book_num);
	}

	// Admin 리뷰 관리 용 모든 리뷰 반환
	@GetMapping("/reviewlist")
	public List<ReviewDTO> review() throws Exception {
		return reviewService.review();
	}

	// http://localhost:8090/review
	@PostMapping("/review")
	public ResponseEntity<Object> postReview(@RequestBody ReviewDTO reviewDTO) throws Exception {
		System.out.println("review_controller");
		int chk = reviewService.insert(reviewDTO);
		System.out.println("review_controller: " + chk);

		/*
		 * 여기 왜 자꾸 에러날까? HttpHeaders headers = new HttpHeaders();
		 */

		HttpHeaders headers = new org.springframework.http.HttpHeaders();
		headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

		HashMap<String, String> map = new HashMap<>();
		map.put("createDate", new Date().toString());
		map.put("message", "insert ok");

		if (chk >= 1) {
			return new ResponseEntity<Object>(map, headers, HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>(HttpStatus.NOT_ACCEPTABLE);
		}
	}

	// http://localhost:8090/review/update
	@PutMapping("/review/update")
	public void updateReview(@RequestBody ReviewDTO dto) throws Exception {
		reviewService.update(dto);
	}

	// http://localhost:8090/review/1
	@ResponseBody
	@DeleteMapping("/review/{review_num}")
	public void deleteReview(@PathVariable("review_num") int review_num) throws Exception {
		System.out.printf("num=%d\n", review_num);
		reviewService.delete(review_num);
	}
}
