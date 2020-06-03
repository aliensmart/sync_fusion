import React from 'react';

const progressTemplate = props =>{
    return(
        <div id="myProgress" className="pbar">
            <div id="myBar" className="bar">
                <div id="label" className="barlabel"></div>
            </div>
        </div>
    )
}

export default progressTemplate;