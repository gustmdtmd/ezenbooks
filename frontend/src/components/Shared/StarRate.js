import styled from 'styled-components';
import { useState, useEffect } from 'react';
import '../../css/starrate.css';

{
  /* AVR_RATE 에 별점값을 넣어줘야함 */
}
function StarRate({ review }) {
  const [rating, setRating] = useState(0);

  // 평점 계산
  useEffect(() => {
    const arr = [];
    for (var ele of review) {
      arr.push(ele.review_rating);
    }

    let sum = 0;
    arr.forEach((item) => {
      sum += item;
    });

    if (sum !== 0) {
      let avg = (sum / review.length).toFixed(1);
      setRating(avg);
    } else {
      setRating(0);
    }
  });

  // 별점 채우기
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    setRatesResArr(calcStarRates(rating));
  }, [rating]);

  const calcStarRates = (rating) => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (rating * 70) / 5;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };

  return (
    <>
      <div className='star_avg container d-flex'>
        <div className='average'>평점 : </div>
        <div className='star-rating'>{rating}</div>
        <div>
          <StarRateWrap>
            {STAR_IDX_ARR.map((item, idx) => {
              return (
                <span className='star_icon' key={`${item}_${idx}`}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    viewBox='0 0 14 13'
                    fill='gray'
                  >
                    <clipPath id={`${item}StarClip`}>
                      <rect width={`${ratesResArr[idx]}`} height='39' />
                    </clipPath>
                    <path
                      id={`${item}Star`}
                      d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                      transform='translate(-2 -2)'
                    />
                    <use
                      clipPath={`url(#${item}StarClip)`}
                      href={`#${item}Star`}
                      fill='#FCC419'
                    />
                  </svg>
                </span>
              );
            })}
          </StarRateWrap>
        </div>
      </div>
    </>
  );
}

export default StarRate;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top : -2px;
  font-size: 20px;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
`;
