import React, { useState, useEffect, useReducer } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft:2,
  },
  currentPattern:{
    marginLeft:25,
    marginTop:10
  }, 
  Paper: {
      background: "#36393F",
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      overflowY: "auto"
    }
});

export default function Header({ actualPatternShown }) {
  const classes = useStyles();
  return (
    <React.Fragment >
    <AppBar position="relative" style={{background: "#212121"}}>
    <Toolbar>
      <Typography className={classes.menuButton} variant="h5">Light up your life!</Typography>
      </Toolbar>
    </AppBar>
      <Typography style={{color: "white"}} className={classes.currentPattern} vairant="h6" align="left">Current Pattern: {actualPatternShown}</Typography>
  </React.Fragment>
  );
};
