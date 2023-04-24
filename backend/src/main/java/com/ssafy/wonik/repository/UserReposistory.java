package com.ssafy.wonik.repository;

import com.ssafy.wonik.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserReposistory extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

}

