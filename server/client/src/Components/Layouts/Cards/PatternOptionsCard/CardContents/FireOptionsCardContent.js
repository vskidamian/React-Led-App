import React from 'react';
import { Grid, Paper, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowFire from './ShowButtons/ShowFire';


const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });

const FireOptionsCardContent = ({data}) => {
    const classes = useStyles();
    return ( 
        <div>
            <Grid item xs={12}>
            <Typography style={{color: "#fff"}} gutterBottom>
                    Fire - Number of LEDs
                    < ShowFire />
                 </Typography>
                 <NumberFormat style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                 <Button variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" className={classes.send}>
                    <Typography>SEND</Typography>
                 </Button>
            </Grid>      
            {/*{JSON.stringify(data)}*/}
        </div>
     );
}
 
export default FireOptionsCardContent;