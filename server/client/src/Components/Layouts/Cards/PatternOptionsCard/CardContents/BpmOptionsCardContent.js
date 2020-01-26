import React, { Component } from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowBpm from './ShowButtons/ShowBpm';
import ClearButton from './ClearButton';


const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });


  class BpmOptionsCardContent extends Component {
    state = {
      response: '',
      bpmNumber: '',
      bpmSpeed: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.SettingsOfBpm([this.state.bpmNumber, this.state.bpmSpeed]);
      
      const body = await response.text();
      this.setState({ responseToPost: body});
    };

    SettingsOfBpm = async (bpmSettings) => {
      return fetch('http://localhost:5000/bpmsettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bpmSettings }),
      });
    }
    
    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                        BEATS PER MINUTE
                        < ShowBpm /> <ClearButton />
                     </Typography>
                     <form onSubmit={this.handleSubmit} method="POST" action="/bpmsettings">
                     <Typography style={{color: "#fff"}}>Number of LEDs</Typography>
                     <NumberFormat value={this.state.post} onChange={e => this.setState({ bpmNumber: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                     <Typography style={{color: "#fff"}}>Speed</Typography>
                     <NumberFormat value={this.state.post} onChange={e => this.setState({ bpmSpeed: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 30" customInput={TextField} format="##"/>
                     <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                </Grid>
    
            </div>
         );
    }
}

export default BpmOptionsCardContent;