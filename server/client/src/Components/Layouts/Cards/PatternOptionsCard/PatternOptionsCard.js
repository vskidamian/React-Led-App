import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import StaticOptionsCardContent from './CardContents/StaticOptionsCardContent';
import WaterOptionsCardContent from './CardContents/WaterOptionsCardContent';


const useStyles = makeStyles({
    paper: {
        background: "#36393F",
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
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
                currentPatternOptions == 'waterOptions' ? <WaterOptionsCardContent data={currentPatternOptionsData} /> : null
            }

        </Paper>
    );
}


export default PatternOptionsCard;