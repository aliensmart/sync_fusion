import React from 'react';

const statusdetails = props => {
    if (props.Status === "Select All") {
        return (<span>Select All</span>);
    }
    if (props.Status === "Active") {
        return (<div className="statustemp e-activecolor">
            <span className="statustxt e-activecolor">Active</span>
            </div>);
    }
    if (props.Status === "Inactive") {
        return (<div className="statustemp e-inactivecolor">
          <span className="statustxt e-inactivecolor">Inactive</span>
          </div>);
    }
}

export default statusdetails;