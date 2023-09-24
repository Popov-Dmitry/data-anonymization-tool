package ru.anontmization.dataanonymizationtool.services;

import lombok.Data;
import org.springframework.stereotype.Service;

import java.sql.*;

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
