package ru.anontmization.dataanonymizationtool.services;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.Methods.options.type.*;
import ru.anontmization.dataanonymizationtool.dto.Enum.RiskEnum;
import ru.anontmization.dataanonymizationtool.dto.RiskDto;
import ru.anontmization.dataanonymizationtool.dto.StatisticDto;
import ru.anontmization.dataanonymizationtool.dto.StatisticResponseDto;
import ru.anontmization.dataanonymizationtool.utils.EquivalenceClasses;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static ru.anontmization.dataanonymizationtool.Methods.risk.RiskAssessment.*;

@Data
@Service
@RequiredArgsConstructor
public class StatisticService {

    private final ControllerDataBaseService controllerDB;
    private RiskDto riskMethod;

    private String table;
    private String column;

    private int countExtraStatic;

    private List<String> methodsForStatistic;
    private List<String> methodsForStatisticExtra;

    private List<StatisticDto> statisticNotMask;
    private List<StatisticDto> statisticMask;

    private double riskResult;

    private StatisticResponseDto result;
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
        result = null;
        countExtraStatic = 0;
        statisticNotMask = new ArrayList<>();
        statisticMask = new ArrayList<>();
    }

    public StatisticResponseDto getStatistic(){
        if (result != null) return result;

        double min = 0;
        double max = 0;
        double avg = 0;
        double RMSE = 0;
        double MSE = 0;
        double MD = 0;
        double Shannon = 0;

        for (int i = 0; i < statisticMask.size(); i++) {
            min += calculatePercent(statisticMask.get(i).getMin(), statisticNotMask.get(i).getMin());
            max += calculatePercent(statisticMask.get(i).getMax(), statisticNotMask.get(i).getMax());
            avg += calculatePercent(statisticMask.get(i).getAvg(), statisticNotMask.get(i).getAvg());
            RMSE += calculatePercent(statisticMask.get(i).getRMSE(), statisticNotMask.get(i).getRMSE());
            MSE += calculatePercent(statisticMask.get(i).getMSE(), statisticNotMask.get(i).getMSE());
            MD += calculatePercent(statisticMask.get(i).getMD(), statisticNotMask.get(i).getMD());
            Shannon += calculatePercent(statisticMask.get(i).getShannon(), statisticNotMask.get(i).getShannon());
        }

        StatisticResponseDto.StatisticResponseDtoBuilder responseDto = StatisticResponseDto.builder();

        if (countExtraStatic != 0){
            responseDto
                    .min(BigDecimal.valueOf(min/countExtraStatic))
                    .max(BigDecimal.valueOf(max/countExtraStatic))
                    .avg(BigDecimal.valueOf(avg/countExtraStatic))
                    .RMSE(BigDecimal.valueOf(RMSE/countExtraStatic))
                    .MSE(BigDecimal.valueOf(MSE/countExtraStatic))
                    .MD(BigDecimal.valueOf(MD/countExtraStatic));
        } else {
            responseDto
                    .min(null)
                    .max(null)
                    .avg(null)
                    .RMSE(null)
                    .MSE(null)
                    .MD(null);
        }
        if (Shannon != 0) {
            result = responseDto
                    .Shannon(BigDecimal.valueOf(Shannon/statisticMask.size()))
                    .risk(riskResult)
                    .build();
        }


        return result;
    }

    public void setNotMaskStatistic(MaskItem mask, String method){
        if (!methodsForStatistic.contains(method)) return;
        statisticNotMask.addAll(getStatic(mask, method, false));
    }

    public void setMaskStatistic(MaskItem mask, String method){
        if (!methodsForStatistic.contains(method)) return;
        statisticMask.addAll(getStatic(mask, method, true));
    }

    public void calculateRisk(){
        List<String> tables = controllerDB.getTableNames();
        double risk = 0;
        int n = 0;

        for (String s : tables) {
            List<String[]> tableList = controllerDB.getTableLikeList(s, controllerDB.getColumnNames(s));
            long size = tableList.size();
            if (tableList.isEmpty()) continue;
            if (tableList.get(0).length == 0) continue;

            Map<String[], Integer> equivalence = EquivalenceClasses.execute(tableList);
            switch (RiskEnum.findByName(riskMethod.getName())) {
                case PROSECUTOR_METRIC_A ->
                        risk += calculateProsecutorMetricA(equivalence, size, riskMethod.getProportion());
                case PROSECUTOR_METRIC_B -> risk += calculateProsecutorMetricB(equivalence);
                case PROSECUTOR_METRIC_C -> risk += calculateProsecutorMetricC(equivalence, size);
                case GLOBAL_RISK -> risk += calculateGlobalRisk(equivalence, riskMethod.getProportion(), size);
            }
            n++;
        }

        if (n != 0) riskResult = risk/n;
    }

    private List<StatisticDto> getStatic(MaskItem mask, String method, boolean isMask){
        List<StatisticDto> list = new ArrayList<>();
        table = mask.getTable();

        mask.getColum().forEach(
                col -> {
                    column = col;
                    StatisticDto.StatisticDtoBuilder statisticBuilder = StatisticDto
                            .builder()
                            .table(table)
                            .column(column)
                            .Shannon(getShannon());
                    if (methodsForStatisticExtra.contains(method)) {
                        if(isMask) countExtraStatic++;
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
        return list;
    }

    private double getMin(){
        ResultSet resultSet;
        try {
            resultSet = controllerDB.statementExecuteQuery(
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
            resultSet = controllerDB.statementExecuteQuery(
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
            resultSet = controllerDB.statementExecuteQuery(
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
            resultSet = controllerDB.statementExecuteQuery(
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
            resultSet = controllerDB.statementExecuteQuery(
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
            resultSet = controllerDB.statementExecuteQuery(
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
            resultSet = controllerDB.statementExecuteQuery(
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
