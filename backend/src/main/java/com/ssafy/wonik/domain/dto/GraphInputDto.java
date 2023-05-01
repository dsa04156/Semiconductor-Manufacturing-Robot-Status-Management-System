package com.ssafy.wonik.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
public class GraphInputDto {
    private String machineName;
    private String moduleName;
    private String ComponentName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
