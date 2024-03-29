import "./Table.scss";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDatabaseConnection } from "../../providers/database-connection-provider";
import { useNavigate, useParams } from "react-router-dom";
import Methods from "../../components/methods/Methods";
import { bemElement } from "../../utils/bem-class-names";
import { Helmet } from "react-helmet";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";
import { useAxios } from "../../providers/axios-provider";
import { v4 as uuidv4 } from 'uuid';
import { useAttributes } from "../../providers/attributes-provider";

const baseClassName = "table-component";
const bem = bemElement(baseClassName);

const Table = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { isConnected } = useDatabaseConnection();
  const { setNameTable } = useMethodsInputs();
  const { setAttributes } = useAttributes();
  const { api } = useAxios();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any>([]);
  const dataGridRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (name) {
      setNameTable(name);
      (async () => {
        try {
          const { data } =  await api.get(`/tables/${name}`);
          if (data.length > 0 && dataGridRef.current) {
            setRows(data);
            const columnWidth = dataGridRef.current?.clientWidth / Object.keys(data[0]).length;
            setColumns(Object.keys(data[0]).map((key) => ({ field: key, width: columnWidth })));
            setAttributes(Object.keys(data[0]));
          }
        } catch (e: any) {
          alert(e.message)
        }
      })();
    }
  }, [api, name, setAttributes, setNameTable]);

  useEffect(() => {
    document.getElementsByTagName("main")[0].classList.remove("max-w-1200px");

    return () => {
      document.getElementsByTagName("main")[0].classList.add("max-w-1200px");
    }
  }, []);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta property="og:title" content={name} />
      </Helmet>
      <div className={baseClassName}>
        <div className={bem("data")}>
          <DataGrid
            ref={dataGridRef}
            rows={rows}
            columns={columns}
            editMode="row"
            getRowId={() => uuidv4()}
          />
        </div>
        <Methods />
      </div>
    </>
  );
};

export default Table;