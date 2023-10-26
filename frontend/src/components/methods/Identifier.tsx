import React, { useState } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { joinClassNames } from "../../utils/join-class-names";
import { bemElement } from "../../utils/bem-class-names";
import IdentifierInputsModal from "../modals/identifier-inputs-modal/IdentifierInputsModal";

const baseClassName = "method";
const bem = bemElement(baseClassName);

interface IIdentifierData {
  columns: string[];
}

const Identifier = ({ columns }: IIdentifierData) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Введение идентификаторов"
        className="flex-2"
        sx={{
          "& .MuiFormControlLabel-label": {
            width: "100px"
          }
        }}
      />
      {selected && (
        <>
          <Button
            className="flex-1"
            variant="outlined"
            size="small"
            onClick={() => setShowInputsModal(true)}
          >
            Редактировать
          </Button>
          {showInputsModal && (
            <IdentifierInputsModal
              columns={columns}
              show={showInputsModal}
              onHide={() => setShowInputsModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Identifier;