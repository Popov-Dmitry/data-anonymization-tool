package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;

@Data
public class GeneralizationStringDto {
    private String nameTable;
    private String nameColumn;
    private String generalizationTable;
    private HashMap<String, String> value;
}
