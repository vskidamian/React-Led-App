import React, { Component } from 'react';
import { Grid, Paper, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowWater from './ShowButtons/ShowWater';
import ClearButton from './ClearButton.js'

const useStyles = makeStyles({
      send: {
          marginBottom: 4,
          marginLeft: 7,
      }
  });

class WaterOptionsCardContent extends Component {
   state = {
     response: '',
     coolingWater: '',
     sparkingWater: '',
     responseToPost: '',
   };  
   componentDidMount() {
     this.handleSubmit()
       .then(res => this.setState({ response: res.express }))
       .catch(err => console.log(err));
   }  
   handleSubmit = async e => {
     e.preventDefault();
     const response = await this.SettingsOfWater([this.state.coolingWater, this.state.sparkingWater]);
     
     const body = await response.text();
     this.setState({ responseToPost: body});
   };

   SettingsOfWater = async (waterSettings) => {
     return fetch('http://localhost:5000/watersettings', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({waterSettings}),
     });
   }

   render() {
      return ( 
          <div>
              <Grid item xs={12}>
                  <Typography style={{color: "#fff"}} gutterBottom>
                      WATER EFFECT
                      <ShowWater/> <ClearButton />
                   </Typography>
                   <form onSubmit={this.handleSubmit} method="POST" action="/watersettings">
                   <Typography style={{color: "#fff"}}>Cooling</Typography>
                   <NumberFormat value={this.state.coolingWater} onChange={e => this.setState({ coolingWater: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 49" customInput={TextField} format="##"/>
                   <Typography style={{color: "#fff"}}>Sparking</Typography>
                   <NumberFormat value={this.state.sparkingWater} onChange={e => this.setState({ sparkingWater: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Standard value = 60" customInput={TextField} format="##"/>
                   <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                      <Typography>SEND</Typography>
                   </Button>
                   </form>
                   
              </Grid>
  
          </div>
       );
  }
}
 
export default WaterOptionsCardContent;