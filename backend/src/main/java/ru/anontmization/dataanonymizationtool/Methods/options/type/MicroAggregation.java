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
public class MicroAggregation implements MaskItem {
    private String nameTable;
    private String[] namesColumn;
    private int k;


    private static final String nameFieldIsChange = "is_change_for_micro_aggregation";
    private static final String nameIdField = "temp_id_group_by_micro_aggregation";

    private String columnsRow;
    private String columnsRowCount;

    @Override
    public String getTable() {
        return nameTable;
    }

    @Override
    public List<String> getColum() {
        return List.of(namesColumn);
    }

    private String convertStringArrayToString(String[] strArr) {
        StringBuilder sb = new StringBuilder();
        for (String str : strArr)
            sb.append(str).append(",");
        return sb.substring(0, sb.length() - 1);
    }
    private String convertStringArrayToStringWithAVG(String[] strArr) {
        StringBuilder sb = new StringBuilder();
        for (String str : strArr)
            sb.append("AVG(").append(str).append("),");
        return sb.substring(0, sb.length() - 1);
    }

    private int findCountRecords(ControllerDataBaseService controllerDB) throws SQLException{
        ResultSet resultSet = controllerDB.getStatement().executeQuery("select count(*) from "+nameTable+" where "+nameFieldIsChange+"=1;");
        resultSet.next();
        return resultSet.getInt(1);
    }

    private double[] findById(ControllerDataBaseService controllerDB, int id) throws SQLException {
        double[] X = new double[namesColumn.length];
        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "select "+columnsRow+","+nameIdField+" from "+nameTable+" where "+nameIdField+"="+id+";"
        );
        resultSet.next();
        for (int i = 0; i < X.length; i++) {
            X[i] = resultSet.getDouble(i+1);
        }
        return X;
    }
    private double[] findXc(ControllerDataBaseService controllerDB) throws SQLException{
        double[] Xc = new double[namesColumn.length];
        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "select "+columnsRowCount+" from "+nameTable+" where "+nameFieldIsChange+"=1;"
        );

        resultSet.next();
        for (int i = 0; i < Xc.length; i++) {
            Xc[i] = resultSet.getDouble(i+1);
        }

        return Xc;
    }
    private int squaredEuclideanDistance(ControllerDataBaseService controllerDB, double[] cur, boolean max) throws SQLException{
        double mid;
        if(max){
            mid = Double.MIN_VALUE;
        }else{
            mid = Double.MAX_VALUE;
        }
        double distance;
        int idRow = -1;

        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "select "+columnsRow+","+nameIdField+","+nameFieldIsChange+" from "+nameTable+" where "+nameFieldIsChange+"=1;"
        );

        while(resultSet.next()){

            distance = 0;
            for (int i = 0; i < namesColumn.length; i++) {
                distance += (cur[i]-resultSet.getDouble(i+1))*(cur[i]-resultSet.getDouble(i+1));
            }
            if(max){
                if(mid < distance){
                    mid = distance;
                    idRow = resultSet.getInt(namesColumn.length + 1);
                }
            }else{
                if(mid > distance){
                    mid = distance;
                    idRow = resultSet.getInt(namesColumn.length + 1);
                }
            }

        }
        return idRow;
    }
    private void setValueForGroup(ControllerDataBaseService controllerDB) throws SQLException {
        double[] mean = new double[namesColumn.length];
        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "select "+columnsRowCount+" from "+nameTable+" where "+nameFieldIsChange+"=2;"
        );

        resultSet.next();
        for (int i = 0; i < mean.length; i++) {
            mean[i] = resultSet.getDouble(i+1);
        }

        resultSet = controllerDB.getStatement().executeQuery(
                "select "+columnsRow+","+nameIdField+","+nameFieldIsChange+" from "+nameTable+" where "+nameFieldIsChange+"=2;"
        );
        while (resultSet.next()){
            for (int i = 0; i < mean.length; i++) {
                resultSet.updateObject(i + 1, mean[i]);
            }
            resultSet.updateInt(mean.length + 2, 0);
            resultSet.updateRow();
        }
    }


    private void formGroupByX(ControllerDataBaseService controllerDB, double[] X) throws SQLException{
        int id;
        for (int i = 0; i < k; i++) {
            id = squaredEuclideanDistance(controllerDB, X, false);
            if (id == -1) break;
            controllerDB.getStatement().execute("UPDATE "+nameTable+" SET "+nameFieldIsChange+"=2"+
                    " WHERE "+nameIdField+"="+id);
        }
        setValueForGroup(controllerDB);
    }

    private void formGroupByAll(ControllerDataBaseService controllerDB)throws SQLException{
        controllerDB.getStatement().execute("UPDATE "+nameTable+" SET "+nameFieldIsChange+"=2"+
                " WHERE "+nameFieldIsChange+"=1;");
        setValueForGroup(controllerDB);
    }

    @Override
    public void start(ControllerDataBaseService controllerDB) throws Exception {
        int Xr;
        int Xs;


        columnsRow = convertStringArrayToString(namesColumn);
        columnsRowCount = convertStringArrayToStringWithAVG(namesColumn);

        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN "+nameFieldIsChange+" INT DEFAULT 1;"
        );
        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN "+nameIdField+" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY;"
        );

        int countRecords = findCountRecords(controllerDB);

        while (countRecords >= 3*k){

            Xr = squaredEuclideanDistance(controllerDB, findXc(controllerDB), true);
            Xs = squaredEuclideanDistance(controllerDB, findById(controllerDB, Xr), true);

            formGroupByX(controllerDB, findById(controllerDB, Xr));
            formGroupByX(controllerDB, findById(controllerDB, Xs));
            countRecords = findCountRecords(controllerDB);
        }

        if(countRecords < 3*k && countRecords >=2*k){
            Xr = squaredEuclideanDistance(controllerDB, findXc(controllerDB), true);
            formGroupByX(controllerDB, findById(controllerDB, Xr));
            formGroupByAll(controllerDB);
        }else if(countRecords < 2*k){
            formGroupByAll(controllerDB);
        }


        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN "+nameIdField+";"
        );
        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN "+nameFieldIsChange+";"
        );
    }
}
