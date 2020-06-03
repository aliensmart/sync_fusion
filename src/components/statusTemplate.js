import React from 'react';

const statusTemplate = props => {

    return (
        <div id='status' className="statustemp">
            <span className="statustxt">{props.Status}</span>
        </div>
    );
}

export default statusTemplate