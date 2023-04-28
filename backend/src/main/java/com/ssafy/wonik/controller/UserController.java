package com.ssafy.wonik.controller;

import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
@RequestMapping("/account")
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserJoinDto userJoinDto){
        userService.signup(userJoinDto);
        return ResponseEntity.ok().body("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto){
        System.out.println(userLoginDto.getEmail());
        System.out.println(userLoginDto.getPassword());
        String token = userService.login(userLoginDto);
        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getUser(){
        return ResponseEntity.ok().body(userService.getAllUser());
    }

    @PutMapping("/typeUpdate")
    public ResponseEntity<?> typeUpdate(@RequestBody UserTypeUpdateDto userTypeUpdateDto){
        userService.typeUpdate(userTypeUpdateDto);
        return ResponseEntity.ok().body("type 수정 완료");
    }

    @GetMapping("/findid")
    public ResponseEntity<?> findEmail(@RequestBody UserFindIdDto userFindIdDto){
        return  ResponseEntity.ok().body(userService.findUserEmail(userFindIdDto));
    }

    @PostMapping("/findpw")
    public ResponseEntity<?> findPw(@RequestBody UserFindPwDto userFindPwDto){
        return ResponseEntity.ok().body(userService.findUserPassword(userFindPwDto));
    }

    @PutMapping("/changepw")
    public ResponseEntity<?> changePw(@RequestBody UserChangePwDto userChangePwDto){
        userService.changePassword(userChangePwDto);
        return ResponseEntity.ok().body("비밀번호 변경 완료");
    }
}