package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class ValueReplacementByPatternDto {
    private String nameTable;
    private String nameColumn;
    private String regex;
    private String replacement;
}
