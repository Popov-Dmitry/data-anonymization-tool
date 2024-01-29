import React, { useCallback, useState } from "react";
import { useAttributes } from "./attributes-provider";

export type TAttributeType = "identifier" | "quasi-identifier" | "sensitive" | "insensitive";
export type TAttributeDataType = "string" | "integer" | "decimal" | "ordinal" | "date";

interface IAttributeType {
  name: string;
  type: TAttributeType;
}

interface IAttributeDataType {
  name: string;
  dataType: TAttributeDataType;
}

interface IAttributesTypesContextInterface {
  attributesType: IAttributeType[];
  attributesDataType: IAttributeDataType[];
  changeAttributeType: (value: IAttributeType) => void;
  changeAttributeDataType: (value: IAttributeDataType) => void;
}

interface Props {
  children: React.ReactNode;
}

const AttributesTypesStateContext = React.createContext<
  IAttributesTypesContextInterface | undefined
>(undefined);

export function AttributesTypesProvider(props: Props) {
  const { children } = props;
  const { attributes } = useAttributes();
  const [attributesType, setAttributesType] = useState<IAttributeType[]>(
    attributes.map((attribute: string) => ({ name: attribute, type: "identifier" }))
  );
  const [attributesDataType, setAttributesDataType] = useState<IAttributeDataType[]>(
    attributes.map((attribute: string) => ({ name: attribute, dataType: "string" }))
  );

  const changeAttributeType = useCallback((value: IAttributeType) => {
    setAttributesType((prevState: IAttributeType[]) => prevState.map((attribute: IAttributeType) =>
      (attribute.name === value.name ? value : attribute)));
  }, []);

  const changeAttributeDataType = useCallback((value: IAttributeDataType) => {
    setAttributesDataType((prevState: IAttributeDataType[]) => prevState.map((attribute: IAttributeDataType) =>
      (attribute.name === value.name ? value : attribute)));
  }, []);

  return (
    <AttributesTypesStateContext.Provider
      value={{
        attributesType,
        attributesDataType,
        changeAttributeType,
        changeAttributeDataType
      }}
    >
      {children}
    </AttributesTypesStateContext.Provider>
  );
}

export function useAttributesTypes() {
  const context = React.useContext(AttributesTypesStateContext);
  if (context === undefined) {
    throw new Error("useAttributesTypes must be used within a AttributesTypesProvider");
  }
  return context;
}
