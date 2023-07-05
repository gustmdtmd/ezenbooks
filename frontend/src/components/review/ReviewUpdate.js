import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import { baseUrl } from '../commonApi/mainApi';

const ARRAY = [0, 1, 2, 3, 4];

const ReviewUpdate = () => {
  const [inputs, setInputs] = useState('');
  const navigator = useNavigate();
  const location = useLocation();
  const [star, setStar] = useState(0);

  const updateReview = async () => {
    const form = new FormData();
    form.append('review_num', location.state.num);
    form.append('user_id', location.state.id);
    form.append('book_num', location.state.book_num);
    form.append('review_content', inputs);
    form.append('review_rating', star);
    form.append('review_writer', location.state.writer);

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    await axios
      .put(baseUrl + '/review/update', form, config)
      .then((response) => {
        setInputs('');
      });
    navigator(`/book/${location.state.book_num}`);
  };

  const handleValueChange = (e) => {
    //리뷰 400자 초과 안되게 자동 자름
    let review = e.target.value;
    let lengthCheckEx = /^.{400,}$/;
    if (lengthCheckEx.test(review)) {
      //400자 초과 컷
      review.value = review.value.substr(0, 400);
    }

    setInputs(e.target.value);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  // 별점
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    setStar(index + 1);
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };

  return (
    <>
      <div>
        <h3>리뷰 수정</h3>
        <hr />
      </div>
      <div>
        <Wrap>
          <RatingText>
            <div className='star_avg'>
              <span className='average'> {location.state.rating}.0 </span>
            </div>
          </RatingText>
          <Stars>
            {ARRAY.map((el, idx) => {
              return (
                <FaStar
                  key={idx}
                  size='50'
                  onClick={() => handleStarClick(el)}
                  className={clicked[el] && 'yellowStar'}
                />
              );
            })}
          </Stars>
        </Wrap>
        <textarea
          rows='4'
          cols='100'
          onChange={handleValueChange}
          defaultValue={location.state.content}
        />
      </div>
      <button onClick={updateReview} value={inputs}>
        수정
      </button>
      <button onClick={handleBack}>취소</button>
    </>
  );
};

export default ReviewUpdate;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 20px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
