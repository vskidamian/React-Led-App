import React, { Component } from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowStatic from './ShowButtons/ShowStatic.js';
import ClearButton from './ClearButton.js'

const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });


  class StaticOptionsCardContent extends Component {
    state = {
      response: '',
      staticNumber: '',
      staticDelta: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.SettingsOfStatic([this.state.staticNumber, this.state.staticDelta]);
      
      const body = await response.text();
      this.setState({ responseToPost: body});
    };

    SettingsOfStatic = async (staticSettings) => {
      return fetch('http://localhost:5000/staticsettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({staticSettings}),
      });
    }

    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                        STATIC RAINBOW
                        <ShowStatic/> <ClearButton />
                     </Typography>
                     <form onSubmit={this.handleSubmit} method="POST" action="/staticsettings">
                     <Typography style={{color: "#fff"}}>Number of LEDs</Typography>
                     <NumberFormat value={this.state.staticNumber} onChange={e => this.setState({ staticNumber: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                     <Typography style={{color: "#fff"}}>Trial</Typography>
                     <NumberFormat value={this.state.staticDelta} onChange={e => this.setState({ staticDelta: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 7" customInput={TextField} format="##"/>
                     <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                     
                </Grid>
    
            </div>
         );
    }
}
export default StaticOptionsCardContent;