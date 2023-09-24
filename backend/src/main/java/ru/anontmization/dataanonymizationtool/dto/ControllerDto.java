package ru.anontmization.dataanonymizationtool.dto;

import lombok.Data;

@Data
public class ControllerDto {
    private String url;
    private String nameDB;
    private String user;
    private String password;
}
