import React from "react";
import Router from "./router";
import { DatabaseConnectionProvider } from "./providers/database-connection-provider";
import { MethodsInputsProvider } from "./providers/methods-inputs-provider";
import { RiskAssessmentProvider } from "./providers/risk-assessment-provider";

function App() {
  return (
    <div className="App">
      <DatabaseConnectionProvider>
        <MethodsInputsProvider>
          <RiskAssessmentProvider>
            <Router />
          </RiskAssessmentProvider>
        </MethodsInputsProvider>
      </DatabaseConnectionProvider>
    </div>
  );
}

export default App;
