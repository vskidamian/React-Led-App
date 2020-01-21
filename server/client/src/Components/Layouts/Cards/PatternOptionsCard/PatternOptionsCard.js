import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import StaticOptionsCardContent from './CardContents/StaticOptionsCardContent';
import WaterOptionsCardContent from './CardContents/WaterOptionsCardContent';
import DynamicOptionsCardContent from './CardContents/DynamicOptionsCardContent';
import BlinkOptionsCardContent from './CardContents/BlinkOptionsCardContent';
import CylonOptionsCardContent from './CardContents/CylonOptionsCardContent';
import FireOptionsCardContent from './CardContents/FireOptionsCardContent';
import SparkOptionsCardContent from './CardContents/SparkOptionsCardContent';
import BpmOptionsCardContent from './CardContents/BpmOptionsCardContent';

const useStyles = makeStyles({
    paper: {
        background: "#36393F",
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        overflowY: "auto"
    }
})

/**
 * 
 */
const PatternOptionsCard = ({ currentPatternOptions, currentPatternOptionsData }) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6" style={{ color: "#fff" }}>
                Options
            </Typography>

            {
                currentPatternOptions == 'staticOptions' ? <StaticOptionsCardContent data={currentPatternOptionsData} /> :
                currentPatternOptions == 'waterOptions' ? <WaterOptionsCardContent data={currentPatternOptionsData} /> : 
                currentPatternOptions == 'dynamicOptions' ? <DynamicOptionsCardContent data={currentPatternOptionsData} /> : 
                currentPatternOptions == 'blinkOptions' ? <BlinkOptionsCardContent data={currentPatternOptionsData} /> : 
                currentPatternOptions == 'cylonOptions' ? <CylonOptionsCardContent data={currentPatternOptionsData} /> : 
                currentPatternOptions == 'fireOptions' ? <FireOptionsCardContent data={currentPatternOptionsData} /> :
                currentPatternOptions == 'sparkOptions' ? <SparkOptionsCardContent data={currentPatternOptionsData} /> :
                currentPatternOptions == 'bpmOptions' ? <BpmOptionsCardContent data={currentPatternOptionsData} /> : null 

            }

        </Paper>
    );
}


export default PatternOptionsCard;