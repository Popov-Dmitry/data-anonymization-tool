package ru.anontmization.dataanonymizationtool.Methods.options.type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Data
@NoArgsConstructor
public class Shuffle implements MaskItem{
    private String nameTable;
    private String[] namesColumn;

    @Override
    public String getTable() {
        return nameTable;
    }
    private String convertStringArrayToString(String[] strArr, String delimiter) {
        StringBuilder sb = new StringBuilder();
        for (String str : strArr)
            sb.append(str).append(delimiter);
        return sb.substring(0, sb.length() - 1);
    }

    @Override
    public List<String> getColum() {
        return List.of(namesColumn);
    }

    @Override
    public void start(ControllerDataBaseService controllerDB) throws Exception {
        String columnsRow = convertStringArrayToString(namesColumn, ",");
        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN masking_id_for_shuffle INT GENERATED BY DEFAULT AS IDENTITY UNIQUE;"
        );
        ResultSet resultSet = controllerDB.getStatement().executeQuery("select count(*) from "+nameTable+";");
        resultSet.next();
        int sizeTable = resultSet.getInt(1);
        resultSet = controllerDB.getStatement().executeQuery(
                "select "+columnsRow+",masking_id_for_shuffle from "+nameTable+";"
        );

        int cur;
        int lastEl = sizeTable;
        Object buf1, buf2;
        Random random = new Random();
        for(int i = 1; i < sizeTable; i++){
            cur = random.nextInt(lastEl-1)+1;
            for(int j = 1; j < namesColumn.length+1; j++){
                resultSet.absolute(cur);
                buf1 = resultSet.getObject(j);

                resultSet.absolute(lastEl);
                buf2 = resultSet.getObject(j);

                resultSet.updateObject(j, buf1);
                resultSet.updateRow();

                resultSet.absolute(cur);
                resultSet.updateObject(j, buf2);
                resultSet.updateRow();

            }

            lastEl--;
        }
        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN masking_id_for_shuffle;"
        );
    }
}
