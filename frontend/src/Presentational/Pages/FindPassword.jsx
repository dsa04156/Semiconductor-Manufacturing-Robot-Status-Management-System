import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authActions } from "../../redux/reducer/authReducer";
import jwtDecode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const FindPassword = () => {
  const dispatch = useDispatch();
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit =  (data) => {
    dispatch(authActions.FindPassword({data}));
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
    <div className="middle">
      <div className="logo">WPHM</div>

      <div className="login_back">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="login"><h1>비밀번호 찾기</h1></div>
          <Form.Group>
            <Form.Label htmlFor="name"> 아이디</Form.Label>
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
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="name" className="mt-3">
              이름
            </Form.Label>
            
            <Form.Control
              autoFocus={true}
              htmlSize={50}
              id="name"
              type="text"
              placeholder="Enter your Name"
              
              aria-invalid={!isDirty ? undefined : errors.name ? "true" : "false"}
              {...register("name", {
                required: "이름은 필수 입력입니다.",
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]+$/,
                  message: "한글, 영어만 사용 가능합니다.",
                },
              })}
            />
            {errors.name && <small role="alert">{errors.name.message}</small>}
          </Form.Group>
          <div className=" d-grid gap-2 mt-4">
            <Button size="lg" type="submit" disabled={isSubmitting} className="button">
            다음
            </Button>
            <Link to="/" className="btn">
              취소
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FindPassword;
