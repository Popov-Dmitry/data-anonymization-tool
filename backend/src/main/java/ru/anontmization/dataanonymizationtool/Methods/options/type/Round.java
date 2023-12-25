package ru.anontmization.dataanonymizationtool.Methods.options.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Data
@NoArgsConstructor
public class Round implements MaskItem {
    private String nameTable;
    private String nameColumn;
    private int precision;

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
                "ALTER TABLE "+nameTable+" ADD COLUMN masking_method_temp_id INT GENERATED BY DEFAULT AS IDENTITY UNIQUE;"
        );
        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "SELECT "+nameColumn+", masking_method_temp_id " +
                        "FROM "+nameTable+";"
        );


        Double cur;
        while(resultSet.next()){
            cur = resultSet.getDouble(1);
            cur = Double.valueOf(String.format("%."+precision+"f", cur).replace(',','.'));
            resultSet.updateObject(1, cur);
            resultSet.updateRow();
        }

        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN masking_method_temp_id;"
        );
    }
}
