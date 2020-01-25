import React, { Component } from 'react';
import { Grid, Paper, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowFire from './ShowButtons/ShowFire';
import ClearButton from './ClearButton.js'

const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });

class FireOptionsCardContent extends Component {
   state = {
     response: '',
     coolingFire: '',
     sparkingFire: '',
     responseToPost: '',
   };  
   componentDidMount() {
     this.handleSubmit()
       .then(res => this.setState({ response: res.express }))
       .catch(err => console.log(err));
   }  
   handleSubmit = async e => {
     e.preventDefault();
     const response = await this.SettingsOfFire([this.state.coolingFire, this.state.sparkingFire]);
     
     const body = await response.text();
     this.setState({ responseToPost: body});
   };

   SettingsOfFire = async (fireSettings) => {
     return fetch('http://localhost:5000/firesettings', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({fireSettings}),
     });
   }

   render() {
      return ( 
          <div>
              <Grid item xs={12}>
                  <Typography style={{color: "#fff"}} gutterBottom>
                      FIRE EFFECT
                      <ShowFire/> <ClearButton />
                   </Typography>
                   <form onSubmit={this.handleSubmit} method="POST" action="/firesettings">
                   <Typography style={{color: "#fff"}}>Cooling</Typography>
                   <NumberFormat value={this.state.coolingFire} onChange={e => this.setState({ coolingFire: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 49" customInput={TextField} format="##"/>
                   <Typography style={{color: "#fff"}}>Sparking</Typography>
                   <NumberFormat value={this.state.sparkingFire} onChange={e => this.setState({ sparkingFire: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 60" customInput={TextField} format="##"/>
                   <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                      <Typography>SEND</Typography>
                   </Button>
                   </form>    
              </Grid>
          </div>
       );
  }
}
 
export default FireOptionsCardContent;