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

//    @GetMapping("/machine/{}")
//    public ResponseEntity<?> findMachine(machineName){
//
//    }

    @Operation(summary = "Machine 정보", description = "기기명 입력하기 현재는 G_TEST 만 입력가능")
    @PostMapping("/Machine/{machineName}")
    public ResponseEntity<?> findMachine(@PathVariable("machineName") String machineName){
        System.out.println(machineName);
        ComponentRootDto componentRootDto = machineService.findMachine(machineName);
//        System.out.println("11111111111");
//        for(ComponentDto componentDto : list){
//            System.out.println(componentDto.getChild());
//        }
        System.out.println(componentRootDto);
        return ResponseEntity.ok().body(componentRootDto);
    }

    @PostMapping("/machine/graph")
    public ResponseEntity<?> findGraph(@RequestBody GraphInputDto graphInputDto){
        GraphResponseDto graphRootDto = machineService.findGraph(graphInputDto);
        return ResponseEntity.ok().body(graphRootDto);
    }
//    @PostMapping("/machine/graph")
//
//    public ResponseEntity<?> findGraph(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
//                                       @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
//        GraphInputDto graphInputDto = new GraphInputDto();
//        graphInputDto.setMachineName("G_TEST");
//        graphInputDto.setEndDate(endDate);
//        graphInputDto.setModuleName("root-006");
//        graphInputDto.setStartDate(startDate);
//        graphInputDto.setComponentName("root-006-000");
//
//        HashMap<String, ArrayList> graphRootDto = machineService.findGraph(graphInputDto);
//        return ResponseEntity.ok().body(graphRootDto);
//    }
}
