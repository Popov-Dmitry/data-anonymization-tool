package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class DateAgingDto {
    private String nameTable;
    private String nameColumn;
    private int countDays;
}
