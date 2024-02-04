package ru.anontmization.dataanonymizationtool.services;

import lombok.Data;
import org.springframework.stereotype.Service;
import ru.anontmization.dataanonymizationtool.dto.DataPreparationDto;
import ru.anontmization.dataanonymizationtool.dto.Enum.PreparationEnum;

import java.sql.ResultSet;
import java.util.List;

@Data
@Service
public class DataPreparationService {

    private final ControllerDataBaseService controllerDB;
    private List<DataPreparationDto> preparationMethods;

    public void setConfig(List<DataPreparationDto> list) {
        preparationMethods = list;
    }

    public void start() throws Exception {
        if (preparationMethods == null || preparationMethods.isEmpty()) return;

        controllerDB.connect();
        for (DataPreparationDto preparationDto : preparationMethods) {
            switch (PreparationEnum.findByName(preparationDto.getPreparationMethod())) {
                case AVERAGE -> average(preparationDto.getTableName(), preparationDto.getColumnName());
                case MEDIAN -> median(preparationDto.getTableName(), preparationDto.getColumnName());
                case MODE -> mode(preparationDto.getTableName(), preparationDto.getColumnName());
            }
        }
        controllerDB.disconnect();
    }

    private void average(String table, String column) throws Exception {
        controllerDB.getStatement().execute("select avg(man) from population;");

        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "select avg(" + column + ")" + " FROM " + table + ";");

        resultSet.next();

        Object value = resultSet.getObject(1);

        controllerDB.getStatement().execute(
                "UPDATE " + table + " SET " + column + "=" + value + " WHERE " + column + " is null;"
        );
    }

    private void median(String table, String column) throws Exception {
        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "select  count(*) from "+table+" WHERE "+column+" IS NOT NULL;"
        );
        resultSet.next();
        long size = resultSet.getLong(1);
        long meddle = (size/2) - 1;
        long value;

        if ((size % 2) == 1) {
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT "+column+" FROM "+table+" WHERE "+column+" IS NOT NULL ORDER BY "+column+" OFFSET "+meddle+" LIMIT 1;"
            );
            resultSet.next();
            value = resultSet.getLong(1);
        } else {
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT "+column+" FROM "+table+" WHERE "+column+" IS NOT NULL ORDER BY "+column+" OFFSET "+meddle+" LIMIT 2;"
            );
            resultSet.next();
            value = resultSet.getLong(1);
            resultSet.next();
            value = (value + resultSet.getLong(1)) / 2;
        }

        controllerDB.getStatement().execute(
                "UPDATE " + table + " SET " + column + "=" + value + " WHERE " + column + " is null;"
        );
    }

    private void mode(String table, String column) throws Exception {
        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "select  mode() within group (order by "+column+") from "+table+";"
        );
        resultSet.next();
        controllerDB.getStatement().execute("UPDATE "+table+" SET "+column+"="+resultSet.getObject(1) + " WHERE " + column + " is null;");
    }
}
