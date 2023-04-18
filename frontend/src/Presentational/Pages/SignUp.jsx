import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authActions } from "../../redux/reducer/authReducer";
import jwtDecode from "jwt-decode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(authActions.logIn());
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  if (!isMounted) {
    return null;
  }
  return (
    <Row className="g-0">
      <Col>
        <div className="middle"></div>
      </Col>
      <Col>
        <div className="signup_back">
          <form>
            <h3>회원가입</h3>
            <div className="mb-3">
              <label>아이디</label>
              <input type="text" className="form-control" placeholder="First name" />
            </div>
            <div className="mb-3">
              <label>비밀번호</label>
              <input type="text" className="form-control" placeholder="Last name" />
            </div>
            <div className="mb-3">
              <label>비밀번호 확인</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label>이름</label>
              <input type="password" className="form-control" placeholder="Enter password" />
            </div>
            <div className="mb-3">
              <label>전화번호</label>
              <input type="password" className="form-control" placeholder="Enter password" />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                회원가입
              </button>
              <button type="submit" className="mt-1 btn btn-primary">
                취소
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/">sign in?</a>
            </p>
          </form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
