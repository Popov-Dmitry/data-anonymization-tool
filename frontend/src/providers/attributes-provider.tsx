import React, { useState } from "react";

interface IAttributesContextInterface {
  attributes: string[];
  setAttributes: (attributes: string[]) => void;
}

interface Props {
  children: React.ReactNode;
}

const AttributesStateContext = React.createContext<
  IAttributesContextInterface | undefined
>(undefined);

export function AttributesProvider(props: Props) {
  const { children } = props;
  const [attributes, setAttributes] = useState<string[]>([]);

  return (
    <AttributesStateContext.Provider
      value={{
        attributes,
        setAttributes
      }}
    >
      {children}
    </AttributesStateContext.Provider>
  );
}

export function useAttributes() {
  const context = React.useContext(AttributesStateContext);
  if (context === undefined) {
    throw new Error("useAttributes must be used within a AttributesProvider");
  }
  return context;
}
