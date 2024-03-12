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
    List<AttributeTypeDto> identifier;

    public boolean checkConnection() {
        try {
            connection = DriverManager.getConnection(url + nameDB, userName, password);
            connection.createStatement();
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
        connect();
        try {
            statement.execute(sql);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        disconnect();
    }

    public ResultSet statementExecuteQuery(String sql) {
        ResultSet resultSet;
        connect();
        try {
            resultSet = statement.executeQuery(sql);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        disconnect();
        return resultSet;
    }
    public List<String> getTableNames() {
        connect();
        ResultSet resultSet;
        List<String> tables = new ArrayList<>();

        try {
            resultSet = statement.executeQuery("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';");
            while (resultSet.next()) {
                tables.add(resultSet.getString(1));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        disconnect();
        return tables;
    }

    public List<String> getColumnNames(String tableName) {
        connect();
        ResultSet resultSet;
        List<String> columns = new ArrayList<>();

        try {
            resultSet = statement.executeQuery("SELECT * FROM "+tableName+";");
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();
            for (int i = 1; i <= columnCount; i++ ) {
                columns.add(metaData.getColumnName(i));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        disconnect();
        return columns;
    }

    public String getTable(String name, int page) {
        connect();
        JSONArray result = new JSONArray();
        page *= 100;
        try {
            ResultSet resultSet = statement.executeQuery("SELECT * FROM "+name+" offset "+page+" limit 100;");
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
        boolean isEmpty = true;

        AttributeTypeDto attributeTypeDto = new AttributeTypeDto();
        try {
            for (String s : column) {
                try {
                    attributeTypeDto.setTable(table);
                    attributeTypeDto.setColumn(s);
                    if (quasiIdentifier.contains(attributeTypeDto) || identifier.contains(attributeTypeDto)) {
                        isEmpty = false;
                    }
                } catch (JSONException ignore) {}
            }
            if (isEmpty) return List.of();

            ResultSet resultSet = statementExecuteQuery("SELECT * FROM " + table + ";");
            while (resultSet.next()) {
                row = new ArrayList<>();
                ArrayList<String> finalRow = row;
                column.forEach(cn -> {
                    try {
                        attributeTypeDto.setTable(table);
                        attributeTypeDto.setColumn(cn);
                        if(sensitive.contains(attributeTypeDto))return;
                        if (quasiIdentifier.contains(attributeTypeDto) || identifier.contains(attributeTypeDto)){
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
