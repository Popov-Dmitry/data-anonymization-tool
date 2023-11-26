package ru.anontmization.dataanonymizationtool.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class StatisticResponseDto {
    private BigDecimal min;
    private BigDecimal max;
    private BigDecimal avg;
    private BigDecimal RMSE;
    private BigDecimal MSE;
    private BigDecimal MD;
    private BigDecimal Shannon;
}
