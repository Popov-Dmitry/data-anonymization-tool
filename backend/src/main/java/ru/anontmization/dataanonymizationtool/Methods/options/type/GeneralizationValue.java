package ru.anontmization.dataanonymizationtool.Methods.options.type;

import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.SQLException;
import java.util.ArrayList;

public class GeneralizationValue implements MaskItem {
    private final String nameTable;
    private final String nameColumn;
    private final String generalizationTable;
    private final ArrayList<String> generalizationName;
    private final ArrayList<?> minValue;
    private final ArrayList<?> maxValue;
    private final boolean isDate;

    public GeneralizationValue(String nameTable, String nameColumn, String generalizationTable, ArrayList<String> generalizationName, ArrayList<?> minValue, ArrayList<?> maxValue, boolean isDate) {
        this.nameTable = nameTable;
        this.nameColumn = nameColumn;
        this.generalizationTable = generalizationTable;
        this.generalizationName = generalizationName;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.isDate = isDate;
    }

    @Override
    public String getTable() {
        return nameTable;
    }

    @Override
    public void start(ControllerDataBaseService controllerDB) throws SQLException {

        String isChangeNameColumn = "is_change_temp_column";

        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN "+isChangeNameColumn+" INT DEFAULT 0;"
        );


        controllerDB.getStatement().execute(
                "DROP TABLE IF EXISTS "+generalizationTable+";"
        );
        controllerDB.getStatement().execute(
                "CREATE TABLE IF NOT EXISTS "+generalizationTable+" (id SERIAL PRIMARY KEY, value text);"
        );


        for (int i = 0; i < generalizationName.size(); i++) {
            controllerDB.getStatement().execute(
                    "INSERT INTO "+generalizationTable+" (value) VALUES ('"+generalizationName.get(i)+"');"
            );

            if (isDate){
                controllerDB.getStatement().execute(
                        "UPDATE "+nameTable+
                                " SET "+isChangeNameColumn+"="+(i+1)+
                                " WHERE "+nameColumn+">='"+minValue.get(i) +
                                "' AND "+nameColumn+"<'"+maxValue.get(i) +
                                "' AND "+isChangeNameColumn+"=0;"
                );
            }else {
                controllerDB.getStatement().execute(
                        "UPDATE "+nameTable+
                                " SET "+isChangeNameColumn+"="+(i+1)+
                                " WHERE "+nameColumn+">="+minValue.get(i) +
                                " AND "+nameColumn+"<"+maxValue.get(i) +
                                " AND "+isChangeNameColumn+"=0;"
                );
            }

        }
        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN "+nameColumn+";"
        );

        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" RENAME COLUMN "+isChangeNameColumn+" TO "+nameColumn+";"
        );


        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+
                        " RENAME "+nameColumn+
                        " TO id_"+generalizationTable+";"
        );
    }
}
