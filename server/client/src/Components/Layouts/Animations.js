import React, { useState, useCallback, useRef, useEffect } from "react";
import { Grid, Paper, Button, Typography, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { usePatternStore } from '../stores/PatternStore.js';

import PatternOptionsCard from './Cards/PatternOptionsCard/PatternOptionsCard'

const styles = {
  Paper: {
    background: "#36393F",
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    overflowY: "auto"
  }
};
const useStyles = makeStyles(theme => ({
  root: {
  },
  button: {
      marginLeft: 20,
      marginTop: 5,
      marginBottom: 5,
    },
    control: {
        padding: theme.spacing(2),
      },
    input:{
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
    }
}));

export default function AnimationsMenu({changeActualPatternShown}) {
    const classes = useStyles();
    const [isFetching, setFetching] = useState(false)
    const isComponentMounted = useRef(true)

    const { changeCurrentActivePattern } = usePatternStore()

    const [spacing, setSpacing] = React.useState(2);

    const [currentPatternOptions, setCurrentPatternOptions] = React.useState(null)
    const [currentPatternOptionsData, setCurrentPatternOptionsData] = React.useState(null)

    const handleChange = event => {
        setSpacing(Number(event.target.value));
      };


    useEffect(() => {
        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const useFetchRainbowStatic = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/rainbowstaticoptions').then(async (data) => {
            const json = await data.json();
        console.log(json);
            changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('staticOptions');
            setCurrentPatternOptionsData('staticOptions',json);
            return json;
        }).catch(err => {
            alert(err);
            return err;
        });
        if (isComponentMounted.current) {
            setFetching(false);
        }
    }, [isFetching]);

    const useFetchRainbowDynamic = useCallback(async ({changeActualPatternShown}) => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/rainbowdynamicoptions').then(async (data) => {
            const json = await data.json();
        console.log(json);
        changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('dynamicOptions');
            setCurrentPatternOptionsData('dynamicOptions',json);
            return json;
        }).catch(err => {
            alert(err);
            return err;
        });
        if (isComponentMounted.current) {
            setFetching(false);
        }
    }, [isFetching]);
    
    const useFetchWater = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/wateroptions').then(async (data) => {
            const json = await data.json();
            changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('waterOptions');
            setCurrentPatternOptionsData('waterOptions',json);
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

    const useFetchBlink = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/blinkoptions').then(async (data) => {
            const json = await data.json();
        console.log(json);
        changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('blinkOptions');
            setCurrentPatternOptionsData('blinkOptions',json);
            return json;
        }).catch(err => {
            alert(err);
            return err;
        });
        if (isComponentMounted.current) {
            setFetching(false);
        }
    }, [isFetching]);

    const useFetchFire = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/fireoptions').then(async (data) => {
            const json = await data.json();
        console.log(json);
        changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('fireOptions');
            setCurrentPatternOptionsData('fireOptions',json);
            return json;
        }).catch(err => {
            alert(err);
            return err;
        });
        if (isComponentMounted.current) {
            setFetching(false);
        }
    }, [isFetching]);

    const useFetchSinelon = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/cylonoptions').then(async (data) => {
            const json = await data.json();
        console.log(json);
        changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('cylonOptions');
            setCurrentPatternOptionsData('cylonOptions',json);
            return json;
        }).catch(err => {
            alert(err);
            return err;
        });
        if (isComponentMounted.current) {
            setFetching(false);
        }
    }, [isFetching]);

    const useFetchConfetti = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/confettioptions').then(async (data) => {
            const json = await data.json();
        console.log(json);
        changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('sparkOptions');
            setCurrentPatternOptionsData('sparkOptions',json);
            return json;
        }).catch(err => {
            alert(err);
            return err;
        });
        if (isComponentMounted.current) {
            setFetching(false);
        }
    }, [isFetching]);

    const useFetchBeat = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/beatoptions').then(async (data) => {
            const json = await data.json();
        console.log(json);
        changeCurrentActivePattern('NONE');
            setCurrentPatternOptions('bpmOptions');
            setCurrentPatternOptionsData('bpmOptions',json);
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
        <Grid container className={classes.root}>
            <Grid item xs={6}>
                    <Paper style={styles.Paper}>
                    <Typography variant="h6" style={{color: "#fff"}}>
                        Patterns
                     </Typography>
                     <Grid item xs={6}>
                        <Button onClick={useFetchRainbowStatic} variant="contained" color="primary"  size="small" className={classes.button}>
                            <Typography>STATIC</Typography>
                        </Button>
                        <Button onClick={useFetchRainbowDynamic} variant="contained" color="primary" size="small" className={classes.button}>
                            <Typography>DYNAMIC</Typography>
                        </Button>
                        </Grid>
                        <Grid item xs={6}>
                        <Button  onClick={useFetchWater} variant="contained"  color="primary" size="small" className={classes.button}>
                            <Typography>WATER</Typography>
                        </Button>
                        <Button onClick={useFetchBlink} variant="contained" color="primary" size="small" className={classes.button}>
                            <Typography>BLINK</Typography>
                        </Button>
                        </Grid>
                        <Grid item xs={6}>
                        <Button onClick={useFetchSinelon} variant="contained" color="primary" size="small" className={classes.button}>
                            <Typography>Cylon</Typography>
                        </Button>
                        <Button onClick={useFetchFire} variant="contained" color="primary" size="small" className={classes.button}>
                            <Typography>Fire</Typography>
                        </Button>
                        </Grid>
                        <Grid item xs={6}>
                        <Button onClick={useFetchConfetti} variant="contained" color="primary" size="small" className={classes.button}>
                            <Typography>SPARK</Typography>
                        </Button>
                        <Button onClick={useFetchBeat} variant="contained" color="primary" className={classes.button}>
                            <Typography>BPM</Typography>
                        </Button>
                        </Grid>
                    </Paper>           
                    </Grid>
                    <Grid item xs={6}>
                        {currentPatternOptions !== null ? <PatternOptionsCard  changeActualPatternShown={changeActualPatternShown} currentPatternOptions={currentPatternOptions} currentPatternOptionsData={currentPatternOptionsData} /> : null } 
                    </Grid>
    </Grid>
    );
    }
