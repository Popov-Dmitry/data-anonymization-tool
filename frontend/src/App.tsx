import React from "react";
import Router from "./router";
import { DatabaseConnectionProvider } from "./providers/database-connection-provider";
import { MethodsInputsProvider } from "./providers/methods-inputs-provider";

function App() {
  return (
    <div className="App">
      <DatabaseConnectionProvider>
        <MethodsInputsProvider>
          <Router />
        </MethodsInputsProvider>
      </DatabaseConnectionProvider>
    </div>
  );
}

export default App;
