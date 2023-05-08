package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.domain.entity.Machine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface MachineService {
    List<Machine> findAll();

    ComponentRootDto findMachine(String machineName);

    GraphResponseDto findGraph(GraphInputDto graphInputDto);

    List<MachineToModuleDto> findRecentModuleData(String machineName);

    List<ResultDataDto> findGraphData(GraphInputDto graphInputDto);

    List<MachineToModuleDto> findRecentComponentData(ModuleToComponentInputDto moduleToComponentInputDto);
}
