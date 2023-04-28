package com.ssafy.wonik.controller;

import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.service.MachineService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
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

}
