import React, { Component } from 'react';
import {Box, Grid, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

class ChooseColor extends Component {
    state = {
      response: '',
      post: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.handleSubmit()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/choosecolor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: this.state.post }),
      });
  
      const body = await response.text();    
      this.setState({ responseToPost: body });
    };
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
                     <NumberFormat name="red" value={this.state.red} onChange={e => this.setState({ post: e.target.value })} style={{ background: "#fff"}} color="secondary" placeholder="RED (0 - 255)" customInput={TextField} format="###"/>
                     </Box>
                     <Box component="object" m={1}>
                     <label for="green"></label>
                     <NumberFormat name="red" value={this.state.green} onChange={e => this.setState({ post: e.target.value })} style={{  background: "#fff"}} color="secondary" placeholder="GREEN (0 - 255)" customInput={TextField} format="###"/>
                     </Box>
                     <Box component="object" m={1}>
                     <label for="blue"></label>
                     <NumberFormat name="red" value={this.state.blue} onChange={e => this.setState({ post: e.target.value })} style={{ background: "#fff"}} color="secondary" placeholder="BLUE (0 - 255)" customInput={TextField} format="###"/>
                     </Box>
                     <Button type="submit" variant="contained" style={{color: "#fff",  background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                </Grid>
    
            </div>
         );
    }
}
 
export default ChooseColor;