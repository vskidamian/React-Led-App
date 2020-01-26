import React, { Component }  from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowSinelon from './ShowButtons/ShowCylon.js';
import ClearButton from './ClearButton';

const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });

  class CylonOptionsCardContent extends Component {
    state = {
      response: '',
      cylonNumber: '',
      cylonSpeed: '',
      cylonTrail: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.SettingsOfBlink([this.state.cylonNumber, this.state.cylonSpeed, this.state.cylonTrail]);
      
      const body = await response.text();
      this.setState({ responseToPost: body});
    };

    SettingsOfBlink = async (cylonSettings) => {
      return fetch('http://localhost:5000/cylonsettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cylonSettings }),
      });
    }
    
    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                       CYLON EFFECT
                        <ShowSinelon /> <ClearButton />
                     </Typography>
                     <form onSubmit={this.handleSubmit} method="POST" action="/cylonsettings">
                     <Typography style={{color: "#fff"}}>Number of LEDs</Typography>
                     <NumberFormat value={this.state.cylonNumber} onChange={e => this.setState({ cylonNumber: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                     <Typography style={{color: "#fff"}}>Speed</Typography>
                     <NumberFormat value={this.state.cylonSpeed} onChange={e => this.setState({ cylonSpeed: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 30" customInput={TextField} format="##"/>
                     <Typography style={{color: "#fff"}}>Trail</Typography>
                     <NumberFormat value={this.state.cylonTrail} onChange={e => this.setState({ cylonTrail: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 20" customInput={TextField} format="##"/>
                     <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                </Grid>
    
            </div>
         );
    }
}
 
export default CylonOptionsCardContent;