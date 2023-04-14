import Image from "next/image";
import kakaoButton from "@public/images/kakaoButton.png"
import React, { useState } from "react";
import logo from "@public/images/logo.png";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authActions } from "@/redux/reducer/authReducer";
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'


const Login = () => {
  const dispatch = useDispatch();
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
  const MainLogo = logo;
  const kakao = kakaoButton;
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormData>()
  

  const onSubmit = handleSubmit(({ email, password }) => {
    fetch("https://j8c205.p.ssafy.io/api/member/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data ) => {
        if (data.status === 400) {
          alert(data.message)
        }
        else {
          console.log("Success:", data);
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken' , data.refreshToken)
          const data_ = jwtDecode(data.accessToken)

          dispatch(authActions.logIn({data:data_}))

          router.push("/");
        }
      })
      .catch((err) => {
        console.debug(err);
        console.log(err)
      });
    

  })

  return (
    <div className="animate-fade-up min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className=" w-96 ">
              <Image className="h-8 w-32" src={MainLogo} alt="" />
            </div>
            <div className=" divide-gray-200">
              <form action="" onSubmit={onSubmit} className="pt-8 pb-3 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "이메일을 입력해주세요.",
                      },
                    })}
                    autoComplete="off"
                    id="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "비밀번호를 입력해주세요.",
                      },
                    })}
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button className="bg-green-500 h-14 w-full text-white rounded-md px-2 py-1">Submit</button>
                </div>
              </form>
              <a href={KAKAO_AUTH_URI}>
                <Image className="" src={kakao} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;