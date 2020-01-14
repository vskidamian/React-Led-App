import React from 'react';


const StaticOptionsCardContent = ({data}) => {
    return ( 
        <div>
        <div>
            StaticOptions
            <br />
            To jest response z boardu:
            <br />
            {JSON.stringify(data)}
        </div>
        </div>
     );
}
 
export default StaticOptionsCardContent;