import React from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface IMultiSelectData {
  label?: string;
  placeholder?: string;
  options: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  fullWidth?: boolean
  className?: string;
}

const MultiSelect = ({ label, placeholder, options, value, onChange, fullWidth, className }: IMultiSelectData) => {
  return (
    <Autocomplete
      className={className}
      fullWidth={fullWidth}
      multiple
      options={options}
      value={value}
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
