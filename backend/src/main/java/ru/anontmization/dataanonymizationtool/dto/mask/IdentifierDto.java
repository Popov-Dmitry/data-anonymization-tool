package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;

@Data
public class IdentifierDto {
    private String nameTable;
    private String[] namesColumn;
    private String newNameTable;
}
