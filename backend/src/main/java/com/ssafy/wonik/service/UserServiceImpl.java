package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.UserJoinDto;
import com.ssafy.wonik.domain.dto.UserLoginDto;
import com.ssafy.wonik.domain.entity.User;
import com.ssafy.wonik.exception.AppException;
import com.ssafy.wonik.exception.ErrorCode;
import com.ssafy.wonik.repository.UserReposistory;
import com.ssafy.wonik.utils.JwtToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserReposistory userReposistory;

    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.token.secret")
    private String key;

    private Long expiredTimeMs = 1000 * 60 * 60l; //1시간

    @Override
    public void sighup(UserJoinDto userJoinDto) {
        // 중복 체크 (email)
        userReposistory.findByEmail(userJoinDto.getEmail())
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.USERNAME_DUPLICATE, userJoinDto.getEmail() + "는 이미있습니다");
                });

//        User user = User.builder()
//                .email(userJoinDto.getEmail())
//                .password(encoder.encode(userJoinDto.getPassword()))
//                .name(userJoinDto.getName())
//                .phone(userJoinDto.getPhone())
//                .type(4)
//                .build();

        User user = new User();
        user.setEmail(userJoinDto.getEmail());
        user.setPassword(encoder.encode(user.getPassword()));
        user.setName(userJoinDto.getName());
        user.setPhone(userJoinDto.getPhone());
        user.setType(4);
        userReposistory.save(user);
    }


    public String login(UserLoginDto userLoginDto) {
        // email 없음
        User user = userReposistory.findByEmail(userLoginDto.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_FOUND, "없는 email 입니다" ));
        // password 틀림
        if (!encoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_PASSWORD, "password 오류");
        }
        // Exception 안됐을시 토큰 발행
        String token = JwtToken.createToken(user.getEmail(), key, expiredTimeMs);


        return token;
    }
}
