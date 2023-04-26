package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.UserJoinDto;
import com.ssafy.wonik.domain.dto.UserLoginDto;

public interface UserService {

    void signup(UserJoinDto userJoinDto);

    String login(UserLoginDto userLoginDto);

//    String findEmail()
}

