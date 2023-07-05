package com.ezenbooks.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ezenbooks.backend.dao.UserDAO;
import com.ezenbooks.backend.dto.UserDTO;

@Service
public class UserServiceImp implements UserService{
	
	@Autowired // UserServiceImp 생성시 자동으로 BookDAO와 연결이 된다. 
	//따로 setter 부분을 만들지 않아도 됨
	private UserDAO userDAO;

	public UserServiceImp() {
	}
	
	@Override
	public UserDTO userSearch(String username) throws Exception {
		return userDAO.getUser(username);
	}
	
	@Override
	public List<UserDTO> userSearchList() throws Exception {
		return userDAO.getUserList();
	}
	
	/* 예림 */
	
	@Override
	public UserDTO updatepro(int user_id) {
		return userDAO.content(user_id);
	}

	@Override
	public void update(UserDTO userDTO)throws Exception {
		userDAO.updateUserList(userDTO);
	}
	
	@Override
	public int delete(int user_id) throws Exception {
		return userDAO.delUserList(user_id);
	}

	}
