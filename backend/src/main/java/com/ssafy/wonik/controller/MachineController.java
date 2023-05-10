package com.ssafy.wonik.controller;

import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.service.MachineService;
import io.swagger.models.Response;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://k8s101.p.ssafy.io:3000"}, allowCredentials = "true")
@RequestMapping("/data")
public class MachineController {
    private final MachineService machineService;

    @GetMapping("/findall")
    public ResponseEntity<?> findAll() {

        return ResponseEntity.ok().body(machineService.findAll());
    }

    @Operation(summary = "Machine 정보", description = "기기명 입력하기 현재는 G_TEST 만 입력가능")
    @PostMapping("/Machine/{machineName}")
    public ResponseEntity<?> findMachine(@PathVariable("machineName") String machineName) {
        ComponentRootDto componentRootDto = machineService.findMachine(machineName);

        return ResponseEntity.ok().body(componentRootDto);
    }

    @PostMapping("/machine/graph")
    public ResponseEntity<?> findGraph(@RequestBody GraphInputDto graphInputDto) {
        System.out.println(graphInputDto.toString());
        StopWatch sw = new StopWatch();
        sw.start();
        GraphResponseDto graphRootDto = machineService.findGraph(graphInputDto);
        sw.stop();
        System.out.println(sw.getTotalTimeSeconds());
        return ResponseEntity.ok().body(graphRootDto);
    }


    // ----------------------------- TEST 2 -------------------
    // machine이름으로 module찾기
    @PostMapping("/{machineName}")
    @Operation()
    public ResponseEntity<?> findRecentModuleData(@PathVariable("machineName") String machineName) {
        List<MachineToModuleDto> machineToModuleDto = machineService.findRecentModuleData(machineName);

        return ResponseEntity.ok().body(machineToModuleDto);
    }

    @PostMapping("/machine/module")
    @Operation()
    public ResponseEntity<?> findRecentComponentData(ModuleToComponentInputDto moduleToComponentInputDto){
        List<MachineToModuleDto> machineToModuleDto = machineService.findRecentComponentData(moduleToComponentInputDto);

        return ResponseEntity.ok().body(machineToModuleDto);
    }



    // component 이름으로 graph 찾기
    @PostMapping("/graph")
    public ResponseEntity<?> findGraphData(@RequestBody GraphInputDto graphInputDto){
        System.out.println(graphInputDto.toString());
        StopWatch sw = new StopWatch();
        sw.start();
        List<ResultDataDto> resultDataDto = machineService.findGraphData(graphInputDto);
        sw.stop();
        System.out.println(sw.getTotalTimeSeconds());
        return ResponseEntity.ok().body(resultDataDto);
    }
}
