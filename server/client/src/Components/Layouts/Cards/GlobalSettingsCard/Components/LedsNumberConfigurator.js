import React, { Component } from 'react';
import { Button, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

class LedsNumberConfigurator extends Component {
    state = {
        response: '',
        ledsNumber: '',
        responseToPost: '',
    };
    componentDidMount() {
        this.setNumberOfLedsRequest()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }
    handleSubmit = async e => {
        e.preventDefault();
        const response = await this.setNumberOfLedsRequest(this.state.ledsNumber);

        const body = await response.text();
        this.setState({ responseToPost: body });
    };

    setNumberOfLedsRequest = async ledsNumber => {
        return fetch('http://localhost:5000/numberofleds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ledsNumber: ledsNumber }),
        });
    }

    render() {
        return (
            <React.Fragment>
                <Typography style={{ color: "#fff" }} gutterBottom>
                    Number of LEDs
                     </Typography>
                <form onSubmit={this.handleSubmit}>
                    <NumberFormat value={this.state.post} onChange={e => this.setState({ ledsNumber: e.target.value })} style={{ background: "#fff" }} color="secondary" placeholder="Max of leds = 60" customInput={TextField} format="##" />
                    <Button type="submit" variant="contained" style={{ color: "#fff", background: "#00b200" }} size="small" >
                        <Typography>SEND</Typography>
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default LedsNumberConfigurator;