package com.ssafy.wonik.repository;

import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.domain.entity.Machine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
public class MachineRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Machine> findAll() {
        return mongoTemplate.findAll(Machine.class);
    }

    public List<ComponentRootDto> findMachine(String machineName) {
        SortOperation sortByDateDesc = Aggregation.sort(Sort.Direction.DESC, "date");
        Aggregation aggregation = Aggregation.newAggregation(
                sortByDateDesc,
                Aggregation.limit(1)
        );

        AggregationResults<ComponentRootDto> result = mongoTemplate.aggregate(
                aggregation, machineName, ComponentRootDto.class);

        return result.getMappedResults();
    }

    public GraphResponseDto findGraph(GraphInputDto graphInputDto) {
//        name: 이름, value: HashMap<String,Object>;
        GraphResponseDto graphResponseDto = new GraphResponseDto();
        ArrayList<String> nameList = new ArrayList<>();
        HashMap<String, ArrayList> mainMap = new HashMap<>();
        HashMap<String, Object> valueMap = new HashMap<>();
        Query query = new Query();
        query.addCriteria(Criteria.where("date").gte((graphInputDto.getStartDate())).lt(graphInputDto.getEndDate()));
        List<Machine> allData = mongoTemplate.find(query, Machine.class, graphInputDto.getMachineName());

        for (Machine machine : allData) {
            LocalDateTime date = machine.getDate();
            ArrayList<ComponentRootDto> moduleData = machine.getChild();

            for (int i = 0; i < moduleData.size(); i++) {
                if (graphInputDto.getModuleName().equals(moduleData.get(i).getName())) {
                    List<ComponentDto> componentData = moduleData.get(i).getChild();

                    for (int j = 0; j < componentData.size(); j++){
                        if(graphInputDto.getComponentName().equals(componentData.get(j).getName())){
                            List<ComponentChildDto> graphData = componentData.get(j).getChild();
                            GraphDataDto componentDataDto = new GraphDataDto(date, componentData.get(j).getValue());
                            if(mainMap.containsKey(componentData.get(j).getName())){
                                mainMap.get(componentData.get(j).getName()).add(componentDataDto);
                            }
                            else {
                                ArrayList<GraphDataDto> inputValue = new ArrayList<>();
                                inputValue.add(componentDataDto);
                                mainMap.put(componentData.get(j).getName(), inputValue);
                                nameList.add(componentData.get(j).getName());
                            }
                            for (int k = 0; k < graphData.size(); k++){
                                String name = graphData.get(k).getName();
                                GraphDataDto graphDataDto = new GraphDataDto(date, graphData.get(k).getValue());

                                if(mainMap.containsKey(name)){
                                    mainMap.get(name).add(graphDataDto);
                                }
                                else{
                                    ArrayList<GraphDataDto> inputValue = new ArrayList<>();
                                    nameList.add(name);
                                    inputValue.add(graphDataDto);
                                    mainMap.put(name, inputValue);
                                }
                            }
                        }

                    }
                }

            }
        }
        graphResponseDto.setNameList(nameList);
        graphResponseDto.setData(mainMap);

        return graphResponseDto;

    }
}
