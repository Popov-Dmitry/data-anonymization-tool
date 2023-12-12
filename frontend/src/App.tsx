import React from "react";
import Router from "./router";
import Providers from "./providers";

function App() {
  return (
    <div className="App">
      <Providers>
        <Router />
      </Providers>
    </div>
  );
}

export default App;
