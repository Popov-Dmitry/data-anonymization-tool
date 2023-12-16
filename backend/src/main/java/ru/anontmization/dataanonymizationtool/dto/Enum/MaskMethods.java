package ru.anontmization.dataanonymizationtool.dto.Enum;

import lombok.Getter;
import ru.anontmization.dataanonymizationtool.Methods.options.type.*;

@Getter
public enum MaskMethods {
    DateAging("DateAging", DateAging.class),
    Decomposition("Decomposition", Decomposition.class),
    GeneralizationString("GeneralizationString", GeneralizationString.class),
    GeneralizationValue("GeneralizationValue", GeneralizationValue.class),
    Identifier("Identifier", Identifier.class),
    MicroAggregation("MicroAggregation", MicroAggregation.class),
    MicroAggregationBySingleAxis("MicroAggregationBySingleAxis", MicroAggregationBySingleAxis.class),
    Round("Round", Round.class),
    Shuffle("Shuffle", Shuffle.class),
    ValueReplacement("ValueReplacement", ValueReplacement.class),
    ValueReplacementByPattern("ValueReplacementByPattern", ValueReplacementByPattern.class),
    ValueReplacementFromFile("ValueReplacementFromFile", ValueReplacementFromFile.class),
    ValueVariance("ValueVariance", ValueVariance.class);

    final String name;
    final Class<?> methodClass;

    MaskMethods(String name, Class<?> methodClass) {
        this.name = name;
        this.methodClass = methodClass;
    }

}
