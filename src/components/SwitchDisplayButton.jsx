import React from "react";

const SwitchDisplayButton = ({ display, change }) => {
    return (
        <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
        >
            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                value="table"
                onChange={change}
                checked={display === "table"}
            />
            <label className="btn btn-outline-nice" htmlFor="btnradio1">
                <i className="bi bi-ui-checks"></i>
            </label>

            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                value="card"
                onChange={change}
                checked={display === "card"}
            />
            <label className="btn btn-outline-nice" htmlFor="btnradio2">
                <i className="bi bi-ui-checks-grid"></i>
            </label>
        </div>
    );
};

export default SwitchDisplayButton;
