package ru.anontmization.dataanonymizationtool.services;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.Methods.options.type.*;
import ru.anontmization.dataanonymizationtool.dto.StatisticDto;
import ru.anontmization.dataanonymizationtool.dto.StatisticResponseDto;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@Service
@RequiredArgsConstructor
public class StatisticService {

    private final ControllerDataBaseService controllerDB;

    private String table;
    private String column;

    private int countExtraStatic;

    private List<String> methodsForStatistic;
    private List<String> methodsForStatisticExtra;

    private List<StatisticDto> statisticNotMask;
    private List<StatisticDto> statisticMask;

    {
        methodsForStatistic = new ArrayList<>(
                Arrays.asList(
                        GeneralizationString.class.getSimpleName(),
                        GeneralizationValue.class.getSimpleName(),
                        MicroAggregation.class.getSimpleName(),
                        MicroAggregationBySingleAxis.class.getSimpleName(),
                        ValueReplacementByPattern.class.getSimpleName(),
                        ValueReplacementFromFile.class.getSimpleName()
                )
        );

        methodsForStatisticExtra = new ArrayList<>(
                Arrays.asList(
                        MicroAggregation.class.getSimpleName(),
                        MicroAggregationBySingleAxis.class.getSimpleName()
                )
        );
    }

    public void setStatistic(){
        statisticNotMask = new ArrayList<>();
        statisticMask = new ArrayList<>();
    }

    public StatisticResponseDto getStatistic(){
        double min = 0;
        double max = 0;
        double avg = 0;
        double RMSE = 0;
        double MSE = 0;
        double MD = 0;
        double Shannon = 0;
        countExtraStatic /= 2;

        for (int i = 0; i < statisticMask.size(); i++) {
            min += calculatePercent(statisticMask.get(i).getMin(), statisticNotMask.get(i).getMin());
            max += calculatePercent(statisticMask.get(i).getMax(), statisticNotMask.get(i).getMax());
            avg += calculatePercent(statisticMask.get(i).getAvg(), statisticNotMask.get(i).getAvg());
            RMSE += calculatePercent(statisticMask.get(i).getRMSE(), statisticNotMask.get(i).getRMSE());
            MSE += calculatePercent(statisticMask.get(i).getMSE(), statisticNotMask.get(i).getMSE());
            MD += calculatePercent(statisticMask.get(i).getMD(), statisticNotMask.get(i).getMD());
            Shannon += calculatePercent(statisticMask.get(i).getShannon(), statisticNotMask.get(i).getShannon());
        }

        return StatisticResponseDto
                .builder()
                .min(BigDecimal.valueOf(min/countExtraStatic))
                .max(BigDecimal.valueOf(max/countExtraStatic))
                .avg(BigDecimal.valueOf(avg/countExtraStatic))
                .RMSE(BigDecimal.valueOf(RMSE/countExtraStatic))
                .MSE(BigDecimal.valueOf(MSE/countExtraStatic))
                .MD(BigDecimal.valueOf(MD/countExtraStatic))
                .Shannon(BigDecimal.valueOf(Shannon/statisticMask.size()))
                .build();
    }

    public void setNotMaskStatistic(MaskItem mask, String method){
        if (!methodsForStatistic.contains(method)) return;
        statisticNotMask.addAll(getStatic(mask, method));
    }

    public void setMaskStatistic(MaskItem mask, String method){
        if (!methodsForStatistic.contains(method)) return;
        statisticMask.addAll(getStatic(mask, method));
    }

    private List<StatisticDto> getStatic(MaskItem mask, String method){
        List<StatisticDto> list = new ArrayList<>();

        table = mask.getTable();
        controllerDB.connect();
        mask.getColum().forEach(
                col -> {
                    column = col;
                    StatisticDto.StatisticDtoBuilder statisticBuilder = StatisticDto
                            .builder()
                            .table(table)
                            .column(column)
                            .Shannon(getShannon());
                    if (methodsForStatisticExtra.contains(method)) {
                        countExtraStatic++;
                        statisticBuilder
                                .min(getMin())
                                .max(getMax())
                                .avg(getAverage())
                                .avg(getAverage())
                                .RMSE(getRMSE())
                                .MSE(getMSE())
                                .MD(getMD());
                    }
                    list.add(statisticBuilder.build());
                }
        );
        controllerDB.disconnect();

        return list;
    }

    private double getMin(){
        ResultSet resultSet;
        try {
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT min("+column+") " +
                            "FROM "+table+";"
            );
            resultSet.next();
            return resultSet.getDouble(1);
        } catch (SQLException e){
            System.out.println("Всё, конец!");
        }
        return 0;
    }

    private double getMax(){
        ResultSet resultSet;
        try {
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT max("+column+") " +
                            "FROM "+table+";"
            );
            resultSet.next();
            return resultSet.getDouble(1);
        } catch (SQLException e){
            System.out.println("Всё, конец!");
        }
        return 0;
    }

    private double getAverage(){
        ResultSet resultSet;
        try {
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT avg("+column+") " +
                            "FROM "+table+";"
            );
            resultSet.next();
            return resultSet.getDouble(1);
        } catch (SQLException e){
            System.out.println("Всё, конец!");
        }
        return 0;
    }

    private double getRMSE(){
        return Math.sqrt(getMSE());
    }

    private double getMSE(){
        ResultSet resultSet;
        try {
            double sumOfSquaredErrors = 0.0;
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT "+column +
                            " FROM "+table+";"
            );

            while(resultSet.next()){
                double value = resultSet.getDouble(1);
                sumOfSquaredErrors += Math.pow(value, 2);
            }

            return sumOfSquaredErrors / getCount();
        } catch (SQLException e){
            System.out.println("Всё, конец!");
        }
        return 0;
    }

    private double getMD(){
        double avg = getAverage();
        ResultSet resultSet;
        try {
            double meanDeviation = 0.0;
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT "+column +
                            " FROM "+table+";"
            );

            while(resultSet.next()){
                double value = resultSet.getDouble(1);
                meanDeviation += Math.abs(value - avg);
            }

            return meanDeviation / getCount();
        } catch (SQLException e){
            System.out.println("Всё, конец!");
        }
        return 0;
    }


    private double getShannon(){
        List<Integer> uniqueCount = getUniqueCount();
        int count = getCount();

        if (uniqueCount != null) {
            return uniqueCount.stream().mapToDouble(unq -> (double) unq / count).map(value -> Math.abs((value) * log2(value))).sum();
        }
        return 0;
    }


    private List<Integer> getUniqueCount(){
        List<Integer> list = new ArrayList<>();
        ResultSet resultSet;
        try {
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT count(*) "+
                            "FROM "+table+" group by "+column+";"
            );
            while(resultSet.next()){
                list.add(resultSet.getInt(1));
            }

            return list;
        } catch (SQLException e){
            System.out.println("Всё, конец!");
        }
        return null;
    }

    private int getCount(){
        ResultSet resultSet;
        try {
            resultSet = controllerDB.getStatement().executeQuery(
                    "SELECT count("+column +") "+
                            "FROM "+table+";"
            );
            resultSet.next();
            return resultSet.getInt(1);
        } catch (SQLException e){
            System.out.println("Всё, конец!");
        }
        return 0;
    }

    private double log2(double x){
        return Math.log(x)/Math.log(2);
    }

    private double calculatePercent(double maskVal, double notMaskVal){
        if (notMaskVal == 0) return 0;
        return Math.abs(1 - maskVal/notMaskVal) * 100;
    }
}
