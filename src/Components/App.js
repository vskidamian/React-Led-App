import React, { Component, Fragment } from 'react';
import Header from './Layouts/Header.js';
import Buttons from './Layouts/Buttons.js';
import Colors from './Layouts/Colors.js';
import AnimationsButtons from './Layouts/Animations.js';
import Sliders from './Layouts/Sliders.js';
import './App.css';
  
export default class extends Component {
  render(){
    return (
      <Fragment>
        <Header />
        <Buttons />
        <Colors />
        <AnimationsButtons />
        <Sliders />
      </Fragment>
    );
  }

}
