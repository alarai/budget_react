import React from "react";

const Checkbox = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group form-check">
      <input
        {...rest}
        value=""
        type="checkbox"
        name={name}
        id={name}
        className="form-check-input"
      />
      <label htmlFor={name} className="form-check-label">
        {label}
      </label>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Checkbox;
