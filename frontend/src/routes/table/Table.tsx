import "./Table.scss";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDatabaseConnection } from "../../providers/database-connection-provider";
import { useNavigate, useParams } from "react-router-dom";
import Methods from "../../components/methods/Methods";
import { bemElement } from "../../utils/bem-class-names";
import { Helmet } from "react-helmet";
import { useMethodsInputs } from "../../providers/methods-inputs-provider";
import { useAxios } from "../../providers/axios-provider";
import { v4 as uuidv4 } from 'uuid';

const baseClassName = "table-component";
const bem = bemElement(baseClassName);

const Table = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { isConnected } = useDatabaseConnection();
  const { setNameTable } = useMethodsInputs();
  const { api } = useAxios();
  const [columns, setColumns] = useState<GridColDef[]>();
  const [rows, setRows] = useState<any>();

  useEffect(() => {
    if (name) {
      setNameTable(name);
      (async () => {
        try {
          const { data } =  await api.get(`/tables/${name}`);
          if (data.length > 0) {
            setRows(data);
            setColumns(Object.keys(data[0]).map((key) => ({ field: key })));
          }
        } catch (e: any) {
          alert(e.message)
        }
      })();
    }
  }, [api, name, setNameTable]);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  if (!rows || !columns) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta property="og:title" content={name} />
      </Helmet>
      <div className={baseClassName}>
        <div className={bem("data")}>
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            getRowId={() => uuidv4()}
          />
        </div>
        <Methods columns={columns.map((column) => column.field)} />
      </div>
    </>
  );
};

export default Table;