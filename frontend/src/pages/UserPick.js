import '../css/userpick.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/esm/Table';
import { baseUrl } from '../components/commonApi/mainApi';
import CategoryName from '../components/Shared/CategoryName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useCart } from 'react-use-cart';
import Pagination from '../components/Shared/Pagination';

const UserPick = () => {
  const [book, setbook] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const userName = localStorage.getItem('username');
  const nickname = localStorage.getItem('nickname');

  const { addItem } = useCart();

  async function getBook() {
    await axios
      .get(baseUrl + '/index/userPick', {
        params: {
          user_name: userName,
        },
      })
      .then((response) => {
        setbook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getBook();
  }, []);

  // 날짜형식 "YYYYMMDD" 에서 문자열 형식으로 변환
  function formatDate(dateString) {
    const year = dateString.substr(0, 4);
    const month = dateString.substr(4, 2);
    const day = dateString.substr(6, 2);
    return year + '년 ' + month + '월 ' + day + '일';
  }

  return (
    <div className='userpick-Wrap container-fluid columns-row col-xl-12 col-lg-12'>
      <div className='userpick-title mt-3'>
        <p>{nickname}님과 비슷한 취향의 고객님이 선택한 책들</p>
      </div>

      <div className='set_pages'>
        <label>
          페이지 당 표시할 게시물 수&nbsp;&nbsp;:&nbsp;&nbsp;
          <select
            type='number'
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
          </select>
        </label>
      </div>
      <div className='row'>
        <div className='card' id='userpick-card'>
          <table className='pick-table-header mt-2' id='booklist-title'>
            <thead>
              {/* 테이블 헤드 */}
              <tr>
                <th scope='col' className='userpick-category'>
                  카테고리
                </th>
                <th scope='col' className='userpick-table-title'>
                  제목
                </th>
                <th scope='col' className='userpick-author'>
                  저자
                </th>
                <th scope='col' className='userpick-publisher'>
                  출판사
                </th>
                <th scope='col' className='userpick-image'>
                  표지
                </th>
                <th scope='col' className='userpick-price'>
                  가격
                </th>
                <th scope='col' className='userpick-pubdate'>
                  출판일
                </th>
                <th scope='col' className='userpick-cart'></th>
              </tr>
            </thead>
          </table>

          {book.slice(offset, offset + limit).map((book) => {
            const bPrice = book.book_price.toLocaleString('ko-KR');
            const bDiscountedPrice = (book.book_price * 0.9).toLocaleString(
              'ko-KR'
            );

            // 카트넣기
            const onSubmit = () => {
              const item = {
                id: book.book_num,
                title: book.book_title,
                code: book.category_code,
                image: book.book_image,
                author: book.book_author,
                oPrice: book.book_price,
                price: bPrice,
                dprice: bDiscountedPrice,
                pdate: formatDate(book.book_pubdate),
                publisher: book.book_publisher,
              };
              addItem(item);
            };

            return (
              <div key={book.book_num}>
                <Table className='pick-data'>
                  <tbody>
                    <tr>
                      <td className='userpick-category'>
                        <p id='userpick-detail-category'>
                          <CategoryName categoryCode={book.category_code} />
                        </p>
                      </td>
                      <td className='userpick-table-title'>
                        {book.book_title}
                      </td>
                      <td className='userpick-author'>{book.book_author}</td>
                      <td className='userpick-publisher'>
                        {book.book_publisher}
                      </td>
                      <td className='userpick-image'>
                        <a href={'/book/' + book.book_num}>
                          <img src={book.book_image} />
                        </a>
                      </td>
                      <td className='userpick-price'>
                        {bPrice}원 &nbsp;
                        <FontAwesomeIcon icon={faArrowRight} />
                        &nbsp;
                        {bDiscountedPrice}원
                      </td>
                      <td className='userpick-pubdate'>
                        {book.book_pubdate && formatDate(book.book_pubdate)}
                      </td>
                      <td className='userpick-cart'>
                        <button
                          className='btn btn-secondary'
                          id={'userpick-' + book.book_num}
                          onClick={onSubmit}
                        >
                          장바구니
                        </button>
                        <a href='/cart'>
                          <button
                            className='btn btn-search'
                            id={'userpick-' + book.book_num}
                            onClick={onSubmit}
                          >
                            바로구매
                          </button>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            );
          })}
        </div>
        <footer>
          <Pagination
            total={book.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </div>
    </div>
  );
};
export default UserPick;
