package com.ssafy.wonik.repository;

import com.ssafy.wonik.domain.dto.ComponentRootDto;
import com.ssafy.wonik.domain.entity.Machine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MachineRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Machine> findAll(){
        return mongoTemplate.findAll(Machine.class);
    }

    public List<ComponentRootDto> findMachine(String machineName){
        SortOperation sortByDateDesc = Aggregation.sort(Sort.Direction.DESC, "date");
        Aggregation aggregation = Aggregation.newAggregation(
                sortByDateDesc,
                Aggregation.limit(1)
        );

        AggregationResults<ComponentRootDto> result = mongoTemplate.aggregate(
                aggregation, machineName, ComponentRootDto.class);

        return result.getMappedResults();
//        return mongoTemplate.findAll(ComponentDto.class, componentFindDto.getMachineName());
    }
}
