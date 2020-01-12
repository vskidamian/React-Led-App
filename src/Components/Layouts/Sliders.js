import React, { useState, useCallback, useRef, useEffect } from "react";
import { Grid, Paper, Typography, Button, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';




const styles = {
  Paper: {
    background: "#36393F",
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    overflowY: "auto"
  }
};
const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginLeft: 20,
    width: 500
  },
  button: {
    margin: 5,
    marginBottom: 10,
    },
    send: {
        margin: 5,

    }
});

export default function ButtonsMenu() {
  const classes = useStyles();
  const [isFetching, setFetching] = useState(false)
  const isComponentMounted = useRef(true)

  useEffect(() => {
      return () => {
          isComponentMounted.current = false
      }
  }, [])

  const useFetchUp = useCallback(async () => {
      if (isFetching) {
          return;
      }
      setFetching(true);
      const result = await fetch('http://localhost:5000/upbrightness').then(async (data) => {
          const json = await data.json();
      console.log(json);
          return json;
      }).catch(err => {
          alert(err);
          return err;
      });
      if (isComponentMounted.current) {
          setFetching(false);
      }
  }, [isFetching]);

  const useFetchDown = useCallback(async () => {
      if (isFetching) {
          return;
      }
      setFetching(true);
      const result = await fetch('http://localhost:5000/downbrightness').then(async (data) => {
          const json = await data.json();
      console.log(json);
          return json;
      }).catch(err => {
          alert(err);
          return err;
      });
      if (isComponentMounted.current) {
          setFetching(false);
      }
  }, [isFetching]);

  const useFetchUpPattern = useCallback(async () => {
    if (isFetching) {
        return;
    }
    setFetching(true);
    const result = await fetch('http://localhost:5000/uppattern').then(async (data) => {
        const json = await data.json();
    console.log(json);
        return json;
    }).catch(err => {
        alert(err);
        return err;
    });
    if (isComponentMounted.current) {
        setFetching(false);
    }
}, [isFetching]);

const useFetchDownPattern = useCallback(async () => {
    if (isFetching) {
        return;
    }
    setFetching(true);
    const result = await fetch('http://localhost:5000/downpattern').then(async (data) => {
        const json = await data.json();
    console.log(json);
        return json;
    }).catch(err => {
        alert(err);
        return err;
    });
    if (isComponentMounted.current) {
        setFetching(false);
    }
}, [isFetching]);

  const useFetchBrightControl = useCallback(async () => {
    if (isFetching) {
        return;
    }
    setFetching(true);
    const result = await fetch('http://localhost:5000/brightcontrol').then(async (data) => {
        const json = await data.json();
    console.log(json);
        return json;
    }).catch(err => {
        alert(err);
        return err;
    });
    if (isComponentMounted.current) {
        setFetching(false);
    }
}, [isFetching]);

    return (
        <Grid container  spacing={2}>
            <Grid item xs={12}>
                <Paper style={styles.Paper}>
                <Typography variant="h6" style={{color: "#fff"}}>
                    Global Settings
                 </Typography>
                 <Typography  style={{color: "#fff"}} gutterBottom>
                    Brightness
                 </Typography>
                 <Grid item xs={12}>
                 <Button onClick={useFetchUp} variant="contained" color="secondary" className={classes.button}>
                    <AddIcon />
                 </Button>
                 <Button onClick={useFetchDown} variant="contained" color="primary" style={{}} className={classes.button}>
                    <RemoveIcon />
                 </Button>
                 </Grid>
                 <Grid item xs={12}>
                 <Typography style={{color: "#fff"}} gutterBottom>
                    Number of LEDs
                 </Typography>
                 <Input style={{background: "#fff"}} color="secondary" placeholder="Max of leds = 60"></Input>
                 <Button variant="contained" style={{color: "#fff", background: "#00b200"}} size="small" className={classes.send}>
                    <Typography>SEND</Typography>
                 </Button>
                 </Grid>
                </Paper>
            </Grid>
        </Grid>
        );
        }
