package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.domain.dto.GraphInputDto;
import com.ssafy.wonik.domain.dto.GraphResponseDto;
import com.ssafy.wonik.domain.dto.GraphRootDto;
import com.ssafy.wonik.domain.entity.Machine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface MachineService {
    List<Machine> findAll();

    ComponentRootDto findMachine(String machineName);

    GraphResponseDto findGraph(GraphInputDto graphInputDto);
}
