import React, { Component } from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowBlink from './ShowButtons/ShowBlink';
import ClearButton from './ClearButton';


const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });

class BlinkOptionsCardContent extends Component {
    state = {
      response: '',
      blinkNumber: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.SettingsOfBlink([this.state.blinkNumber]);
      
      const body = await response.text();
      this.setState({ responseToPost: body});
    };

    SettingsOfBlink = async (blinkSettings) => {
      return fetch('http://localhost:5000/blinksettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blinkSettings }),
      });
    }
    
    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                        BLINK EFFECT
                        <ShowBlink /> <ClearButton />
                     </Typography>
                     <form onSubmit={this.handleSubmit} method="POST" action="/blinksettings">
                     <Typography style={{color: "#fff"}}>Number of LEDs</Typography>
                     <NumberFormat value={this.state.blinkNumber} onChange={e => this.setState({ blinkNumber: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                     <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                </Grid>
    
            </div>
         );
    }
}

export default BlinkOptionsCardContent;