import React from 'react';
import '../../css/cart.css';
import '../../css/bootstrap.min.css';
import {
  faArrowRight,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import StarRate from '../Shared/StarRate';
import { useCart } from 'react-use-cart';
import CartEmpty from '../../routes/CartEmpty';
import Swal from 'sweetalert2';
import CategoryName from '../Shared/CategoryName';
import { baseUrl } from '../commonApi/mainApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items } = useCart();
  const { emptyCart, updateItemQuantity } = useCart();
  let cartTotal = 0;

  const empty = () => {
    emptyCart();
    cartTotal = 0;
    console.log('cart is empty / cartTotal : ' + cartTotal);
  };

  const navigator = useNavigate();

  if (items.length === 0) {
    return <CartEmpty />;
  }

  const cart = JSON.parse(localStorage.getItem('react-use-cart')).items;

  var title = cart.map((elem) => {
    return elem.title;
  });

  //로그인 여부 확인
  const handleCartClick = async (e) => {
    if (localStorage.getItem('username') === null) {
      Swal.fire({ text: '로그인 후 이용해주세요', width: 400 });
      e.preventDefault();
    } else {
      e.preventDefault();

      const formData = new FormData();
      formData.append('itemName', title);
      formData.append('username', localStorage.getItem('username'));
      formData.append('price', localStorage.getItem('cartTotal'));
      console.log(title);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      await axios
        .post(`${baseUrl}/order`, formData, config)
        .then((response) => {
          localStorage.setItem('id', response.data);
          localStorage.setItem('itemName', title);

          navigator(`/order`);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  return (
    <div className='cartpage-wrap container-fluid d-flex'>
      {
        ///////////반복 아이템
      }
      <div className='cart-wrap colums-row container-fluid mt-3 '>
        <p className='cart-title'>장바구니</p>
        {items.map((book, index) => {
          const itemNo = 'itemNo-' + index;
          const bookPage = '/book/' + book.id;
          cartTotal = cartTotal + book.oPrice * book.quantity;
          console.log(cartTotal);
          localStorage.setItem('cartTotal', cartTotal * 0.9);
          return (
            <div className='cart-item d-flex' id={itemNo} key={book.id}>
              <div className='cart-book-img col-2'>
                <a href={bookPage}>
                  <img src={book.image} alt='book-img'></img>
                </a>
              </div>
              <div className='book-details col-8 colums-row'>
                <div className='book-title d-flex mt-2'>
                  <p id='book-title-name'>{book.title}</p>
                </div>
                <div className='book-writer d-flex'>
                  <p id='book-detail-category'>
                    <CategoryName categoryCode={book.category_code} />
                  </p>
                  <p id='book-writer-name'>{book.author}</p>
                  <p> &nbsp;|&nbsp; </p>
                  <p id='book-publisher'>{book.publisher}</p>
                  <p> &nbsp;|&nbsp; </p>
                  <p id='book-publishing-date'>{book.pdate}</p>
                </div>
                <div className='book-price d-flex mt-4' id='cp-bp'>
                  <p id='book-original-price'>{book.price}원</p>
                  <p>
                    &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                    &nbsp;
                  </p>
                  <p id='book-discounted-price'>{book.dprice}원</p>
                  <p id='book-discounted-percent'>&nbsp;(10%)</p>
                </div>
                {/* <div className='rating'>
                  <StarRate />
                </div> */}
              </div>
              <div className='book-quantity-wrap col-2 container d-flex'>
                <div className='book-quantity-body container-fluid p-0 d-flex'>
                  <button
                    className='btn btn-search btn-cart-search'
                    onClick={() =>
                      updateItemQuantity(book.id, book.quantity + 1)
                    }
                    id='num_plus'
                  >
                    <p>
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </p>
                  </button>
                  <p id='buying-book-quantity'>{book.quantity}</p>

                  <button
                    className='btn btn-search btn-cart-search'
                    onClick={() =>
                      updateItemQuantity(book.id, book.quantity - 1)
                    }
                    id='num_minus'
                  >
                    <p>
                      <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>{' '}
                    </p>
                  </button>

                  {/* <button
                    className='btn btn-search btn-cart-search'
                    // onClick={delete}
                    id='num_delete'
                  >
                    <p>
                      <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                    </p>
                  </button> */}
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div className='cart-sum card conainer colums-row col-xl-2 col-lg-2'>
        <div className='cart-sum-wrap'>
          <div className='cart-sum-price d-flex'>
            <p className='title'>상품금액 : </p>
            <p className='price'>{(cartTotal * 0.9).toLocaleString()}원 </p>
          </div>
          <div className='cart-sum-shipping d-flex'>
            <p className='title'>배 송 비 : </p>
            <p className='price'> 0원 </p>
          </div>
          <hr />
          <div className='cart-total-price d-flex'>
            <p className='title'>결제금액 : </p>
            <p className='price'>{(cartTotal * 0.9).toLocaleString()}원 </p>
          </div>
          <div className='cart-order'>
            <button className='btn btn-search btn-cart-reset' onClick={empty}>
              비우기
            </button>
            <a href='/order'>
              <button
                className='btn btn-search btn-cart-order'
                onClick={handleCartClick}
              >
                주문하기
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
