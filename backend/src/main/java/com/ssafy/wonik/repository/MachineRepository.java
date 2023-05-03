package com.ssafy.wonik.repository;

import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.domain.entity.Machine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
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
//        return mongoTemplate.findAll(ComponentDto.class, componentFindDto.getMachineName());
    }

    public GraphResponseDto findGraph(GraphInputDto graphInputDto) {
//        name: 이름, value: HashMap<String,Object>;
        GraphResponseDto graphResponseDto = new GraphResponseDto();
        ArrayList<String> nameList = new ArrayList<>();
        System.out.println(graphInputDto.getStartDate());
        HashMap<String, ArrayList> mainMap = new HashMap<>();
        HashMap<String, Object> valueMap = new HashMap<>();
        Query query = new Query();
        query.addCriteria(Criteria.where("date").gte((graphInputDto.getStartDate())).lt(graphInputDto.getEndDate()));
        List<Machine> allData = mongoTemplate.find(query, Machine.class, graphInputDto.getMachineName());
        System.out.println("moudlename: " + graphInputDto.getModuleName());
        System.out.println("componentname: " + graphInputDto.getComponentName());
        System.out.println("how many" + allData.size());
        for (Machine machine : allData) {
            System.out.println("date: " + machine.getDate());

            LocalDateTime date = machine.getDate();
            ArrayList<ComponentRootDto> moduleData = machine.getChild();
            System.out.println("1: " + moduleData.toString());

            for (int i = 0; i < moduleData.size(); i++) {
                if (graphInputDto.getModuleName().equals(moduleData.get(i).getName())) {
                    List<ComponentDto> componentData = moduleData.get(i).getChild();
                    System.out.println("2: " + componentData.toString());

                    for (int j = 0; j < componentData.size(); j++){
                        if(graphInputDto.getComponentName().equals(componentData.get(j).getName())){
                            List<ComponentChildDto> graphData = componentData.get(j).getChild();
                            System.out.println("3: " + graphData.toString());
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
//                                System.out.println(graphData.get(i));
                                String name = graphData.get(k).getName();
                                GraphDataDto graphDataDto = new GraphDataDto(date, graphData.get(k).getValue());
//                                valueMap.put("date", date);
//                                valueMap.put("value", graphData.get(k).getValue());
//                                System.out.println("4: " + valueMap.toString());
                                if(mainMap.containsKey(name)){
                                    System.out.println("second add" + mainMap.toString());
                                    mainMap.get(name).add(graphDataDto);
                                }
                                else{
                                    ArrayList<GraphDataDto> inputValue = new ArrayList<>();
                                    nameList.add(name);
                                    inputValue.add(graphDataDto);
                                    mainMap.put(name, inputValue);
                                    System.out.println("mainmap: "+mainMap.toString());
                                }
                            }
                        }

                    }
                }

            }
        }
        graphResponseDto.setNameList(nameList);
        graphResponseDto.setData(mainMap);

        System.out.println(mainMap);
        return graphResponseDto;

    }
}
