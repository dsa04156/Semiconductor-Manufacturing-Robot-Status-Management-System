package com.ssafy.wonik.utils;

import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.service.MachineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

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

    public void send(String machine){
        ComponentRootDto componentRootDto = machineService.findMachine(machine);
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name(machine)
                        .data(componentRootDto));
            } catch (IOException e){
                throw new RuntimeException();
            }
        });
    }




}
