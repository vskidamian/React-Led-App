import React, { Component } from 'react';
import {Box, Grid, Button, Typography, Input} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import ShowHexColor from './ShowHexColor.js';

class ChooseColor extends Component {
    state = {
      response: '',
      valueRed: '',
      valueGreen: '',
      valueBlue: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await this.setValueOfHexColors([this.state.valueRed, this.state.valueGreen, this.state.valueBlue]);

      const body = await response.text();
      this.setState({ responseToPost: body});
    };
      
    setValueOfHexColors = async (valueOfColors) => {
      return fetch('http://localhost:5000/choosecolor', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json', 
        },
        body: JSON.stringify({valueOfColors}),
      });
    }
    render() {
        return ( 
            <div>
                <Grid item xs={12}>
                    <Typography style={{color: "#fff"}} gutterBottom>
                        Choose a color
                     </Typography>
                     <form onSubmit={this.handleSubmit} method="POST" action="/choosecolor">
                     <Box component="object" m={1}>
                     <label for="red"></label>
                     <NumberFormat name="red" value={this.state.valueRed} onChange={e => this.setState({ valueRed: e.target.value })} style={{ background: "#fff"}} color="secondary" placeholder="RED (0 - 255)" customInput={TextField} format="###"/>
                     </Box>
                     <Box component="object" m={1}>
                     <label for="green"></label>
                     <NumberFormat name="green" value={this.state.valueGreen} onChange={e => this.setState({ valueGreen: e.target.value })} style={{  background: "#fff"}} color="secondary" placeholder="GREEN (0 - 255)" customInput={TextField} format="###"/>
                     </Box>
                     <Box component="object" m={1}>
                     <label for="blue"></label>
                     <NumberFormat name="blue" value={this.state.valueBlue} onChange={e => this.setState({ valueBlue: e.target.value })} style={{ background: "#fff"}} color="secondary" placeholder="BLUE (0 - 255)" customInput={TextField} format="###"/>
                     </Box>
                     <Button type="submit" variant="contained" style={{color: "#fff",  background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                     <ShowHexColor />
                </Grid>
    
            </div>
         );
    }
}
 
export default ChooseColor;