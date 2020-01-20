import React, { useState, useEffect, useReducer } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
};

function HeaderAppBar(props) {
  const [title, setTitle] = useState('unknown');
  useEffect(() => {
    console.log('in effect');
    const timeout = setTimeout(() => { 
      console.log('timout done');
      setTitle('NAZWA PATERNU');
    }, 1000);
    return () => {
      console.log('clear timeout');
      clearTimeout(timeout);
    }
  }, []);
  console.log('rerender');
  const { classes } = props;
  return (
    <React.Fragment >
    <AppBar position="relative" style={{background: "#212121"}}>
    <Toolbar>
      <Typography className={classes.menuButton} variant="h5">Light up your life!</Typography>
          {/*  {title !== 'unknown' && (<div> 
                    to jest blok ktory zaraz zniknie </div>)}*/}
      </Toolbar>
    </AppBar>
      <Typography style={{color: "white"}} className={classes.currentPattern} vairant="h6" align="left">Current Pattern: {title}</Typography>
  </React.Fragment>
  //DODAC Typography z nazwą CONFIGU
  );
};

export default withStyles(styles)(HeaderAppBar);