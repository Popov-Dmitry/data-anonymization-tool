package ru.anontmization.dataanonymizationtool.services;

import lombok.Data;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.List;
import java.util.stream.IntStream;

@Data
@Service
public class ControllerDataBaseService {
    private String url;
    private String nameDB;
    private String userName;
    private String password;
    private Connection connection;
    private Statement statement;

    public boolean checkConnection() {
        try {
            connection = DriverManager.getConnection(url+nameDB,userName,password);
            statement = connection.createStatement();
            connection.close();
        } catch (SQLException e) {
            return false;
        }

        return true;
    }
    public void connect() {
        try {
            connection = DriverManager.getConnection(url+nameDB,userName,password);
            statement = connection.createStatement(
                    ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_UPDATABLE
            );
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void disconnect(){
        try {
            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void statementExecute(String sql){
        try {
            statement.execute(sql);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public String getTableNames(){
        connect();
        ResultSet resultSet;
        StringBuilder tables = new StringBuilder();
        boolean isStart = true;
        tables.append("[");

        try {
            resultSet = statement.executeQuery("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';");
            while(resultSet.next()){
                if (!isStart) {
                    tables.append(",");
                }else{
                    isStart = false;
                }
                tables.append("\"").append(resultSet.getString(1)).append("\"");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        disconnect();
        return tables.append("]").toString();
    }

    public String getTable(String name){
        connect();
        JSONArray result = new JSONArray();
        try {
            ResultSet resultSet = statement.executeQuery("SELECT * FROM "+name+";");
            ResultSetMetaData md = resultSet.getMetaData();
            int numCols = md.getColumnCount();
            List<String> colNames = IntStream.range(0, numCols)
                    .mapToObj(i -> {
                        try {
                            return md.getColumnName(i + 1);
                        } catch (SQLException e) {
                            e.printStackTrace();
                            return "?";
                        }
                    })
                    .toList();

            while (resultSet.next()) {
                JSONObject row = new JSONObject();
                colNames.forEach(cn -> {
                    try {
                        row.put(cn, resultSet.getObject(cn));
                    } catch (JSONException | SQLException e) {
                        e.printStackTrace();
                    }
                });
                result.put(row);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        disconnect();
        return result.toString();
    }

    @Override
    public String toString() {
        return "{" +
                "url='" + url + '\'' +
                ", nameDB='" + nameDB + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
