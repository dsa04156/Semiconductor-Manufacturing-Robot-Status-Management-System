package com.ssafy.wonik.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nonapi.io.github.classgraph.json.Id;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("2023-04-24  4:28:11 PM")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Machine {
        @Id
        private String id;

        private String name;

        private Double value;

        private ArrayList<Object> child;

//        private  String name;
}
