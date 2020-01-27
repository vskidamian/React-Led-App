import React from 'react';
import { Paper, Typography } from '@material-ui/core';


const ActualPatternName = ({ actualPatternShown, currentPatternOptionsData }) => {

    

    return (
            <Typography variant="h6" style={{ color: "#fff" }}>   
            {
                actualPatternShown == 'staticName' ? 'STATIC RAINBOW' :
                actualPatternShown == 'waterName' ?  'WATER' : 
                actualPatternShown == 'dynamicName' ?  'DYNAMIC RAINBOW': 
                actualPatternShown == 'blinkName' ?  'BLINK': 
                actualPatternShown == 'cylonName' ?  'CYLON': 
                actualPatternShown == 'fireName' ? 'FIRE':
                actualPatternShown == 'sparkName' ? 'SPARK' :
                actualPatternShown == 'bpmName' ? 'BPM' : null 
            }

            </Typography>

    );
}


export default ActualPatternName;