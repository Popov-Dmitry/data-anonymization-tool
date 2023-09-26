package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class ValueVarianceDto {
    private String nameTable;
    private String nameColumn;
    private int percent;
    private String dataType;
}
