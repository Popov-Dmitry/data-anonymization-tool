import React from "react";
import { AxiosProvider } from "./axios-provider";
import { MethodsInputsProvider } from "./methods-inputs-provider";
import { RiskAssessmentProvider } from "./risk-assessment-provider";
import { DatabaseConnectionProvider } from "./database-connection-provider";
import { AttributesProvider } from "./attributes-provider";
import { AttributesTypesProvider } from "./attributes-types-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AxiosProvider>
      <DatabaseConnectionProvider>
        <AttributesProvider>
          <AttributesTypesProvider>
            <MethodsInputsProvider>
              <RiskAssessmentProvider>
                {children}
              </RiskAssessmentProvider>
            </MethodsInputsProvider>
          </AttributesTypesProvider>
        </AttributesProvider>
      </DatabaseConnectionProvider>
    </AxiosProvider>
  );
};

export default Providers;