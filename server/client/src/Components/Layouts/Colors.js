import React, { useState, useCallback, useRef, useEffect } from "react";
import { Grid, Paper, Button, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChooseColor from "./ChooseColor";

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
      marginBottom: 10,
    }}
);

export default function ColorsMenu() {
    const classes = useStyles();
    const [isFetching, setFetching] = useState(false)
    const isComponentMounted = useRef(true)

    useEffect(() => {
        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const useFetchRed = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/red').then(async (data) => {
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

    const useFetchGreen = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/green').then(async (data) => {
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

    const useFetchBlue = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/blue').then(async (data) => {
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

    const useFetchYellow = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/yellow').then(async (data) => {
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

    const useFetchCyan = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/cyan').then(async (data) => {
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

    const useFetchMagenta = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/magenta').then(async (data) => {
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

    const useFetchWhite = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/white').then(async (data) => {
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
    <Grid>
        <Grid item xs={12}>
                <Paper style={styles.Paper}>
                <Typography variant="h6" style={{color: "#fff"}}>
                        Colors
                </Typography>
                    <Button onClick={(useFetchRed)} variant="contained" style={{color: "#fff", background:"#d50000"}} className={classes.button}>
                    <Typography>RED</Typography>
                </Button>
                    <Button onClick={useFetchGreen} variant="contained" style={{color: "#fff", background:"#00b200"}} className={classes.button}>
                    <Typography>GREEN</Typography>
                </Button>
                    <Button onClick={useFetchBlue} variant="contained" style={{color: "#fff", background:"#304ffe"}} className={classes.button}>
                    <Typography>BLUE</Typography>
                </Button>
                    <Button onClick={useFetchYellow} variant="contained" style={{color: "#212121", background:"#ffeb3b"}} className={classes.button}>
                    <Typography>YELLOW</Typography>
                </Button>
                    <Button onClick={useFetchCyan} variant="contained" style={{color: "#fff", background:"#2196f3"}} className={classes.button}>
                    <Typography>CYAN</Typography>
                </Button>
                    <Button onClick={useFetchMagenta} variant="contained" style={{color: "#fff", background:"#d500f9"}} className={classes.button}>
                    <Typography>MAGENTA</Typography>
                </Button>
                    <Button onClick={useFetchWhite} variant="contained" style={{color: "#212121", background:"#eeeeee"}} className={classes.button}>
                    <Typography>WHITE</Typography>
                </Button>
                < ChooseColor />
            </Paper>
        </Grid>
    </Grid>
    );
    }
