import React, { useState, useCallback, useRef, useEffect } from "react";
import { Grid, Paper, Button, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


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
  
  },
  button: {
        marginLeft: 20,
        marginTop: 5,
    }
});

export default function ButtonsMenu() {
    //WYSWIETLANIE AKTUALNEGO CONFIGU ( RUN -/- CONFIG ) ze wzgledu na przycisk - wyswietlane w Headerze
    const [currentConfig, setCurrentConfig] = React.useState(null)
    const [cureentConfigData, setCurrentConfigData] = React.useState(null)

    const classes = useStyles();
    const [isFetching, setFetching] = useState(false)
    const isComponentMounted = useRef(true)

    useEffect(() => {
        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const useFetchOn = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/on').then(async (data) => {
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

    const useFetchOff = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/off').then(async (data) => {
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
    <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
                <Paper style={styles.Paper}>
                <Typography variant="h6" style={{color: "#fff"}}>
                        Power
                </Typography>
                <Grid item xs={6}>
                    <Button onClick={useFetchOn} variant="contained" style={{color: "#fff", background: "#00b200"}} className={classes.button}>
                    <Typography>ON</Typography> 
                </Button>
                    <Button onClick={useFetchOff} variant="contained" color="secondary" className={classes.button}>
                    <Typography>OFF</Typography>
                </Button>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
    );
    }
