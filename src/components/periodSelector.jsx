import React from "react";

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

export default PeriodSelector;
