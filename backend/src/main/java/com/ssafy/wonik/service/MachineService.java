package com.ssafy.wonik.service;

import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.domain.entity.Machine;

import java.util.List;

public interface MachineService {
    List<Machine> findAll();

    ComponentRootDto findMachine(String machineName);

}
