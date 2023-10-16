import React from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface IMultiSelectData {
  label?: string;
  placeholder?: string;
  options: string[];
  onChange?: (value: string[]) => void;
}

const MultiSelect = ({ label, placeholder, options, onChange }: IMultiSelectData) => {
  return (
    <Autocomplete
      multiple
      options={options}
      onChange={(_, newValue) => onChange && onChange(newValue)}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: "space-between" }}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  );
};

export default MultiSelect;
