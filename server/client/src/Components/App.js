import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import Header from './Layouts/Header.js';
import Buttons from './Layouts/Buttons.js';
import Colors from './Layouts/Colors.js';
import AnimationsButtons from './Layouts/Animations.js';
import GlobalSettingsCard from './Layouts/Cards/GlobalSettingsCard/GlobalSettingsCard';
import ConfigurationCard from './Layouts/Cards/ConfigurationCard/ConfigurationCard';
import PatternStore from './stores/PatternStore';
import './App.css';



export default class App extends Component {
  state = {
    actualPatternShown: '',
  };

  render() {
    return (

      <React.Fragment>
        <PatternStore>
          <Header actualPatternShown={this.state.actualPatternShown} />
          <Container maxWidth={'xl'}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Buttons />
              </Grid>

              <Grid item xs={12}>
                <Colors changeActualPatternShown={this.changeActualPatternShown} />
              </Grid>

              <Grid item xs={12}>
                <AnimationsButtons changeActualPatternShown={this.changeActualPatternShown} />
              </Grid>

              <Grid item xs={6}>
                <ConfigurationCard />
              </Grid>
              <Grid item xs={6}>
                <GlobalSettingsCard />
              </Grid>
            </Grid>
          </Container>
        </PatternStore>
      </React.Fragment>
    );
  }

  changeActualPatternShown = actualPatternShown => {
    this.setState({
      actualPatternShown
    });
  };
}
