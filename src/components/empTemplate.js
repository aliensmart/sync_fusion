import React from 'react';

const empTemplate = props =>{

    return(
        <div>
            <div className="empimg">
                <span className="e-userimg">
                </span>
            </div> 
            <span id="Emptext">{props.Employees}</span>
    </div>
    )
}

export default empTemplate;