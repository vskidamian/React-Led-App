import React, { Component }  from 'react';
import { Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowSpark from './ShowButtons/ShowSpark';
import ClearButton from './ClearButton';


const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });

  class SparkOptionsCardContent extends Component {
    state = {
      response: '',
      sparkNumber: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.SettingsOfSpark([this.state.sparkNumber]);
      
      const body = await response.text();
      this.setState({ responseToPost: body});
    };

    SettingsOfSpark = async (sparkSettings) => {
      return fetch('http://localhost:5000/sparksettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sparkSettings }),
      });
    }
    
    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                       SPARK EFFECT
                        <ShowSpark /> <ClearButton />
                     </Typography>
                     <form onSubmit={this.handleSubmit} method="POST" action="/cylonsettings">
                     <Typography style={{color: "#fff"}}>Number of LEDs</Typography>
                     <NumberFormat value={this.state.sparkNumber} onChange={e => this.setState({ sparkNumber: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                     <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                </Grid>
    
            </div>
         );
    }
}
export default SparkOptionsCardContent;