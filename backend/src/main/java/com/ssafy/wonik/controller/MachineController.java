package com.ssafy.wonik.controller;

import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.service.MachineService;
import io.swagger.models.Response;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.bson.Document;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://k8s101.p.ssafy.io:3000"}, allowCredentials = "true")
@RequestMapping("/data")
public class MachineController {
    private final MachineService machineService;


    // ----------------------------- TEST 2 -------------------
    // machine이름으로 module찾기
    @PostMapping("/{machineName}")
    @Operation()
    public ResponseEntity<?> findRecentModuleData(@PathVariable("machineName") String machineName) {
        StopWatch sw = new StopWatch();
        sw.start();
        List<MachineToModuleDto> machineToModuleDto = machineService.findRecentModuleData(machineName);
        sw.stop();
        System.out.println(sw.getTotalTimeSeconds());

        return ResponseEntity.ok().body(machineToModuleDto);
    }

    @PostMapping("/machine/module")
    @Operation()
    public ResponseEntity<?> findRecentComponentData(ModuleToComponentInputDto moduleToComponentInputDto){
        StopWatch sw = new StopWatch();
        sw.start();
        List<MachineToModuleDto> machineToModuleDto = machineService.findRecentComponentData(moduleToComponentInputDto);
        sw.stop();
        System.out.println(sw.getTotalTimeSeconds());

        return ResponseEntity.ok().body(machineToModuleDto);
    }
    
    @PostMapping("/pgraph")
    public ResponseEntity<?> pfindGraphData(@RequestBody GraphInputDto graphInputDto) throws IOException{

    	StopWatch sw = new StopWatch();
    	sw.start();
    	List<Document> list = machineService.findGraphData2(graphInputDto);
    	
        ObjectMapper mapper = new ObjectMapper();
      byte[] data = null;
      try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
              GZIPOutputStream gzos = new GZIPOutputStream(baos)) {
          mapper.writeValue(gzos, list);
          gzos.finish();
          data = baos.toByteArray();
      }
    	
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      headers.setCacheControl("max-age=86400, must-revalidate, proxy-revalidate");
      headers.setPragma("no-cache");
      headers.setExpires(0);
      headers.set("Content-Encoding", "gzip");
      System.out.println(data + " " +headers);
      sw.stop();
      System.out.println("그래프 데이터"+sw.getTotalTimeSeconds());
      return ResponseEntity.ok().body(list);
//      return new ResponseEntity<>(data,headers, HttpStatus.OK);
    }



    // component 이름으로 graph 찾기
    @PostMapping("/graph")
    public ResponseEntity<?> findGraphData(@RequestBody GraphInputDto graphInputDto) throws IOException{
        StopWatch sw = new StopWatch();
        sw.start();
        List<ResultDataDto> resultDataDto = machineService.findGraphData(graphInputDto);
        sw.stop();

        ObjectMapper mapper = new ObjectMapper();
        byte[] data = null;
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
                GZIPOutputStream gzos = new GZIPOutputStream(baos)) {
            mapper.writeValue(gzos, resultDataDto);
            gzos.finish();
            data = baos.toByteArray();
        }
     
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setCacheControl("max-age=86400, must-revalidate, proxy-revalidate");
        headers.setPragma("no-cache");
        headers.setExpires(0);
        headers.set("Content-Encoding", "gzip");
        System.out.println(data + " " +headers);
        System.out.println("그래프 데이터"+sw.getTotalTimeSeconds());
        return new ResponseEntity<>(data,headers, HttpStatus.OK);
//        return ResponseEntity.ok().body(resultDataDto);
    }

    @PostMapping("/graph/now")
    public ResponseEntity<?> findNowGraph(@RequestBody NowGraphInputDto nowGraphInputDto){
        MachineToModuleDto result = machineService.findNowGraph(nowGraphInputDto);

        return ResponseEntity.ok().body(result);
    }
}
