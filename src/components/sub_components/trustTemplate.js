import React from 'react';

const trustTemplate = props =>{

    let loc = { width: '31px', height: '24px' };
    var Trustworthiness = props.Trustworthiness == "Sufficient" ? 'src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'src/grid/images/Insufficient.png' : 'src/grid/images/Perfect.png';
 
    return (
        <div> 
            <img style={loc} src={Trustworthiness}/>
            <span id="Trusttext">{props.Trustworthiness}</span>
        </div>
    )


}

export default trustTemplate;