import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import Header from './Layouts/Header.js';
import Buttons from './Layouts/Buttons.js';
import Colors from './Layouts/Colors.js';
import AnimationsButtons from './Layouts/Animations.js';
import GeneralSettingsCard from './Layouts/Cards/GeneralSettingsCard/GeneralSettingsCard';
import ConfigurationCard from './Layouts/Cards/ConfigurationCard/ConfigurationCard';
import './App.css';

export default class extends Component {
  render() {
    return (

      <React.Fragment>
        <Header />
        <Container maxWidth={'xl'}>
          <Grid container spacing={2}>
            <Buttons />
            <Colors />
            <AnimationsButtons />

            <Grid item xs={6}>
              <ConfigurationCard />
            </Grid>
            <Grid item xs={6}>
              <GeneralSettingsCard />
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>


    );
  }

}
