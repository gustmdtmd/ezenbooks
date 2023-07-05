package com.ezenbooks.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.stereotype.Service;

import com.ezenbooks.backend.dao.CurationDAO;
import com.ezenbooks.backend.dto.BookDTO;
import com.ezenbooks.backend.dto.DataSetDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CurationServiceImpl extends Calculator implements CurationService {
	
	private final CurationDAO dao;
	
	@Override
	public List<BookDTO> curationProcess(int user_id, int bought) {
		
		List<DataSetDTO> dataSetList = dao.getOrderDetailData();
		
		boolean select = false;
		
		List<BookDTO> result = dao.getCurationList(DataAnalysis(user_id, bought, dataSetList, select, 10));
		
		return result;
	}
	
	@Override
	public List<BookDTO> userPickProcess(int user_id, int bought) {
		
		List<DataSetDTO> dataSetList = dao.getReviewData();
		
		boolean select = true;
		
		List<BookDTO> result = dao.getCurationList(DataAnalysis(user_id, bought, dataSetList, select, 20));
		
		return result;
	}
	
	/**
	 * 데이터 분석 로직
	 * 
	 * @param user_id
	 * @param bought
	 * @param dataSetList
	 * @param select
	 * @return List<Integer>
	 */
	private List<Integer> DataAnalysis(int user_id, int bought, 
									   List<DataSetDTO> dataSetList, boolean select,
									   int num) {
		
		int NUM_USERS = dao.getUsersCount();
		int NUM_BOOKS = dao.getBooksCount();
		
		/*
		 * 유틸리티 행렬을 얻는다.
		 */
		double[][] u = new double[NUM_USERS + 1][NUM_BOOKS + 1];
		
		for (DataSetDTO data : dataSetList) {
			int i = data.getUser_id(); // 사용자
			int j = data.getBook_num(); // 아이템
			
			if(select)
				u[i][j] = (double)data.getReview_rating();
			else 
				u[i][j] = 1;
		}
		
		/*
		 * 유사도 행렬을 얻는다.
		 */
		double[][] s = new double[NUM_BOOKS + 1][NUM_BOOKS + 1];
		
		for (int j = 1; j <= NUM_BOOKS; j++) {
			for (int k = 1; k <= NUM_BOOKS; k++) {
				s[j][k] = cosine(u, j, k, NUM_USERS);
			}
		}
		
		// 유사도 정렬
		Item itemBought = new Item(bought, s, u, NUM_USERS);
		
		Set<Item> set1 = new TreeSet<>(itemBought.new SimilarityComparator());
		for (int j = 1; j <= NUM_BOOKS; j++) {
			if (u[user_id][j] == 0) {
				set1.add(new Item(j));
			}
		}
		
		// 인기도 정렬
		Set<Item> set2 = new TreeSet<>(itemBought.new PopularityComparator());
		int count1 = 0;
		for (Item item : set1) {
			set2.add(item);
			if(++count1 == num + 1) {
				break;
			}
		}
		
		List<Integer> list = new ArrayList<>();
		// 출력
		int count2 = 0;
		for (Item item : set2) {
//			System.out.printf("  %d", item.index);
			list.add(item.index);
			if (++count2 == num) {
				break;
			}
		}
//		System.out.println();
		
		return list;
	}

	@Override
	public Integer userIdProcess(String user_name) {
		
		return dao.getUserId(user_name);
	}

	@Override
	public Integer recentPurchaseProcess(Integer user_id) {
				
		return dao.getRecentPurchase(user_id);
	}
	
} // end class
