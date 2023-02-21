import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../components/commonApi/mainApi";

//회원가입
const RegisterPage = () => {
  const navigator = useNavigate();

  const [member, setMember] = useState({
    user_name: "",
    user_pwd: "",
    user_nickname: "",
    user_email: "",
    user_role: "ROLE_MEMBER",
    user_profile: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${baseUrl}/registerPage`, member, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setMember({
          user_name: "",
          user_pwd: "",
          user_email: "",
          user_role: "ROLE_MEMBER",
          user_profile: "",
        });
      })
      .then((response) => {
        navigator("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleValueChange = (e) => {
    // radio 버튼에서는 e.preventDefault()를 하면 더블클릭을 해줘야한다.
    // e.preventDefault();
    setMember({ ...member, [e.target.name]: e.target.value });
    const currentId = e.target.value;
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <h1>회원가입</h1>
          <div className='form-group mb-1'>
            <label>아이디</label>
            <br />
            <input
              type='text'
              className='form-control'
              name='user_name'
              placeholder='Username'
              onChange={handleValueChange}
            />
          </div>
          <div className='form-group mb-1'>
            <label>비밀번호</label>
            <br />
            <input
              type='password'
              className='form-control'
              name='user_pwd'
              placeholder='Password'
              onChange={handleValueChange}
              autoComplete='off'
            />
          </div>

          <div className='form-group mb-1'>
            <label>닉네임</label>
            <br />
            <input
              type='text'
              className='form-control'
              name='user_nickname'
              placeholder='nickname'
              onChange={handleValueChange}
            />
          </div>

          <div className='form-group mb-1'>
            <label>프로필</label>
            <br />
            <input
              type='text'
              className='form-control'
              name='user_profile'
              placeholder='profile'
              onChange={handleValueChange}
            />
          </div>

          <div className='form-group mb-1'>
            <label>이메일</label>
            <input
              type='email'
              className='form-control'
              name='user_email'
              placeholder='Email'
              onChange={handleValueChange}
            />
          </div>
          <hr className='my-3' />
          <div className='form-group mb-3 mb-1'>
            <div
              className='form-check form-check-inline  form-group'
              onChange={handleValueChange}
            >
              <label className='mx-5'>
                <input
                  type='radio'
                  name='authRole'
                  value='ROLE_ADMIN'
                  className='form-check-input'
                />
                관리자
              </label>
              <label className='mx-5'>
                <input
                  type='radio'
                  name='authRole'
                  value='ROLE_MANAGER'
                  className='form-check-input'
                />
                매니저
              </label>
              <label className='mx-5'>
                <input
                  type='radio'
                  name='authRole'
                  value='ROLE_MEMBER'
                  className='form-check-input'
                  //기본으로 사용
                  defaultChecked={true}
                />
                일반 사용자
              </label>
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
