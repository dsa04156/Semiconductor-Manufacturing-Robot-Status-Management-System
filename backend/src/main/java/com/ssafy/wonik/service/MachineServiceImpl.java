package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.domain.entity.Machine;
import com.ssafy.wonik.repository.MachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
