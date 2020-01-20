import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import Header from './Layouts/Header.js';
import Buttons from './Layouts/Buttons.js';
import Colors from './Layouts/Colors.js';
import AnimationsButtons from './Layouts/Animations.js';
import GlobalSettingsCard from './Layouts/Cards/GlobalSettingsCard/GlobalSettingsCard';
import ConfigurationCard from './Layouts/Cards/ConfigurationCard/ConfigurationCard';
import './App.css';

export default class extends Component {
  render() {
    return (

      <React.Fragment>
        <Header />
        <Container maxWidth={'xl'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Buttons />
            </Grid>

            <Grid item xs={12}>
              <Colors />
            </Grid>

            <Grid item xs={12}>
              <AnimationsButtons />
            </Grid>

            <Grid item xs={6}>
              <ConfigurationCard />
            </Grid>
            <Grid item xs={6}>
              <GlobalSettingsCard />
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>


    );
  }

}
