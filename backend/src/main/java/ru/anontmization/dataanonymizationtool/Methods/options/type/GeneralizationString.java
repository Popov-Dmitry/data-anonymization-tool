package ru.anontmization.dataanonymizationtool.Methods.options.type;

import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.SQLException;
import java.util.HashMap;

public class GeneralizationString implements MaskItem {
    private final String nameTable;
    private final String nameColumn;
    private final String generalizationTable;
    private final HashMap<String, String> value;

    public GeneralizationString(String nameTable, String nameColumn, String generalizationTable, HashMap<String, String> value) {
        this.nameTable = nameTable;
        this.nameColumn = nameColumn;
        this.generalizationTable = generalizationTable;
        this.value = value;
    }

    @Override
    public String getTable() {
        return nameTable;
    }

    @Override
    public void start(ControllerDataBaseService controllerDB) throws SQLException {
        controllerDB.getStatement().execute(
                "DROP TABLE IF EXISTS "+generalizationTable+";"
        );
        controllerDB.getStatement().execute(
                "CREATE TABLE "+generalizationTable+"(generalization text,value text);"
        );
        value.forEach((key, value) -> {
            try {
                controllerDB.getStatement().execute(
                        "UPDATE "+nameTable+" SET "+nameColumn+"='"+value+"' WHERE "+nameColumn+"='"+key+"';"
                );
                controllerDB.getStatement().execute(
                        "INSERT INTO "+generalizationTable+" VALUES ('"+value+"', '"+key+"');"
                );
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }
}