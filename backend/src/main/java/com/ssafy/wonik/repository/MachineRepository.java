package com.ssafy.wonik.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import com.ssafy.wonik.domain.dto.*;
import com.ssafy.wonik.domain.entity.Machine;
import net.bytebuddy.asm.Advice;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Repository
public class MachineRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Machine> findAll() {
        return mongoTemplate.findAll(Machine.class);
    }

    public List<ComponentRootDto> findMachine(String machineName) {
        SortOperation sortByDateDesc = Aggregation.sort(Sort.Direction.DESC, "date");
        Aggregation aggregation = newAggregation(
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

    public List<MachineToModuleDto> findRecentModuleData(String machineName) {
        MongoCollection<Document> collection = mongoTemplate.getCollection("machine_A");

        Document latestDateDoc = collection.find().sort(new Document("date", -1)).first();
        Date latestDate = latestDateDoc.getDate("date");

        List<MachineToModuleDto> result = new ArrayList<>();
        try (MongoCursor<Document> cursor = collection.find(
            Filters.and(
                Filters.or(
                    Filters.eq("parent", machineName),
                    Filters.eq("parent", "first")
                    ),
                    Filters.eq("date", latestDate)
                )).iterator()) {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                MachineToModuleDto data = new MachineToModuleDto();
                data.setName(doc.getString("name"));
                data.setDate(doc.getDate("date"));
                data.setValue(doc.getDouble("value"));
                result.add(data);
            }
        }

        return result;
    }

    public List<MachineToModuleDto> findRecentComponentData(ModuleToComponentInputDto moduleToComponentInputDto) {
        MongoCollection<Document> collection = mongoTemplate.getCollection("machine_A");

        Document latestDateDoc = collection.find().sort(new Document("date", -1)).first();
        Date latestDate = latestDateDoc.getDate("date");

        List<MachineToModuleDto> result = new ArrayList<>();
        try (MongoCursor<Document> cursor = collection.find(
                Filters.and(
                        Filters.eq("parent", moduleToComponentInputDto.getModuleName()),
                        Filters.eq("date", latestDate)
                )).iterator()) {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                MachineToModuleDto data = new MachineToModuleDto();
                data.setName(doc.getString("name"));
                data.setDate(doc.getDate("date"));
                data.setValue(doc.getDouble("value"));
                result.add(data);
            }
        }

        return result;
    }


    public List<ResultDataDto> findGraphData(GraphInputDto graphInputDto) {
        MatchOperation match = match(
//                Criteria.where("parent").is(graphInputDto.getComponentName()).andOperator(
//                Criteria.where("date").gte(graphInputDto.getStartDate()),
//                Criteria.where("date").lt(graphInputDto.getEndDate()))

                // name은 안찾는거 date - parent 순
//                Criteria.where("date").gte(graphInputDto.getStartDate())
//                        .lt(graphInputDto.getEndDate())
//                        .and("parent").is(graphInputDto.getComponentName())

//                 name도 찾는거 date-parent 순
        new Criteria().andOperator(
                        Criteria.where("date").gte(graphInputDto.getStartDate()),
                        Criteria.where("date").lt(graphInputDto.getEndDate())
                )
                .orOperator(
                        Criteria.where("parent").is(graphInputDto.getComponentName()),
                        new Criteria().andOperator(
                                Criteria.where("parent").is(graphInputDto.getModuleName()),
                                Criteria.where("name").is(graphInputDto.getComponentName())
                        )
                )
        );

        GroupOperation group = group("name")
                .first("name").as("name")
                .push(new Document("value", "$value").append("date", "$date")).as("data");

        Aggregation aggregation = newAggregation(match, group).withOptions(Aggregation.newAggregationOptions().allowDiskUse(true).build());
        AggregationResults<ResultDataDto> result =
                mongoTemplate.aggregate(aggregation, "machine_A", ResultDataDto.class);

        return result.getMappedResults();
    }




// --------------------------------------원래 사용법
//        MongoCollection<Document> collection = mongoTemplate.getCollection("TT_TEST");
//        GraphResponseDto graphResponseDto = new GraphResponseDto();
//
//        ArrayList<String> nameList = new ArrayList<>();
//        HashMap<String, ArrayList> mainMap = new HashMap<>();
//        HashMap<String,Object> valueMap = new HashMap<>();
//
//        try(MongoCursor<Document> cursor = collection.find(
//                Filters.and(
//                        Filters.or(
//                                Filters.eq("name", graphInputDto.getComponentName()),
//                                Filters.eq("parent", graphInputDto.getComponentName())
//                                ),
//                        Filters.gte("date", graphInputDto.getStartDate()),
//                        Filters.lt("date", graphInputDto.getEndDate())
//                        )).iterator()){
//
//            while (cursor.hasNext()){
//                Document doc = cursor.next();
//                String name = doc.getString("name");
//                Date date = doc.getDate("date");
//                Double value = doc.getDouble("value");
//                GraphListDto graphListDto = new GraphListDto(date, value);
//                if(mainMap.containsKey(name)){
//                    mainMap.get(name).add(graphListDto);
//                }
//                else {
//                    ArrayList<GraphListDto> inputValue = new ArrayList<>();
//                    nameList.add(name);
//                    inputValue.add(graphListDto);
//                    mainMap.put(name, inputValue);
//                }
//            }
//            graphResponseDto.setNameList(nameList);
//            graphResponseDto.setData(mainMap);
//        }
//        return graphResponseDto;
//    }
}
