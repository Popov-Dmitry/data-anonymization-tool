package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class MicroAggregationDto {
    private String nameTable;
    private String[] namesColumn;
    private int k;
}
