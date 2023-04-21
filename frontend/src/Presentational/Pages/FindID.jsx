import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authActions } from "../../redux/reducer/authReducer";
import jwtDecode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const FindID = () => {
  const dispatch = useDispatch();
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit =  (data) => {
    dispatch(authActions.FindID({data}));
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
          <div className="login"><h1>아이디 찾기</h1></div>
          <Form.Group>
            <Form.Label htmlFor="name"> 이름</Form.Label>
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
                  value: /^[가-힣a-zA-Z]+$/,
                  message: "한글, 영어만 사용 가능합니다.",
                },
                
                
              })}
            />
            {errors.name && <small role="alert">{errors.name.message}</small>}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="phonenumber" className="mt-3">
              전화번호
            </Form.Label>
            
            <Form.Control
              id="phonenumber"
              type="text"
              placeholder="Enter your Phone-Number"
              aria-invalid={!isDirty ? undefined : errors.phonenumber ? "true" : "false"}
              {...register("phonenumber", {
                required: "전화번호는 필수 입력입니다.",
                pattern: {
                    value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
                    message: "알맞은 전화번호 형태를 입력해주세요 EX) 010-9994-2223",
                  },
                 minLength: {
                   value:  13,
                   message: "알맞은 전화번호 형태를 입력해주세요. EX) 010-9994-2223",
                },
              })}
            />
            {errors.phonenumber && <small role="alert">{errors.phonenumber.message}</small>}
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

export default FindID;
