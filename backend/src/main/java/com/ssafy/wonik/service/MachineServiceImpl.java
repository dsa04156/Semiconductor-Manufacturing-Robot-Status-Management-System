package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.domain.entity.Machine;
import com.ssafy.wonik.repository.MachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MachineServiceImpl implements MachineService{

    private final MachineRepository machineRepository;

    @Override
    public List<Machine> findAll() {
        return machineRepository.findAll();
    }

    @Override
    public ComponentRootDto findMachine(String machineName) {
        List<ComponentRootDto> list = machineRepository.findMachine(machineName);
        System.out.println(list);
        ComponentRootDto componentRootDto = list.get(0);
        System.out.println(componentRootDto);
        return componentRootDto;
    }

    @Override
    public GraphResponseDto  findGraph(GraphInputDto graphInputDto) {
        GraphResponseDto graphData = machineRepository.findGraph(graphInputDto);
//        GraphRootDto graphRootDto = new GraphRootDto(graphInputDto.getComponentName(), graphData);
        return graphData;
    }
}
