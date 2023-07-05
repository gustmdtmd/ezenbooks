import "../../css/mypage.css";
import React from "react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "../commonApi/mainApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Mypage = () => {
  const [user, setUser] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl + "/user/" + username);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function userWithdraw(user_id) {
    // Swal.fire({
    //   text: '탈퇴하시겠습니까?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   showConfirmButton: false,
    //   cancelButtonText: '아니오',
    //   denyButtonText: '탈퇴',
    //   width: 400,
    // });

    await axios
      .delete(baseUrl + "/delete/" + user_id)
      .then((response) => {
        alert("탈퇴가 완료되었습니다.");
        localStorage.removeItem("Authorization");
        localStorage.removeItem("username");
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="mypage-wrapper container columns-low col-8">
      <div className="mypage-title">Mypage</div>
      <div className="mypage-username">ID : {user.user_name}</div>
      <div className="mypage-user-email">Email : {user.user_email}</div>
      <div className="mypage-user-nickname">
        Nickname : {user.user_nickname}
      </div>
      <div className="mypage-create-date">가입일 : {user.create_date}</div>
      <div className="mypage-create-date">
        <Link
          to={`/modify/${user.user_name}`}
          state={{
            id: user.user_id,
            name: user.user_name,
            pwd: user.user_password,
            email: user.user_email,
            nickname: user.user_nickname,
            profile: user.user_profile,
            role: user.user_role,
            createdate: user.create_date,
          }}
        >
          <button className="btn btn-search nickname-edit">수정하기</button>
        </Link>
        <button
          className="btn btn-search user-withdraw"
          onClick={() => userWithdraw(user.user_id)}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default Mypage;
