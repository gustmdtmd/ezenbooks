import "../../css/bootstrap.min.css";
import "../../css/review.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { MDBBtn, MDBCollapse } from "mdb-react-ui-kit";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { baseUrl } from "../commonApi/mainApi";
import StarRate from "../Shared/StarRate";
import Swal from "sweetalert2";

const Review = (props) => {
  const id = props.id;
  const book_num = parseInt(id);
  const [review, setReview] = useState([]);
  const [inputs, setInputs] = useState("");
  const [foldShow, setFoldShow] = useState(false);
  const toggleShow = () => setFoldShow(!foldShow);

  useEffect(() => {
    getReview(book_num);
  }, []);

  async function getReview(book_num) {
    await axios
      .get(baseUrl + "/review/" + book_num)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const insertReview = async (e) => {
    if (localStorage.getItem("userid")) {
      e.preventDefault();
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const form = new FormData();

      form.append("user_id", localStorage.getItem("userid"));
      form.append("book_num", id);
      form.append("review_content", inputs);
      form.append("review_rating", star);
      form.append("review_writer", localStorage.getItem("usernickname"));

      await axios
        .post(baseUrl + "/review", form, config)
        .then((response) => {
          console.log("post: " + response.data);
          getReview(book_num);
          setInputs("");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        text: "로그인 후 이용해주세요.",
        width: "500",
      });
      e.preventDefault();
    }
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    setInputs(e.target.value);
  };

  const deleteReview = async (review_num) => {
    await axios.delete(baseUrl + "/review/" + review_num).then((response) => {
      setReview(review.filter((reviews) => reviews.review_num !== review_num));
    });
  };

  // 별점
  const ARRAY = [0, 1, 2, 3, 4];
  const [star, setStar] = useState(0);
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
    <div className="review-body colmuns-row mt-2">
      <div className="review-list-title d-flex ">
        <p className="review-view-title">Review</p>
        <p>
          <StarRate review={review} />
        </p>
        <p className="review-write">
          <MDBBtn
            onClick={toggleShow}
            className="review-write-btn btn btn-search"
            id="btn-review-right"
          >
            작성
          </MDBBtn>
        </p>
      </div>
      <div className="review-write-form">
        <MDBCollapse show={foldShow}>
          <div className="container-fluid d-flex form-box">
            <div className="write-form-wrap col-11" id="bb">
              <form className="write-form" onSubmit={insertReview}>
                <Wrap>
                  <Stars>
                    {ARRAY.map((el, idx) => {
                      return (
                        <FaStar
                          key={idx}
                          size="30"
                          onClick={() => handleStarClick(el)}
                          className={clicked[el] && "yellowStar"}
                        />
                      );
                    })}
                  </Stars>
                </Wrap>
                <textarea
                  rows="4"
                  cols="100"
                  value={inputs}
                  onChange={handleValueChange}
                />
                <div className="col-1" id="cc">
                  <input
                    type="submit"
                    className="btn btn-search review-add"
                    value="등록"
                  />
                </div>
              </form>
            </div>
          </div>
        </MDBCollapse>
      </div>
      <hr />

      <div className="container-fluid columns-row">
        {review &&
          review.map((reviews) => {
            return (
              <ReviewList
                key={reviews.review_num}
                reviews={reviews}
                id={id}
                deleteReview={deleteReview}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Review;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
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
