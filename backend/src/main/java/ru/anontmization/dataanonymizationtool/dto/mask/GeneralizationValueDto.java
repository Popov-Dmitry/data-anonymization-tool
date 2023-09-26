package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

import java.util.ArrayList;

@Data
public class GeneralizationValueDto {
    private String nameTable;
    private String nameColumn;
    private String generalizationTable;
    private ArrayList<String> generalizationName;
    private ArrayList<?> minValue;
    private ArrayList<?> maxValue;
    private boolean isDate;
}
