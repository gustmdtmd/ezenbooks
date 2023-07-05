package com.ezenbooks.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ezenbooks.backend.dao.BookDAO;
import com.ezenbooks.backend.dto.BookDTO;

@Service
public class BookServiceImp implements BookService {

	@Autowired //BookServiceImp 생성시 자동으로 BookDAO와 연결이 된다. 
	//따로 setter 부분을 만들지 않아도 됨
	private BookDAO bookDAO;
	
	public BookServiceImp() {
	}
	
	@Override
	public List<BookDTO> bookSearch() throws Exception {
		return bookDAO.getBookList();
	}
	
	@Override
	public List<BookDTO> bookCategorySearch(int code) throws Exception {
		return bookDAO.getCategoryList(code);
	}

	@Override
	public List<BookDTO> bookNewest() throws Exception {
		return bookDAO.getNewestList();
	}
	
	@Override
	public List<BookDTO> bookNewestSmall() throws Exception {
		return bookDAO.getNewestSmallList();
	}
	
	@Override
	public List<BookDTO> bookNewestSearch(int code) throws Exception {

		return bookDAO.getCategoryNewestList(code);
	}

	/* 여기서부터 현승님꺼 합친거 */
	
	public void setBookDAO(BookDAO bookDAO) {
		this.bookDAO = bookDAO;
	}
	@Override
	public List<BookDTO> search() throws Exception {
		System.out.println("sv:" + bookDAO.getBookList());
		return bookDAO.getBookList();
	}
	
	/* 여기서 부터 환석님꺼 합친거 */
	
	public List<BookDTO> searchList(String book_title) throws Exception {
		return bookDAO.getSearchList(book_title);
	}
	
	/* 예림 */
	/* booklist insert/update/delete */
	@Override
	public int insert(BookDTO bookDTO) throws Exception {
		return bookDAO.insertBookList(bookDTO);
	}
	
	@Override
	public BookDTO updatepro(int book_num) {
		return bookDAO.content(book_num);
	}

	@Override
	public void update(BookDTO bookDTO)throws Exception {
		bookDAO.updateBookList(bookDTO);
	}
	
	
	@Override
	public int delete(int book_num) throws Exception {
		return bookDAO.delBookList(book_num);
	}
}
