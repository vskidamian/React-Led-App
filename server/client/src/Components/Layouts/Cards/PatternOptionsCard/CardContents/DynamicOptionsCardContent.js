import React, { Component } from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowDynamic from './ShowButtons/ShowDynamic.js';
import ClearButton from './ClearButton.js';

const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });


  class DynamicOptionsCardContent extends Component {
    state = {
      response: '',
      dynamicNumber: '',
      dynamicDelta: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.SettingsOfDynamic([this.state.dynamicNumber, this.state.dynamicDelta]);
      
      const body = await response.text();
      this.setState({ responseToPost: body});
    };

    SettingsOfDynamic = async (dynamicSettings) => {
      return fetch('http://localhost:5000/dynamicsettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dynamicSettings }),
      });
    }
    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                        DYNAMIC RAINBOW
                        <ShowDynamic changeActualPatternShown={this.changeActualPatternShown}/> <ClearButton/>
                     </Typography>
                     <form onSubmit={this.handleSubmit} method="POST" action="/dynamicsettings">
                     <Typography style={{color: "#fff"}}>Number of LEDs</Typography>
                     <NumberFormat value={this.state.dynamicNumber} onChange={e => this.setState({ dynamicNumber: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                     <Typography style={{color: "#fff"}}>Trial</Typography>
                     <NumberFormat value={this.state.dynamicDelta} onChange={e => this.setState({ dynamicDelta: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 7" customInput={TextField} format="##"/>
                     <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                </Grid>
    
            </div>
         );
    }
}
 
export default DynamicOptionsCardContent;