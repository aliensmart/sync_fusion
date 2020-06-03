import React from 'react';

const coltemplate = props => {
    return (
        <div className="Mapimage">
            <img src="src/grid/images/Map.png" className="e-image"/> <span>  </span> 
            <span id="locationtext">{props.Location}</span>
        </div>
    )
}

export default coltemplate;