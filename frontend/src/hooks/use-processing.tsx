import { useEffect, useState } from "react";
import { useMethodsInputs } from "../providers/methods-inputs-provider";
import { useRiskAssessment } from "../providers/risk-assessment-provider";
import { useAttributesTypes } from "../providers/attributes-types-provider";

const useProcessing = () => {
  const { nameTable, data, isTriggered } = useMethodsInputs();
  const { method } = useRiskAssessment();
  const { attributesType } = useAttributesTypes();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (isTriggered) {
      setIsProcessing(true);
      const riskDto = {
        methodRisk: method?.method,
        proportion: method?.param,
        sensitive: attributesType.filter((attribute) => attribute.type === "sensitive")
          .map((attribute) => ({ table: nameTable, column: attribute.name })),
        quasiIdentifier: attributesType.filter((attribute) => attribute.type === "quasi-identifier")
          .map((attribute) => ({ table: nameTable, column: attribute.name }))
      };

    }
    setIsProcessing(false);
  }, []);

  return {
    isProcessing
  };
};

export default useProcessing;