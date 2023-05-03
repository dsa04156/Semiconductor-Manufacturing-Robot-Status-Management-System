package com.ssafy.wonik.controller;

import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.domain.dto.GraphInputDto;
import com.ssafy.wonik.domain.dto.GraphResponseDto;
import com.ssafy.wonik.domain.dto.GraphRootDto;
import com.ssafy.wonik.service.MachineService;
import io.swagger.models.Response;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
@RequestMapping("/data")
public class MachineController {
    private final MachineService machineService;
    @GetMapping("/findall")
    public ResponseEntity<?> findAll(){

        return ResponseEntity.ok().body(machineService.findAll());
    }



    @Operation(summary = "Machine 정보", description = "기기명 입력하기 현재는 G_TEST 만 입력가능")
    @PostMapping("/Machine/{machineName}")
    public ResponseEntity<?> findMachine(@PathVariable("machineName") String machineName){
        ComponentRootDto componentRootDto = machineService.findMachine(machineName);

        return ResponseEntity.ok().body(componentRootDto);
    }

    @PostMapping("/machine/graph")
    public ResponseEntity<?> findGraph(@RequestBody GraphInputDto graphInputDto){
        GraphResponseDto graphRootDto = machineService.findGraph(graphInputDto);
        return ResponseEntity.ok().body(graphRootDto);
    }

}
