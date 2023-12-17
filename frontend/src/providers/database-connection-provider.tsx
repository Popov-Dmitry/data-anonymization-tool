import React, { useCallback, useState } from "react";

type TDatabase = "postgresql";

export interface DatabaseConnectionData {
  database: TDatabase;
  server: string;
  port: string;
  username: string;
  password: string;
  databaseName: string;
}

interface DatabaseConnectionContextInterface extends DatabaseConnectionData {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  updateDatabaseConnectionData: (value: DatabaseConnectionData) => void;
}

interface Props {
  children: React.ReactNode;
}

const DatabaseConnectionStateContext = React.createContext<
  DatabaseConnectionContextInterface | undefined
>(undefined);

export function DatabaseConnectionProvider(props: Props) {
  const { children } = props;
  const [database, setDatabase] = useState<TDatabase>("postgresql");
  const [server, setServer] = useState<string>("localhost");
  const [port, setPort] = useState<string>("5432");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [databaseName, setDatabaseName] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const updateDatabaseConnectionData = useCallback(
    (value: DatabaseConnectionData) => {
      setDatabase(value.database);
      setServer(value.server);
      setPort(value.port);
      setUsername(value.username);
      setPassword(value.password);
      setDatabaseName(value.databaseName);
    },
    []
  );

  return (
    <DatabaseConnectionStateContext.Provider
      value={{
        database,
        server,
        port,
        username,
        password,
        databaseName,
        isConnected,
        setIsConnected,
        updateDatabaseConnectionData
      }}
    >
      {children}
    </DatabaseConnectionStateContext.Provider>
  );
}

export function useDatabaseConnection() {
  const context = React.useContext(DatabaseConnectionStateContext);
  if (context === undefined) {
    throw new Error("useDatabaseConnection must be used within a DatabaseConnectionProvider");
  }
  return context;
}
