package ru.anontmization.dataanonymizationtool.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import ru.anontmization.dataanonymizationtool.Methods.controllers.ControllerDB;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.Methods.options.type.*;
import ru.anontmization.dataanonymizationtool.dto.AttributeTypeDto;
import ru.anontmization.dataanonymizationtool.dto.Enum.MaskMethods;
import ru.anontmization.dataanonymizationtool.dto.RiskDto;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepersonalizationService {
    private List<String> allMethods;
    private Status status;

    private enum Status {
        WAIT, IN_PROGRESS, DONE
    }
    private LocalDateTime timeStart;

    private final ControllerDataBaseService controllerDB;
    private final StatisticService statisticService;

    private List<MaskItem> methods = new ArrayList<>();

    {
        status = Status.WAIT;
        allMethods = new ArrayList<>(
                Arrays.asList(
                        DateAging.class.getSimpleName(),
                        Decomposition.class.getSimpleName(),
                        GeneralizationString.class.getSimpleName(),
                        GeneralizationValue.class.getSimpleName(),
                        Identifier.class.getSimpleName(),
                        MicroAggregation.class.getSimpleName(),
                        MicroAggregationBySingleAxis.class.getSimpleName(),
                        Round.class.getSimpleName(),
                        Shuffle.class.getSimpleName(),
                        ValueReplacement.class.getSimpleName(),
                        ValueReplacementByPattern.class.getSimpleName(),
                        ValueReplacementFromFile.class.getSimpleName(),
                        ValueVariance.class.getSimpleName()
                )
        );
    }


    public void setConfig(String json) {
        methods.clear();

        ObjectMapper mapper = new ObjectMapper();
        JSONArray methodsJSON = new JSONArray(json);

        statisticService.setStatistic();

        setRisk(methodsJSON.getJSONObject(0));
        for (int i = 1; i < methodsJSON.length(); i++) {

            JSONObject method = methodsJSON.getJSONObject(i);
            String methodName = method.getString("method");

            if(methodName.equals("Decomposition")){
                JSONObject params = method.getJSONObject("params");
                methods.add(
                        new Decomposition(
                                params.getString("nameTable"),
                                params.getString("nameColumn"),
                                params.getString("nameNewTable"),
                                new ControllerDB(
                                        params.getString("url"),
                                        params.getString("nameDB"),
                                        params.getString("user"),
                                        params.getString("password")
                                )
                        )
                );
                continue;
            }

            if (allMethods.contains(methodName)) {
                String params = method.getJSONObject("params").toString();
                try {
                    MaskItem maskItem = (MaskItem) mapper.readValue(params, MaskMethods.valueOf(methodName).getMethodClass());

                    statisticService.setNotMaskStatistic(maskItem, methodName);

                    methods.add(maskItem);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    public String getMethods() {
        return allMethods.toString();
    }

    public void clear() {
        methods.clear();
    }


    public String start() {
        if (methods.isEmpty()) return "{\"error\" : \"empty methods\"}";
        String time;
        timeStart = LocalDateTime.now();
        init();
        time = masking();
        controllerDB.disconnect();
        controllerDB.disconnect();
        return time;
    }

    private void init() {
        String maskDB = "mask_" + controllerDB.getNameDB();
        controllerDB.statementExecute("DROP DATABASE IF EXISTS " + maskDB + ";");
        controllerDB.statementExecute(
                "CREATE DATABASE " + maskDB
                        + " WITH TEMPLATE " + controllerDB.getNameDB()
                        + " OWNER " + controllerDB.getUserName() + ";");
        controllerDB.setNameDB(maskDB);

    }

    private String masking() {
        status = Status.IN_PROGRESS;
        long start = System.currentTimeMillis();

        controllerDB.connect();
        methods.forEach(item -> {
            try {
                item.start(controllerDB);
            } catch (Exception e) {
                controllerDB.disconnect();
                throw new RuntimeException(e);
            }
        });
        controllerDB.disconnect();

        long end = System.currentTimeMillis();
        status = Status.DONE;
        NumberFormat formatter = new DecimalFormat("#0.00");

        statisticService.setCountExtraStatic(0);
        statisticService.calculateRisk();
        methods.forEach( item -> statisticService.setMaskStatistic(item, item.getClass().getSimpleName()));

        return formatter.format((end - start) / 1000d).replace(",", ".");
    }

    public String getStatus() {
        return "{\"status\" : \"" +status.name() + "\","+
                "\"timeStart\" : \"" +timeStart + "\"}";
    }

    private void setRisk(JSONObject riskJSON){
        RiskDto risk = new RiskDto();

        try {
            controllerDB.setSensitive(getAttributeRisk(riskJSON.getJSONArray("sensitive")));
        } catch (Exception e){
            controllerDB.setSensitive(List.of());
        }
        try {
            controllerDB.setIdentifier(getAttributeRisk(riskJSON.getJSONArray("identifier")));
        } catch (Exception e){
            controllerDB.setIdentifier(List.of());
        }
        try {
            controllerDB.setQuasiIdentifier(getAttributeRisk(riskJSON.getJSONArray("quasiIdentifier")));
        } catch (Exception e){
            controllerDB.setQuasiIdentifier(List.of());
        }

        risk.setName(riskJSON.getString("methodRisk"));
        double proportion = 0;
        try {
            proportion = riskJSON.getDouble("proportion");
        }catch (JSONException ignored){}
        try {
            proportion = riskJSON.getDouble("threshold");
        }catch (JSONException ignored){}

        risk.setProportion(proportion);

        statisticService.setRiskMethod(risk);
    }

    private List<AttributeTypeDto> getAttributeRisk(JSONArray attributes){
        List<AttributeTypeDto> list = new ArrayList<>();
        AttributeTypeDto attribute;

        for (int i = 0; i < attributes.length(); i++) {
            attribute = new AttributeTypeDto();
            attribute.setTable(attributes.getJSONObject(i).getString("table"));
            attribute.setColumn(attributes.getJSONObject(i).getString("column"));
            list.add(attribute);
        }
        return list;
    }
}
