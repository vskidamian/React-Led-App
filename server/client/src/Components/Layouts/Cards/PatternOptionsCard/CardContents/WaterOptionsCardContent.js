import React from 'react';


const WaterOptionsCardContent = ({data}) => {
    return ( 
        <div>
            WaterOptions
            <br />
            To jest response z boardu:
            <br />
            {JSON.stringify(data)}
        </div>
     );
}
 
export default WaterOptionsCardContent;