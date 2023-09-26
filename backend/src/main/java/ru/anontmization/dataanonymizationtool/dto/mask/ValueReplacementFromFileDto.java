package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class ValueReplacementFromFileDto {
    private String nameTable;
    private String nameColumn;
    private String nameFile;
}
