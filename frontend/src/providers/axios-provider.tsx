import React from "react";
import axios, { AxiosInstance } from "axios";

interface AxiosContextInterface {
  api: AxiosInstance;
  axios: AxiosInstance;
}

interface Props {
  children: React.ReactNode;
}

const AxiosStateContext = React.createContext<
  AxiosContextInterface | undefined
>(undefined);

export function AxiosProvider(props: Props) {
  const { children } = props;

  const api = axios.create({
    baseURL: "http://localhost:9090/api/v1",
    headers: {
      accepts: "application/json",
      "content-type": "application/json"
    }
  });

  return (
    <AxiosStateContext.Provider value={{ api, axios }}>
      {children}
    </AxiosStateContext.Provider>
  );
}

export function useAxios() {
  const context = React.useContext(AxiosStateContext);
  if (context === undefined) {
    throw new Error("useAxios must be used within a AxiosProvider");
  }
  return context;
}
