package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class ValueReplacementDto {
    private String nameTable;
    private String nameColumn;
    private Object value;
}
