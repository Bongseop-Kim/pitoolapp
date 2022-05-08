import useInput from '../../hooks/useInput';
import {
  Button,
  Error,
  Form,
  Header,
  Input,
  Label,
  LinkContainer,
} from '../SignUp/styles';
import React, { useCallback, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from 'firebase/auth';
import { authService } from '../../fbbase';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onSocialClick = useCallback(async () => {
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        return signInWithRedirect(auth, provider);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, []);

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      setLogInError(false);
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    [email, password],
  );

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true);
        const uid = user.uid;
        // 아이디 정보
        navigate('/workspace');
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div id="container">
      <Header>PITOOL</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {logInError && (
            <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>
          )}
        </Label>
        <Button type="submit">로그인</Button>
        <Button onClick={onSocialClick} name="google">
          구글 로그인
        </Button>
      </Form>

      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
