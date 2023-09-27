package ru.anontmization.dataanonymizationtool.dto.mask;

import lombok.Data;
import ru.anontmization.dataanonymizationtool.Methods.options.type.ValueVariance;

@Data
public class ValueVarianceDto {
    private String nameTable;
    private String nameColumn;
    private int percent;
    private ValueVariance.DataType dataType;
}
