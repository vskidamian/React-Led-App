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

{/*const BlinkOptionsCardContent = ({data}) => {
    const classes = useStyles();
    return ( 
        <div>
            <Grid item xs={12}>
                <Typography style={{color: "#fff"}} gutterBottom>
                    Blink - Number of LEDs
                 </Typography>
                 <NumberFormat style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                 <Button variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" className={classes.send}>
                    <Typography>SEND</Typography>
                 </Button>
            </Grid>

        </div>
     );
}
*/}
class BlinkOptionsCardContent extends Component {
    state = {
      response: '',
      post: '',
      responseToPost: '',
    };  
    componentDidMount() {
      this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    }  
    callApi = async () => {
      const response = await fetch('/api/hello');
      const body = await response.json();    
      if (response.status !== 200) throw Error(body.message);    
      return body;
    };  
    handleSubmit = async e => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/blinknumber', {
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
                        Blink - Number of LEDs
                     </Typography>
                     <form onSubmit={this.handleSubmit}>
                     <NumberFormat value={this.state.post} onChange={e => this.setState({ post: e.target.value })} style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##"/>
                     <Button type="submit" variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" >
                        <Typography>SEND</Typography>
                     </Button>
                     </form>
                </Grid>
    
            </div>
         );
    }
}

export default BlinkOptionsCardContent;