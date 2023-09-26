package ru.anontmization.dataanonymizationtool.services;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.Methods.options.type.*;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DepersonalizationService {
    private List<String> allMethods;

    private final ControllerDataBaseService controllerDB;
    private static final Map<String, MaskItem> methods = new LinkedHashMap<>();

    {
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

    @Getter
    private String config;

    public void setConfig(String json) {

//        Employee employee = objectMapper.readValue(employeeJson, Employee.class);
        JSONArray methodsJSON = new JSONArray(json);

        for (int i = 0; i < methodsJSON.length(); i++) {
            JSONObject method = methodsJSON.getJSONObject(i);

            String methodName = method.getString("method");

            if (allMethods.contains(methodName)) {
                System.out.println(methodsJSON.get(i));
            }


        }
        config = json;
    }

    public String getMethods() {
        return methods.toString();
    }

    public void addMethod(String nameOption, MaskItem item) {
        methods.put(nameOption, item);
    }

    public void clear() {
        methods.clear();
    }


    public void start() {
        init();
        masking();
        deinit();
    }

    private void init() {
        String maskDB = "mask_" + controllerDB.getNameDB();

        controllerDB.connect();

        controllerDB.statementExecute("DROP DATABASE IF EXISTS " + maskDB + ";");
        controllerDB.statementExecute(
                "CREATE DATABASE " + maskDB
                        + " WITH TEMPLATE " + controllerDB.getNameDB()
                        + " OWNER " + controllerDB.getUserName() + ";");

        controllerDB.disconnect();
        controllerDB.setNameDB(maskDB);
        controllerDB.connect();
    }

    private void masking() {
        methods.forEach((key, value) -> {
            try {
                System.out.print(value.getTable() + "\t\t");

                long start = System.currentTimeMillis();
                value.start(controllerDB);
                long end = System.currentTimeMillis();

                NumberFormat formatter = new DecimalFormat("#0.00");
                System.out.println(formatter.format((end - start) / 1000d).replace(",", "."));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void deinit() {
        controllerDB.disconnect();
    }
}
