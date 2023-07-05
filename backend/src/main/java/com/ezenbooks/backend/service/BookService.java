package com.ezenbooks.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.ezenbooks.backend.dto.BookDTO;

@Service
public interface BookService {


	
	public List<BookDTO> bookSearch() throws Exception;
	
	public List<BookDTO> bookCategorySearch(int code) throws Exception;

	public List<BookDTO> bookNewest() throws Exception;
	
	public List<BookDTO> bookNewestSmall() throws Exception;
	
	public List<BookDTO> bookNewestSearch(int code) throws Exception;
	
	/* 여기서부터 현승님꺼 합친거 */
	
	public List<BookDTO> search() throws Exception;
	
	/* 여기서 부터 환석님꺼 합친거 */
	
	public List<BookDTO> searchList(String book_title) throws Exception;
	
	/* 예림 */
	
	public int insert(BookDTO bookDTO) throws Exception;
	
	public void update(BookDTO bookDTO) throws Exception;
	
	public BookDTO updatepro(int book_num);

	public int delete(int book_num) throws Exception;

}
