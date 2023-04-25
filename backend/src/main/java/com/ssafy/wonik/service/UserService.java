package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.UserJoinDto;
import com.ssafy.wonik.domain.dto.UserLoginDto;

public interface UserService {

    void sighup(UserJoinDto userJoinDto);

    String login(UserLoginDto userLoginDto);
}

