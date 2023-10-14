import React, { useState } from "react";
import { joinClassNames } from "../../utils/join-class-names";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { bemElement } from "../../utils/bem-class-names";
import GeneralizationValueInputsModal from "../modals/generalization-value-inputs-modal/GeneralizationValueInputsModal";

const baseClassName = "method";
const bem = bemElement(baseClassName);

const GeneralizationValue = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [showInputsModal, setShowInputsModal] = useState<boolean>(false);

  return (
    <div className={joinClassNames(baseClassName, bem("row"))}>
      <FormControlLabel
        control={<Switch
          checked={selected}
          onChange={(event) => setSelected(event.target.checked)}
        />}
        label="Обобщение значений"
        className="flex-2"
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
            <GeneralizationValueInputsModal
              show={showInputsModal}
              onHide={() => setShowInputsModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GeneralizationValue;