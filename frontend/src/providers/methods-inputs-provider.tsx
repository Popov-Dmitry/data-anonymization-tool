import React, { useCallback, useEffect, useState } from "react";

interface IMethodsInputsData {
  id: string;
  method: string;
  params: any;
}

interface MethodsInputsContextInterface {
  nameTable: string;
  setNameTable: (nameTable: string) => void;
  data: any;
  addData: (values: IMethodsInputsData[]) => void;
  deleteDataByIds: (ids: string[]) => void;
  getData: (method: string) => IMethodsInputsData[];
}

interface Props {
  children: React.ReactNode;
}

const MethodsInputsStateContext = React.createContext<
  MethodsInputsContextInterface | undefined
>(undefined);

export function MethodsInputsProvider(props: Props) {
  const { children } = props;
  const [nameTable, setNameTable] = useState<string>("");
  const [data, setData] = useState<IMethodsInputsData[]>([]);

  useEffect(() => {
    setData([]);
  }, [nameTable]);

  const addData = useCallback(
    (values: IMethodsInputsData[]) => {
      setData((prevState) => [
        ...prevState, ...values.map((value) => ({ ...value, params: { ...value.params, nameTable } }))
      ]);
    },
    [nameTable]
  );

  const deleteDataByIds = useCallback(
    (ids: string[]) => {
      setData((prevState) =>
        (prevState.filter((value) => !ids.some((id) => id === value.id))));
    },
    []
  );

  const getData = useCallback(
    (method: string): IMethodsInputsData[] =>
      (data.filter((value) => value.method === method)),
    [data]
  );

  return (
    <MethodsInputsStateContext.Provider
      value={{
        nameTable,
        setNameTable,
        data,
        addData,
        deleteDataByIds,
        getData
      }}
    >
      {children}
    </MethodsInputsStateContext.Provider>
  );
}

export function useMethodsInputs() {
  const context = React.useContext(MethodsInputsStateContext);
  if (context === undefined) {
    throw new Error("useMethodsInputs must be used within a AxiosProvider");
  }
  return context;
}
