package ru.anontmization.dataanonymizationtool.Methods.options.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

@Data
@NoArgsConstructor
public class GeneralizationString implements MaskItem {
    private String nameTable;
    private String nameColumn;
    private String generalizationTable;
    private HashMap<String, String> value;

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