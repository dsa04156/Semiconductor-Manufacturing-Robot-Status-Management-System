package com.ssafy.wonik.domain.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Document(collection = "USER")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    private String email;

    private String password;

    private String name;

    private String phone;

    private int type;
}
