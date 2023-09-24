package ru.anontmization.dataanonymizationtool.Methods.controllers;

import lombok.Getter;

import java.sql.*;

@Getter
public class ControllerDB {

    private String url;
    private String nameDB;
    private final String userName;
    private final String password;
    private Connection connection;
    private Statement statement;

    public ControllerDB(String url, String nameDB, String userName, String password) {
        this.url = url;
        this.nameDB = nameDB;
        this.userName = userName;
        this.password = password;
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
}
