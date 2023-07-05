import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../commonApi/mainApi';
import '../../css/login.css';

//회원가입
const Register = () => {
  const navigator = useNavigate();

  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const [member, setMember] = useState({
    user_name: '',
    user_pwd: '',
    user_confirmpwd: '',
    user_nickname: '',
    user_email: '',
    user_role: 'ROLE_MEMBER',
  });

  //오류메세지
  const errorMessage = {
    user_name:
      '사용자 ID는 5자 이상이어야 하며 문자 또는 숫자를 포함해야 합니다.',
    user_pwd:
      '최소 8자에 하나의 문자 및 하나의 숫자 및 하나의 특수 문자를 입력해주세요.',
    user_confirmpwd: '비밀번호가 일치하지 않습니다.',
    user_nickname:
      '최소 2자에 영어,한글,숫자 상관없이 10자 안으로 입력해주세요.',
    user_email: '이메일 형식에 맞게 작성해주세요.',
    user_role: 'ROLE_MEMBER',
  };

  //유효성 검사
  const [effect, setEffect] = useState({
    user_name: false,
    user_pwd: false,
    user_confirmpwd: false,
    user_nickname: false,
    user_email: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      effect.user_name &&
      effect.user_nickname &&
      effect.user_email &&
      effect.user_pwd &&
      effect.user_confirmpwd
    ) {
      Swal.fire({ text: '가입완료', width: 400 });
      await axios
        .post(`${baseUrl}/register`, member, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          console.log(response.data);
          setMember({
            user_name: '',
            user_pwd: '',
            user_confirmpwd: '',
            user_nickname: '',
            user_email: '',
            user_role: 'ROLE_MEMBER',
          });
        })
        .then((response) => {
          navigator('/');
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      Swal.fire({
        text: '입력한 정보를 확인하세요!',
        width: '500',
      });
      return false;
    }
  };

  // 정규식

  // 아이디 체크
  // 사용자 ID는 5자 이상이어야 하며 문자 또는 숫자를 포함해야 합니다.
  const validChk = (target, data) => {
    if (target !== 'submit' && target === 'user_name') {
      const idRegExp = /^[A-Za-z0-9+]{5,}$/;
      if (!idRegExp.test(member.user_name)) {
        setEffect({ ...effect, user_name: false });
        document.getElementById('idMsg').innerHTML =
          "<span style='color: red;'>사용자 ID는 5자 이상이어야 하며 문자 또는 숫자를 포함해야 합니다.</span>";
        return { valid: false, where: 'user_name' };
      } else {
        if (data === 0) {
          setEffect({ ...effect, user_name: true });
          document.getElementById('idMsg').innerHTML =
            "<span style='color: green;'>사용가능한 아이디입니다.</span>";
          console.log(effect);
        } else {
          setEffect({ ...effect, user_name: false });
          document.getElementById('idMsg').innerHTML =
            "<span style='color: red;'>중복된 아이디입니다.</span>";
        }
      }
    }

    // 비밀번호 체크
    // 최소 8자에 하나의 문자 및 하나의 숫자 및 하나의 특수 문자 포함된 비밀번호인지
    if (target !== 'submit' && target === 'user_pwd') {
      const pwdRegExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
      if (!pwdRegExp.test(member.user_pwd)) {
        setEffect({ ...effect, user_pwd: false });
        return { valid: false, where: 'user_pwd' };
      } else {
        setEffect({ ...effect, user_pwd: true });
      }
    }

    // 비밀번호 확인
    if (target !== 'submit' && target === 'user_confirmpwd') {
      if (member.user_pwd !== member.user_confirmpwd) {
        setEffect({ ...effect, user_confirmpwd: false });
        return { valid: false, where: 'user_comfirmpwd' };
      } else {
        setEffect({ ...effect, user_confirmpwd: true });
      }
    }

    // 닉네임 확인
    if (target !== 'submit' && target === 'user_nickname') {
      const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
      if (!nicknameRegExp.test(member.user_nickname)) {
        setEffect({ ...effect, user_nickname: false });
        document.getElementById('nicknameMsg').innerHTML =
          "<span style='color: red;'> 최소 2자에 영어,한글,숫자 상관없이 7자 안으로 입력해주세요.</span>";
        return { valid: false, where: 'user_nickname' };
      } else {
        if (data === 0) {
          setEffect({ ...effect, user_nickname: true });
          document.getElementById('nicknameMsg').innerHTML =
            "<span style='color: green;'>사용가능한 닉네임입니다.</span>";
        } else {
          setEffect({ ...effect, user_nickname: false });
          document.getElementById('nicknameMsg').innerHTML =
            "<span style='color: red;'>이미 사용중인 닉네임입니다.</span>";
        }
      }
    }

    // 이메일 확인
    if (target !== 'submit' && target === 'user_email') {
      const emailRegExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegExp.test(member.user_email)) {
        setEffect({ ...effect, user_email: false });
        document.getElementById('emailMsg').innerHTML =
          "<span style='color: red;'>이메일 형식에 맞게 작성해주세요.</span>";
        return { valid: false, where: 'user_email' };
      } else {
        if (data === 0) {
          setEffect({ ...effect, user_email: true });
          document.getElementById('emailMsg').innerHTML =
            "<span style='color: green;'>사용가능한 이메일입니다.</span>";
        } else {
          setEffect({ ...effect, user_email: false });
          document.getElementById('emailMsg').innerHTML =
            "<span style='color: red;'>이미 사용중인 이메일입니다.</span>";
        }
      }
    }

    return true;
  };

  const handleValueChange = (e) => {
    member[e.target.name] = e.target.value;
    validChk(e.target.name);
  };

  const nameValueChange = async (e) => {
    member[e.target.name] = e.target.value;

    await axios
      .post(baseUrl + '/idChk', member, config)
      .then((response) => {
        validChk(e.target.name, response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const nicknameValueChange = async (e) => {
    member[e.target.name] = e.target.value;

    await axios
      .post(baseUrl + '/nicknameChk', member, config)
      .then((response) => {
        validChk(e.target.name, response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const emailValueChange = async (e) => {
    member[e.target.name] = e.target.value;

    await axios
      .post(baseUrl + '/emailChk', member, config)
      .then((response) => {
        validChk(e.target.name, response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className='container register-wrap'>
      <p id='register-title'>회원가입</p>
      <form onSubmit={onSubmit}>
        <div className='container register-body'>
          <div className='form-group'>
            <label>아이디</label>
            <br />
            <input
              maxLength={15}
              id='id'
              type='text'
              className='form-control'
              name='user_name'
              placeholder='Username'
              onChange={nameValueChange}
            />
            <span id='idMsg'></span>
          </div>

          <div className='form-group'>
            <label>비밀번호</label>
            <br />
            <input
              maxLength={20}
              type='password'
              className='form-control'
              name='user_pwd'
              placeholder='Password'
              onChange={handleValueChange}
              autoComplete='off'
            />
            {/* 유효성체크 */}
            {effect.user_pwd ? (
              <span id='idMsg' style={{ color: 'green' }}>
                사용가능한 비밀번호 입니다.
              </span>
            ) : (
              <span id='idMsg' style={{ color: 'red' }}>
                {/* {message.username} */}
              </span>
            )}

            {!effect.user_pwd && member.user_pwd.length > 0 && (
              <span id='idMsg' style={{ color: 'red' }}>
                {errorMessage.user_pwd}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label>비밀번호 확인</label>
            <br />
            <input
              maxLength={20}
              value={member.user_confirmpwd}
              type='password'
              className='form-control'
              name='user_confirmpwd'
              placeholder='ConfirmPassword'
              onChange={handleValueChange}
              autoComplete='off'
            />
            {effect.user_confirmpwd ? (
              <span id='idMsg' style={{ color: 'green' }}>
                비밀번호가 일치합니다.
              </span>
            ) : (
              <span id='idMsg' style={{ color: 'red' }}>
                {/* {message.passwordConfirm} */}
              </span>
            )}

            {!effect.user_confirmpwd && member.user_confirmpwd.length > 0 && (
              <span id='idMsg' style={{ color: 'red' }}>
                {errorMessage.user_confirmpwd}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label>닉네임</label>
            <br />
            <input
              maxLength={20}
              type='text'
              className='form-control'
              name='user_nickname'
              placeholder='nickname'
              onChange={nicknameValueChange}
            />
            <span id='nicknameMsg'></span>
          </div>

          <div className='form-group'>
            <label>이메일</label>
            <input
              maxLength={50}
              type='email'
              className='form-control'
              name='user_email'
              placeholder='Email'
              onChange={emailValueChange}
            />
            <span id='emailMsg'></span>
          </div>
          {/* <hr className='my-3' /> */}
          <div className='form-group'>
            {/* <div
              className='form-check form-check-inline  form-group'
              onChange={handleValueChange}
            > */}
            {/* <label className='mx-5'>
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
              </label> */}
            {/* <label className='mx-5'>
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
            </div> */}
          </div>
          <p className='register-signup'>
            <button
              type='submit'
              className='btn btn-search btn-signup'
              onClick={onSubmit}
            >
              가입 하기
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
