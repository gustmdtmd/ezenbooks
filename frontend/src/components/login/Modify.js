import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { baseUrl } from "../commonApi/mainApi";

const Modify = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  useEffect(() => {
    getState();
  }, []);

  const getState = () => {
    console.log(location.state);
  };

  const [member, setMember] = useState({
    user_id: localStorage.getItem("userid"),
    user_pwd: "",
    user_nickname: "",
    user_email: "",
  });

  //유효성 검사
  const [effect, setEffect] = useState({
    user_pwd: false,
    user_nickname: false,
    user_email: false,
  });

  const validChk = (target, data) => {
    // 비밀번호 체크
    // 최소 8자에 하나의 문자 및 하나의 숫자 및 하나의 특수 문자 포함된 비밀번호인지
    if (target !== "submit" && target === "user_pwd") {
      const pwdRegExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
      if (!pwdRegExp.test(member.user_pwd)) {
        setEffect({ ...effect, user_pwd: false });
        document.getElementById("passwordMsg").innerHTML =
          "<span style='color: red;'> 최소 8자에 하나의 문자 및 하나의 숫자 및 하나의 특수 문자를 입력해주세요.</span>";
        return { valid: false, where: "user_pwd" };
      } else {
        setEffect({ ...effect, user_pwd: true });
        document.getElementById("passwordMsg").innerHTML =
          "<span style='color: green;'>사용가능합니다.</span>";
      }
    }

    // 비밀번호 확인
    if (target !== "submit" && target === "user_confirmpwd") {
      if (member.user_pwd !== member.user_confirmpwd) {
        setEffect({ ...effect, user_confirmpwd: false });
        document.getElementById("chkPwdMsg").innerHTML =
          "<span style='color: red;'>위의 비밀번호와 다릅니다.</span>";
        return { valid: false, where: "user_comfirmpwd" };
      } else {
        setEffect({ ...effect, user_confirmpwd: true });
        document.getElementById("chkPwdMsg").innerHTML =
          "<span style='color: green;'>위의 비밀번호와 같습니다.</span>";
      }
    }

    // 닉네임 확인
    if (target !== "submit" && target === "user_nickname") {
      const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
      if (!nicknameRegExp.test(member.user_nickname)) {
        setEffect({ ...effect, user_nickname: false });
        document.getElementById("nicknameMsg").innerHTML =
          "<span style='color: red;'> 최소 2자에 영어,한글,숫자 상관없이 7자 안으로 입력해주세요.</span>";
        return { valid: false, where: "user_nickname" };
      } else {
        if (data === 0) {
          setEffect({ ...effect, user_nickname: true });
          document.getElementById("nicknameMsg").innerHTML =
            "<span style='color: green;'>사용가능한 닉네임입니다.</span>";
        } else {
          setEffect({ ...effect, user_nickname: false });
          document.getElementById("nicknameMsg").innerHTML =
            "<span style='color: red;'>이미 사용중인 닉네임입니다.</span>";
        }
      }
    }

    // 이메일 확인
    if (target !== "submit" && target === "user_email") {
      const emailRegExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegExp.test(member.user_email)) {
        setEffect({ ...effect, user_email: false });
        document.getElementById("emailMsg").innerHTML =
          "<span style='color: red;'>이메일 형식에 맞게 작성해주세요.</span>";
        return { valid: false, where: "user_email" };
      } else {
        if (data === 0) {
          setEffect({ ...effect, user_email: true });
          document.getElementById("emailMsg").innerHTML =
            "<span style='color: green;'>사용가능한 이메일입니다.</span>";
        } else {
          setEffect({ ...effect, user_email: false });
          document.getElementById("emailMsg").innerHTML =
            "<span style='color: red;'>이미 사용중인 이메일입니다.</span>";
        }
      }
    }

    return true;
  };

  const onSubmit = async (e) => {
    const form = new FormData();
    form.append("user_id", parseInt(location.state.id));
    form.append("user_name", location.state.name);
    form.append("user_nickname", member.user_nickname);
    form.append("user_pwd", member.user_pwd);
    form.append("user_email", member.user_email);
    form.append("user_role", location.state.role);
    form.append("create_date", location.state.createdate);
    form.append("user_profile", "");

    e.preventDefault();
    if (effect.user_pwd && effect.user_nickname && effect.user_email) {
      Swal.fire({ text: "수정완료", width: 400 });
      await axios
        .put(baseUrl + "/user/update", form, config)
        .then((response) => {
          console.log(response.data);
          setMember({
            user_pwd: "",
            user_nickname: "",
            user_email: "",
          });
        })
        .then((response) => {
          navigator(`/mypage/${localStorage.getItem("username")}`);
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      Swal.fire({
        text: "입력한 정보를 확인하세요!",
        width: "500",
      });
      return false;
    }
  };

  const handleValueChange = (e) => {
    member[e.target.name] = e.target.value;
    validChk(e.target.name);
  };

  const nicknameValueChange = async (e) => {
    member[e.target.name] = e.target.value;
    console.log(e.target.value);
    await axios
      .post(baseUrl + "/nicknameChk", member, config)
      .then((response) => {
        console.log(response.data);
        validChk(e.target.name, response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const emailValueChange = async (e) => {
    member[e.target.name] = e.target.value;

    await axios
      .post(baseUrl + "/emailChk", member, config)
      .then((response) => {
        validChk(e.target.name, response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  return (
    <>
      <div className="container register-wrap">
        <p id="register-title">정보수정</p>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <div className="container register-body">
            <div className="form-group">
              <label>아이디</label>
              <br />
              {location.state.name}
              <span id="idMsg"></span>
            </div>

            <div className="form-group">
              <label>비밀번호</label>
              <br />
              <input
                maxLength={20}
                type="password"
                className="form-control"
                name="user_pwd"
                placeholder="Password"
                onChange={handleValueChange}
                autoComplete="off"
              />
              <span id="passwordMsg"></span>
            </div>

            <div className="form-group">
              <label>비밀번호 확인</label>
              <br />
              <input
                maxLength={20}
                value={member.user_confirmpwd}
                type="password"
                className="form-control"
                name="user_confirmpwd"
                placeholder="ConfirmPassword"
                onChange={handleValueChange}
                autoComplete="off"
              />
              <span id="chkPwdMsg"></span>
            </div>

            <div className="form-group">
              <label>닉네임</label>
              <br />
              <input
                maxLength={20}
                type="text"
                className="form-control"
                name="user_nickname"
                placeholder="nickname"
                onChange={nicknameValueChange}
              />
              <span id="nicknameMsg"></span>
            </div>

            <div className="form-group">
              <label>이메일</label>
              <input
                maxLength={50}
                type="email"
                className="form-control"
                name="user_email"
                placeholder="Email"
                onChange={emailValueChange}
              />
              <span id="emailMsg"></span>
            </div>

            <p className="register-signup">
              <button
                type="submit"
                className="btn btn-search btn-signup"
                onClick={onSubmit}
              >
                수정 하기
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Modify;
