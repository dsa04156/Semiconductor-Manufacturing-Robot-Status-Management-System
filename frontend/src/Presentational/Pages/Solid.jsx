import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authActions } from "../../redux/reducer/authReducer";
import jwtDecode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Solid = () => {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = (data, boling) => {
    dispatch(authActions.Gobackhome({data}));
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
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="email"><h2>고객님의 정보와 일치하는 아이디</h2></Form.Label>
            <br></br><br></br><Form.Label htmlFor="email">wonikwhehdgur@wnk.kr</Form.Label>
            
                </Form.Group>

          <div className=" d-grid gap-2 mt-4">
            <Button size="lg" type="submit" disabled={isSubmitting} className="button">
            로그인하기
            </Button>
            <Link to="/FindPassword" className="btn">
              비밀번호 찾기
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Solid;
