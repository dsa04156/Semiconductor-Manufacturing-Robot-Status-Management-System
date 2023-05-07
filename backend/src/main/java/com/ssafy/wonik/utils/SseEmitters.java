package com.ssafy.wonik.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.service.MachineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@Slf4j
@RequiredArgsConstructor
public class SseEmitters {
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    private final MachineService machineService;

    public SseEmitter add(SseEmitter emitter) {
        this.emitters.add(emitter);
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", emitters.size());
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            this.emitters.remove(emitter);    // 만료되면 리스트에서 삭제
        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        return emitter;
    }

    public void send(String machine) throws JsonProcessingException {
        ComponentRootDto componentRootDto = machineService.findMachine(machine);
        String json = new ObjectMapper().writeValueAsString(componentRootDto); // ComponentRootDto를 JSON 문자열로 변환
        System.out.println("new data");
        emitters.forEach(emitter -> {
                    try {
                        SseEmitter.SseEventBuilder event = SseEmitter.event()
                                .name(machine)
                                .data(json)
                                .id(String.valueOf(System.currentTimeMillis()));
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_JSON); // Content-Type 헤더를 application/json으로 설정
                        emitter.send(event.reconnectTime(5000L).build(), headers.getContentType()); // SseEmitter 객체에 HttpHeaders 객체 설정
                        System.out.println("send new data");
                    } catch (IOException e){
                        throw new RuntimeException();
                    }

//        emitters.forEach(emitter -> {
//            try {
//                emitter.send(SseEmitter.event()
//                        .name(machine)
//                        .data(componentRootDto));
//            } catch (IOException e){
//                throw new RuntimeException();
//            }
        });
    }




}
