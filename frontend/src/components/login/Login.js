import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../commonApi/mainApi';

//import { useNavigate } from "react-router-dom";

const Login = () => {
  // // 네이버 로그인
  // const { naver } = window;
  // const location = useLocation();
  // const NAVER_CALLBACK_URL = 'http://localhost:3000';
  // const NAVER_CLIENT_ID = 'JF2FSSw35EeARO3tcAS1';

  // // 네이버 로그인, 버튼 구현
  // const initializeNaverLogin = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: NAVER_CLIENT_ID,
  //     callbackUrl: NAVER_CALLBACK_URL,
  //     isPopup: false, // 팝업창으로 띄울지, 새 페이지로 띄울지
  //     loginButton: { color: 'green', type: 3, height: '50' },
  //   });

  //   naverLogin.init();
  // };

  // const getNaverToken = () => {
  //   if (!location.hash) return;
  //   const token = location.hash.split('=')[1].split('&')[0];
  //   console.log(token);
  // };

  // useEffect(() => {
  //   initializeNaverLogin();
  //   getNaverToken();
  //   console.log('init');
  // }, []);

  // 자체로그인
  // const navigate = useNavigate();
  const [user_name, setUsername] = useState('');
  const [user_pwd, setPassword] = useState('');
  const username = localStorage.getItem('username');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /* 엔터키 입력으로 로그인하기 */
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  const onSubmit = async (e) => {
    if (!user_name) {
      e.preventDefault();
      return Swal.fire({ text: '아이디를 입력해주세요', width: 400 });
    } else if (!user_pwd) {
      e.preventDefault();
      return Swal.fire({ text: '비밀번호를 입력해주세요', width: 400 });
    }
    e.preventDefault();
    await axios
      .post(
        `${baseUrl}/login`,
        {
          user_name: user_name,
          user_pwd: user_pwd,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        // console.log("response:", response.data);

        console.log(response.headers);
        console.log(response.data);

        // 값을 받을때는 소문자
        let jwtToken = response.headers['authorization'];
        console.log(response.headers.get('Authorization'));
        console.log(response.headers['Access-Control-Allow-Credentials']);
        // let jwtToken = response.headers.get("Authorization");

        let jwtUsername = response.data.username;
        let jwtUsernickname = response.data.usernickname;
        let jwtUserid = response.data.userid;
        console.log('jwtToken', jwtToken);
        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('username', jwtUsername);
        localStorage.setItem('usernickname', jwtUsernickname);
        localStorage.setItem('userid', jwtUserid);

        setUsername('');
        setPassword('');
      })
      .then((response) => {
        // navigate("/");
        e.preventDefault();
        Swal.fire({
          text: `${localStorage.getItem('username')} 님 환영합니다`,
        });
        e.preventDefault();
        window.location.replace('/');
      })
      .catch((err) => {
        console.error(err.message);
        Swal.fire({
          text: '아이디와 비밀번호를 확인해주세요',
          width: '500',
        });
      });
  };

  return (
    <div className='container login-wrap'>
      <div className=''>
        <p>로그인</p>
        <form>
          <div className='form-group mt-5'>
            <input
              type='text'
              name='user_name'
              className='form-control'
              id='user_name'
              placeholder='아이디'
              maxLength='20'
              onChange={handleUsernameChange}
            />
          </div>
          <div className='form-group mt-2'>
            <input
              type='password'
              className='form-control'
              name='user_pwd'
              id='user_pwd'
              placeholder='비밀번호'
              maxLength='20'
              onChange={handlePasswordChange}
              onKeyPress={onKeyPress}
              autoComplete='off'
            />
          </div>
          <div className='login-btns'>
            <p>
              <button
                type='submit'
                className='btn btn-search btn-login'
                onClick={onSubmit}
              >
                로그인
              </button>
              <Link className='btn btn-search btn-register' to='/register'>
                회원가입
              </Link>
            </p>
          </div>

          <div className='grid-naver' id='naverIdLogin'></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
