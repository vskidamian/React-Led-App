import React from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });

const CylonOptionsCardContent = ({data}) => {
    const classes = useStyles();
    return ( 
        <div>
            <Grid item xs={12}>
                <Typography style={{color: "#fff"}} gutterBottom>
                    Cylon - Number of LEDs
                 </Typography>
                 <Input style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60"></Input>
                 <Button variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" className={classes.send}>
                    <Typography>SEND</Typography>
                 </Button>
            </Grid>

        </div>
     );
}
 
export default CylonOptionsCardContent;