package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class DecompositionDto {
    private String nameTable;
    private String nameColumn;
    private String nameNewTable;
    private String url;
    private String nameDB;
    private String userName;
    private String password;
}
