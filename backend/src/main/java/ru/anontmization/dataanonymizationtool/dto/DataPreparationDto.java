package ru.anontmization.dataanonymizationtool.dto;

import lombok.Data;

@Data
public class DataPreparationDto {
    private String tableName;
    private String columnName;
    private String preparationMethod;
}
