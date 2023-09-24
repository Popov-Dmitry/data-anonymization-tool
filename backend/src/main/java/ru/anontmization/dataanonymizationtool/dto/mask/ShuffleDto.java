package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class ShuffleDto {
    private String id;
    private String nameTable;
    private String[] namesColumn;
}
