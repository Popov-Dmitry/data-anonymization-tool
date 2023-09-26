package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

import java.util.ArrayList;

@Data
public class GeneralizationStringDto {
    private String nameTable;
    private String nameColumn;
    private String generalizationTable;
    private ArrayList<String> valueFrom;
    private ArrayList<String> valueTo;
}
