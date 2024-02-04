import React, { useState } from "react";

export type TRiskAssessmentMethod = "prosecutorMetricA" | "prosecutorMetricB" |
  "prosecutorMetricC" | "withoutIdentificationTable";

interface IRiskAssessmentMethod {
  method: TRiskAssessmentMethod;
  param?: number;
}

interface IRiskAssessmentContextInterface {
  method: IRiskAssessmentMethod | undefined;
  setMethod: (riskAssessmentData: IRiskAssessmentMethod) => void;
}

interface Props {
  children: React.ReactNode;
}

const RiskAssessmentStateContext = React.createContext<
  IRiskAssessmentContextInterface | undefined
>(undefined);

export function RiskAssessmentProvider(props: Props) {
  const { children } = props;
  const [method, setMethod] = useState<IRiskAssessmentMethod | undefined>();

  return (
    <RiskAssessmentStateContext.Provider
      value={{
        method,
        setMethod
      }}
    >
      {children}
    </RiskAssessmentStateContext.Provider>
  );
}

export function useRiskAssessment() {
  const context = React.useContext(RiskAssessmentStateContext);
  if (context === undefined) {
    throw new Error("useRiskAssessment must be used within a RiskAssessmentProvider");
  }
  return context;
}
