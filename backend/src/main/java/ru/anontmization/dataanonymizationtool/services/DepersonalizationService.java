package ru.anontmization.dataanonymizationtool.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepersonalizationService {

    private final ControllerDataBaseService controllerDB;
    private static final Map<String, MaskItem> methods = new LinkedHashMap<>();

    public String getMethods(){
        return methods.toString();
    }

    public void addMethod(String nameOption, MaskItem item){
        methods.put(nameOption, item);
    }

    public void clear(){
        methods.clear();
    }


    public void start(){
        init();
        masking();
        deinit();
    }
    private void init(){
        String maskDB = "mask_"+controllerDB.getNameDB();

        controllerDB.connect();

        controllerDB.statementExecute("DROP DATABASE IF EXISTS "+maskDB+";");
        controllerDB.statementExecute(
                "CREATE DATABASE "+maskDB
                        +" WITH TEMPLATE "+controllerDB.getNameDB()
                        +" OWNER "+controllerDB.getUserName()+";");

        controllerDB.disconnect();
        controllerDB.setNameDB(maskDB);
        controllerDB.connect();
    }
    private void masking(){
        methods.forEach((key, value) -> {
            try {
                System.out.print(value.getTable()+"\t\t");

                long start = System.currentTimeMillis();
                value.start(controllerDB);
                long end = System.currentTimeMillis();

                NumberFormat formatter = new DecimalFormat("#0.00");
                System.out.println(formatter.format((end - start) / 1000d).replace(",","."));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }
    private void deinit(){
        controllerDB.disconnect();
    }
}
