import '../../css/category.css';
import '../../css/style.css';
import '../../css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../commonApi/mainApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination';
import { useCart } from 'react-use-cart';
import CategoryName from './CategoryName';

const MainListTemplate = (props) => {
  const [book, setbook] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const menu = baseUrl + '/' + props.menu;
  const { addItem } = useCart();

  useEffect(() => {
    getbook();
  }, []);

  async function getbook() {
    await axios
      .get(menu)
      .then((response) => {
        setbook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 날짜형식 "YYYYMMDD" 에서 문자열 형식으로 변환
  function formatDate(dateString) {
    const year = dateString.substr(0, 4);
    const month = dateString.substr(4, 2);
    const day = dateString.substr(6, 2);
    return year + '년 ' + month + '월 ' + day + '일';
  }

  return (
    <div className='container-fluid colums-low mt-3'>
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
      <div className='book-list-body colums-row mt-1'>
        {
          //////// 반복리스트
        }
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
            console.log(item);
          };

          return (
            <div key={book.book_num}>
              <div className='book-list-item d-flex'>
                <div className='book-img col-2'>
                  <a href={'/book/' + book.book_num}>
                    <img src={book.book_image} alt={book.book_title} />
                  </a>
                </div>
                <div className='book-details col-9 colums-row'>
                  <div className='book-title d-flex mt-1'>
                    <p id='book-title-name'>{book.book_title}</p>
                  </div>
                  <div className='book-writer d-flex'>
                    <p id='book-detail-category'>
                      <CategoryName categoryCode={book.category_code} />
                    </p>
                    <p> &nbsp;|&nbsp; </p>
                    <p id='book-writer-name'>{book.book_author}</p>
                    <p> &nbsp;|&nbsp; </p>
                    <p id='book-publisher'>{book.book_publisher}</p>
                    <p> &nbsp;|&nbsp; </p>
                    <p id='book-publishing-date'>
                      {book.book_pubdate && formatDate(book.book_pubdate)}
                    </p>
                  </div>
                  <div className='book-price d-flex mt-4'>
                    <p id='book-original-price'>{bPrice}원</p>
                    <p>
                      &nbsp;
                      <FontAwesomeIcon icon={faArrowRight} />
                      &nbsp;
                    </p>
                    <p id='book-discounted-price'>{bDiscountedPrice}원</p>
                    <p id='book-discounted-percent'>&nbsp;(10%)</p>
                  </div>
                  {/* <div className='rating'>
                    <StarRate />
                  </div> */}
                </div>
                <div className='book-cart col-2 colums-row'>
                  <div>
                    <button
                      className='btn btn-secondary'
                      id={'bookcart-' + book.book_num}
                      onClick={onSubmit}
                    >
                      장바구니
                    </button>
                  </div>
                  <div>
                    <a href='/cart'>
                      <button
                        className='btn btn-search'
                        id={'bookorder-' + book.book_num}
                        onClick={onSubmit}
                      >
                        바로구매
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
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
export default MainListTemplate;
