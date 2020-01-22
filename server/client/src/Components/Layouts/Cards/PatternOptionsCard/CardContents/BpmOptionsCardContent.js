import React, { Component } from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';


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
      responseToPost: '',
    };  
    componentDidMount() {
      this.BlinkNumberSettings()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.BpmNumberSettings(this.state.bpmNumber);
      
      const body = await response.text();
      this.setState({ responseToPost: body});
    };

    BpmNumberSettings = async bpmNumber => {
      return fetch('http://localhost:5000/bpmnumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bpmNumber: bpmNumber }),
      });
    }
    
    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                        Bpm - Number of LEDs
                     </Typography>
                     <form onSubmit={this.handleSubmit}>
                     <NumberFormat value={this.state.post} onChange={e => this.setState({ bpmNumber: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
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