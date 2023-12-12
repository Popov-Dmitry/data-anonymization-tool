import React from "react";
import { AxiosProvider } from "./axios-provider";
import { MethodsInputsProvider } from "./methods-inputs-provider";
import { RiskAssessmentProvider } from "./risk-assessment-provider";
import { DatabaseConnectionProvider } from "./database-connection-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AxiosProvider>
      <DatabaseConnectionProvider>
        <MethodsInputsProvider>
          <RiskAssessmentProvider>
            {children}
          </RiskAssessmentProvider>
        </MethodsInputsProvider>
      </DatabaseConnectionProvider>
    </AxiosProvider>
  );
};

export default Providers;