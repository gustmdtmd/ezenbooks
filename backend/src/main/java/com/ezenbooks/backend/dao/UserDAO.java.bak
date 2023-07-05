package com.ezenbooks.backend.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ezenbooks.backend.dto.UserDTO;

@Mapper //bookMapper.xml과 자동으로 연결시켜주는 어노테이션
@Repository //dao 부분을 선언하는 어노테이션 //sqlSessionTemplete 과 같은 설정을 대신해준다.
public interface UserDAO {

	public UserDTO getUser(String username) throws Exception;
	
	public List<UserDTO> getUserList() throws Exception;

}
