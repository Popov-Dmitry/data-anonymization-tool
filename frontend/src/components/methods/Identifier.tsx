import React, { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";

const Identifier = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <FormControlLabel
      control={<Switch
        checked={selected}
        onChange={(event) => setSelected(event.target.checked)}
      />}
      label="Введение идентификаторов"
    />
  );
};

export default Identifier;