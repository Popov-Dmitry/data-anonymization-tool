import React, { useCallback, useEffect, useState } from "react";

type TMethod = "Shuffle" | "ValueReplacement" | "DateAging" | "Decomposition"
  | "GeneralizationString" | "GeneralizationValue" | "Identifier"
  | "MicroAggregationBySingleAxis" | "MicroAggregation" | "Round"
  | "ValueReplacementByPattern" | "ValueReplacementFromFile" | "ValueVariance";

interface IMethodsInputsData {
  method: TMethod;
  params: any;
}

interface MethodsInputsContextInterface {
  isTriggered: boolean;
  triggerDataCollecting: () => void;
  nameTable: string;
  setNameTable: (nameTable: string) => void;
  data: any;
  addData: (values: IMethodsInputsData[]) => void;
}

interface Props {
  children: React.ReactNode;
}

const MethodsInputsStateContext = React.createContext<
  MethodsInputsContextInterface | undefined
>(undefined);

export function MethodsInputsProvider(props: Props) {
  const { children } = props;
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [nameTable, setNameTable] = useState<string>("");
  const [data, setData] = useState<IMethodsInputsData[]>([]);

  useEffect(() => {
    setData([]);
  }, [nameTable]);

  const triggerDataCollecting = useCallback(
    () => {
      setData((prevState) => prevState.map((value) =>
        ({ ...value, params: { ...value.params, nameTable } })));
      setIsTriggered(true);
    },
    [nameTable]
  );

  const addData = useCallback(
    (values: IMethodsInputsData[]) => {
      setData((prevState) => [...prevState, ...values]);
    },
    []
  );

  return (
    <MethodsInputsStateContext.Provider
      value={{
        isTriggered,
        triggerDataCollecting,
        nameTable,
        setNameTable,
        data,
        addData
      }}
    >
      {children}
    </MethodsInputsStateContext.Provider>
  );
}

export function useMethodsInputs() {
  const context = React.useContext(MethodsInputsStateContext);
  if (context === undefined) {
    throw new Error("useMethodsInputs must be used within a MethodsInputsProvider");
  }
  return context;
}
