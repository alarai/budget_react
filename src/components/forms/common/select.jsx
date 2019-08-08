import React from "react";

const Select = ({
  name,
  label,
  error,
  data,
  valueField,
  textField,
  selectedValue,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        {data.map(item => {
          return (
            <option value={item[valueField]} key={item[valueField]}>
              {item[textField]}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
