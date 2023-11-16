import React, { useCallback, useState } from "react";

export type TRiskAssessmentMethod = "prosecutorMetricA" | "prosecutorMetricB" |
  "prosecutorMetricC" | "withoutIdentificationTable";
export type TAttributeType = "identifier" | "quasi-identifier" | "sensitive";

interface IAttribute {
  name: string;
  type: TAttributeType;
}

interface IRiskAssessmentMethod {
  method: TRiskAssessmentMethod;
  param?: number;
}

interface IRiskAssessmentContextInterface {
  attributesType: IAttribute[];
  method: IRiskAssessmentMethod | undefined;
  initAttributesType: (attributes: string[]) => void;
  changeAttributeType: (value: IAttribute) => void;
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
  const [attributesType, setAttributesType] = useState<IAttribute[]>([]);
  const [method, setMethod] = useState<IRiskAssessmentMethod | undefined>();

  const initAttributesType = useCallback((attributes: string[]) => {
    setAttributesType(attributes.map((attribute: string) => ({ name: attribute, type: "identifier" })));
  }, []);

  const changeAttributeType = useCallback((value: IAttribute) => {
    setAttributesType((prevState: IAttribute[]) => prevState.map((attribute: IAttribute) =>
      (attribute.name === value.name ? value : attribute)));
  }, []);

  return (
    <RiskAssessmentStateContext.Provider
      value={{
        attributesType,
        method,
        initAttributesType,
        changeAttributeType,
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
