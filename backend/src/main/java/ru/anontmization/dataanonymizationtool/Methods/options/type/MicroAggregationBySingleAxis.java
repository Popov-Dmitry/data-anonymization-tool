package ru.anontmization.dataanonymizationtool.Methods.options.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

@Data
@NoArgsConstructor
public class MicroAggregationBySingleAxis implements MaskItem {
    private String nameTable;
    private int k;
    private String axisColumn;
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
    public void start(ControllerDataBaseService controllerDB) throws SQLException {
        String nameIdField = "temp_id_group_by_micro_aggregation";
        String columnsRow = convertStringArrayToString(namesColumn, ",");


        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN "+nameIdField+" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY;"
        );



        ResultSet resultSet = controllerDB.getStatement().executeQuery("select count(*) from "+nameTable+";");
        resultSet.next();
        int sizeTable = resultSet.getInt(1);


        resultSet = controllerDB
                .getStatement()
                .executeQuery("SELECT "+columnsRow+", "+nameIdField+" from "+nameTable+" ORDER BY "+axisColumn+";");

        int size = namesColumn.length;
        int count = 1;
        double[] sum = new double[size];
        int curElem = 0;

        System.out.println(sizeTable);

        for (int i = 1; i <= sizeTable; i++) {
            resultSet.absolute(i);

            for (int j = 0; j < size; j++) {
                sum[j] += resultSet.getDouble( j + 1);
            }

            if(count == k || i == sizeTable){
                for (int j = 0; j < size; j++) {
                    sum[j] /= count;
                }
                curElem = i - count + 1;

                for (int j = curElem; j <= i; j++) {
                    resultSet.absolute(j);
                    for (int l = 0; l < size; l++) {
                        resultSet.updateObject(l+1, sum[l]);
                    }
                    resultSet.updateRow();
                }
                Arrays.fill(sum, 0);
                count = 1;
            }else{
                count++;
                curElem++;
            }
        }

        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN "+nameIdField+";"
        );

    }
}
