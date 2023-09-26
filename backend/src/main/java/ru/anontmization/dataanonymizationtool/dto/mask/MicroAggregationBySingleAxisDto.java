package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class MicroAggregationBySingleAxisDto {
    private String nameTable;
    private int k;
    private String axisColumn;
    private String[] namesColumn;
}
