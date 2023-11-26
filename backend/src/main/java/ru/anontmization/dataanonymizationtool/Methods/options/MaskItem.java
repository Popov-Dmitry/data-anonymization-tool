package ru.anontmization.dataanonymizationtool.Methods.options;

import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.SQLException;
import java.util.List;

public interface MaskItem {
    void start(ControllerDataBaseService controllerDB) throws SQLException;
    String getTable();
    List<String> getColum();
}
