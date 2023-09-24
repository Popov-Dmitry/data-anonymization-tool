import React from 'react';
import Router from "./router";
import {DatabaseConnectionProvider} from "./providers/database-connection-provider";

function App() {
  return (
    <div className="App">
      <DatabaseConnectionProvider>
        <Router />
      </DatabaseConnectionProvider>
    </div>
  );
}

export default App;
