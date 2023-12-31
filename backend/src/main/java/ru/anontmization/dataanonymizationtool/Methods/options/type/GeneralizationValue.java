package ru.anontmization.dataanonymizationtool.Methods.options.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class GeneralizationValue implements MaskItem {
    private String nameTable;
    private String nameColumn;
    private String generalizationTable;
    private ArrayList<String> generalizationName;
    private ArrayList<?> minValue;
    private ArrayList<?> maxValue;
    private String isDate;

    @Override
    public String getTable() {
        return nameTable;
    }

    @Override
    public List<String> getColum() {
        return List.of(nameColumn);
    }

    @Override
    public void start(ControllerDataBaseService controllerDB) throws Exception {
        boolean date = isDate.equals("true");


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

            if (date){
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
    }
}
