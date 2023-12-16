package ru.anontmization.dataanonymizationtool.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatisticDto {
    private String table;
    private String column;
    private double min;
    private double max;
    private double avg;
    private double RMSE;
    private double MSE;
    private double MD;
    private double Shannon;
    private double risk;
}
