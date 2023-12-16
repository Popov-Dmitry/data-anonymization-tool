package ru.anontmization.dataanonymizationtool.services;

import lombok.Data;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import ru.anontmization.dataanonymizationtool.dto.AttributeTypeDto;

import java.sql.*;
import java.util.ArrayList;
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
    List<AttributeTypeDto> sensitive;
    List<AttributeTypeDto> quasiIdentifier;

    public boolean checkConnection() {
        try {
            connection = DriverManager.getConnection(url + nameDB, userName, password);
            statement = connection.createStatement();
            connection.close();
        } catch (SQLException e) {
            return false;
        }

        return true;
    }

    public void connect() {
        try {
            connection = DriverManager.getConnection(url + nameDB, userName, password);
            statement = connection.createStatement(
                    ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_UPDATABLE
            );
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void disconnect() {
        try {
            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void statementExecute(String sql) {
        try {
            statement.execute(sql);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public String getTableNames() {
        connect();
        ResultSet resultSet;
        StringBuilder tables = new StringBuilder();
        boolean isStart = true;
        tables.append("[");

        try {
            resultSet = statement.executeQuery("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';");
            while (resultSet.next()) {
                if (!isStart) {
                    tables.append(",");
                } else {
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

    public String getTable(String name) {
        connect();
        JSONArray result = new JSONArray();
        try {
            ResultSet resultSet = statement.executeQuery("SELECT * FROM " + name + ";");
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

    public List<String[]> getTableLikeList(String table, List<String> column) {
        List<String[]> source = new ArrayList<>();
        ArrayList<String> row;

        connect();
        AttributeTypeDto attributeTypeDto = new AttributeTypeDto();
        try {
            ResultSet resultSet = statement.executeQuery("SELECT * FROM " + table + ";");
            while (resultSet.next()) {
                row = new ArrayList<>();
                ArrayList<String> finalRow = row;
                column.forEach(cn -> {
                    try {
                        attributeTypeDto.setTable(table);
                        attributeTypeDto.setColumn(cn);
                        if (quasiIdentifier.contains(attributeTypeDto) || sensitive.contains(attributeTypeDto)){
                            Object value = resultSet.getObject(cn);
                            if (value != null) finalRow.add(value.toString());
                            else finalRow.add("NULL");
                        }
                    } catch (JSONException | SQLException e) {
                        e.printStackTrace();
                    }
                });
                source.add(row.toArray(new String[0]));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        disconnect();
        return source;
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
