import React from "react";
import PropTypes from "prop-types";

const PeriodSelector = ({
  onSelectChange,
  onButtonChange,
  periods,
  selectedPeriod,
  selectedPeriodIndex,
  periodValue
}) => {
  return (
    <div className="row form-inline">
      <div className="col-2">
        <button
          id="btnNextPeriod"
          className="btn btn-primary"
          onClick={() => onButtonChange(1)}
          disabled={selectedPeriodIndex === periods.length - 1}
        >
          &lt;&lt;
        </button>
      </div>
      <div className="col-8 text-center">
        <select
          className="form-control"
          value={selectedPeriod}
          onChange={onSelectChange}
        >
          {periods.map(period => {
            return (
              <option key={period[periodValue]} value={period[periodValue]}>
                {period[periodValue]}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-2 text-right">
        <button
          id="btnPrevPeriod"
          className="btn btn-primary"
          onClick={() => onButtonChange(-1)}
          disabled={selectedPeriodIndex === 0}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

PeriodSelector.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
  onButtonChange: PropTypes.func.isRequired,
  periods: PropTypes.array.isRequired,
  selectedPeriod: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  selectedPeriodIndex: PropTypes.number.isRequired,
  periodValue: PropTypes.string.isRequired
};

export default PeriodSelector;
