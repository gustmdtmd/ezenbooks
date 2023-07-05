package com.ezenbooks.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ezenbooks.backend.repository.UserRepository;
import com.ezenbooks.backend.dto.UserDTO;

@CrossOrigin("*")

@RestController
public class IndexController {
	
	@Autowired
	private BCryptPasswordEncoder encodePassWord;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/register")
	public String join(@RequestBody UserDTO userDTO) {
		
		System.out.println(userDTO.getUser_name());
		System.out.println(userDTO.getUser_pwd());
		System.out.println(userDTO.getUser_email());
		System.out.println(userDTO.getUser_nickname());
		System.out.println(userDTO.getUser_profile());
		System.out.println(userDTO.getUser_role());
		System.out.println(userDTO.getCreate_date());
		userDTO.setUser_pwd(encodePassWord.encode(userDTO.getUser_pwd()));
		userRepository.saveUser(userDTO);
		
		return "회원가입완료";
	}

}
