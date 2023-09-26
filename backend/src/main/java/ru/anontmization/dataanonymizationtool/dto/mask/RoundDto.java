package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class RoundDto {
    private String nameTable;
    private String nameColumn;
    private int precision;
}
