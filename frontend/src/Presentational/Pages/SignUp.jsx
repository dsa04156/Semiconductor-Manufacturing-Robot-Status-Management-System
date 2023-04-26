import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import jwtDecode from "jwt-decode";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import api from '../../redux/api'

const SignUp = () => {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();



  const onSubmit = async (data) => {
    api.post('USER', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };



  if (!isMounted) {
    return null;
  }
  return (
    <Row className="g-0">
      <Col>
        <div className="middle">
          <div className="logo">WPHM</div>
        </div>
      </Col>
      <Col>
        <div className="signup_back">
          <Form>
            <div className="login">회원가입</div>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">아이디</Form.Label>
              <Form.Control
                autoFocus={true}
                htmlSize={50}
                id="email"
                type="text"
                placeholder="balamia@wonik.co.kr"
                aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
              id="password"
              type="password"
              placeholder="********"
              aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요.",
                },
              })}
            />
            {errors.password && <small role="alert">{errors.password.message}</small>}
          
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                placeholder="verify password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control type="password" className="form-control" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>전화번호</Form.Label>
              <Form.Control type="password" className="form-control" placeholder="Enter phone number" />
            </Form.Group>
            <div className=" d-grid gap-2 mt-4">
              <Button size="lg" type="submit" disabled={isSubmitting} className="button">
                회원가입
              </Button>
              <Link to="/" className="btn">
                취소
              </Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
