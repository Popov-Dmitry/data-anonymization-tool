package ru.anontmization.dataanonymizationtool.utils;

import java.util.stream.LongStream;

public class Factorial {
    public static long calculate(int n) {
        return LongStream.rangeClosed(1, n).reduce(1, (long x, long y) -> x * y);
    }
}
