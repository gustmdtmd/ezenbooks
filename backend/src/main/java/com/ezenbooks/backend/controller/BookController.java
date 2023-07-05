package com.ezenbooks.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ezenbooks.backend.dto.BookDTO;
import com.ezenbooks.backend.service.BookService;

//http://localhost:8090/booklist

@CrossOrigin("*") //포트번호에 관계없이 응답을 허가해주는 어노테이션
//@CrossOrigin(origins = {"http://localhost:3000"}) //특정 url에만 허가하는 방법
@RestController //= @Controller + @ResponseBody
//@Controller
public class BookController {

		@Autowired
		private BookService bookService;
		
		public BookController() {
		} //end BookController
		
		//Admin 목록용
		//http://localhost:8090/booklist
		@GetMapping("/booklist")
		public List<BookDTO> getBookList() throws Exception{
			return bookService.bookSearch();
			}//end getBookList()
		
		//http://localhost:8090/booklist/write
		@PostMapping("/booklist/write")
		public void insertBookList(BookDTO bookDTO) throws Exception{
			bookService.insert(bookDTO);;
			}//end newBookList()
		
		
		@GetMapping("/booklist/update/{book_num}")
		public BookDTO updateBookList(@PathVariable("book_num") int book_num) {
			System.out.println(book_num);
			return bookService.updatepro(book_num);
		}//end updateBookList()
		
		
		@PutMapping("/booklist/update/{book_num}")
		public void updateProBookList(@PathVariable("book_num") int book_num, BookDTO bookDTO) throws Exception{
			System.out.printf("id:%d, title:%s\n", bookDTO.getBook_num(), bookDTO.getBook_title());
			
			bookService.update(bookDTO);
		}//end updateProBookList
		
		@DeleteMapping("/booklist/delete/{book_num}")
		public void delBookList(@PathVariable("book_num") int book_num) throws Exception {
			bookService.delete(book_num);
		} //end delBookList
				
		//모든 책 정보 
		//http://localhost:8090/category
		@GetMapping("/category")
		public List<BookDTO> getCategoryList() throws Exception{
			return bookService.bookSearch();
			} //end getCategoryList	
			
		//카테고리별 책 정보
		//http://localhost:8090/categorylist/3
		@GetMapping("/category/{code}")
		public List<BookDTO>getCategoryList(@PathVariable("code") int code) throws Exception{
			return bookService.bookCategorySearch(code);
			} //end getCategoryList
			
		//http://localhost:8090/newest
		@GetMapping("/newest")
		public List<BookDTO> getBookNewest() throws Exception{
			return bookService.bookNewest();
			} //end getCategoryList	
				
		//http://localhost:8090/newest
		@GetMapping("/newestsmall")
		public List<BookDTO> getBookNewestSmall() throws Exception{
			return bookService.bookNewestSmall();
			} //end getCategoryList	
				
		//http://localhost:8090/newest/3
		@GetMapping("/newest/{code}")
		public List<BookDTO> getCategoryNewestList(@PathVariable("code") int code) throws Exception{
			return bookService.bookNewestSearch(code);
			} //end getCategoryList	
				
		
		/* 여기서부터 현승님꺼 합친거 */
		
		public void setBookService(BookService bookService) {
			this.bookService = bookService;
		}
		
		/* 여기서부터 환석님거 합친거 */
		
		//http://localhost:8090/search
		@GetMapping("/search")
		public List<BookDTO> getSearchList(@RequestParam("keyword") String book_title) throws Exception{
		return bookService.searchList(book_title);
		}
		
}//end class
