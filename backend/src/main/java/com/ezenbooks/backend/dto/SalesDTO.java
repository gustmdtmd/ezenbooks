package com.ezenbooks.backend.dto;



import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Component //특정한 의미가 없는 class 는 @Component 를 선언해줘야 한다.
@NoArgsConstructor
@AllArgsConstructor
public class SalesDTO {
private int category_code;
private int total;

private String month;

public int getCategory_code() {
	return category_code;
}

public void setCategory_code(int category_code) {
	this.category_code = category_code;
}

public int getTotal() {
	return total;
}

public void setTotal(int total) {
	this.total = total;
}

public String getMonth() {
	return month;
}

public void setMonth(String month) {
	this.month = month;
}

@Override
public String toString() {
	return "SalesDTO [category_code=" + category_code + ", total=" + total + ", month=" + month + "]";
}








}
