import React from "react";
import PropTypes from "prop-types";

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

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
