import React, { useState, useCallback, useRef, useEffect } from "react";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
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

export default function ConfigurationCard() {
    const classes = useStyles();
    const [isFetching, setFetching] = useState(false)
    const isComponentMounted = useRef(true)

    useEffect(() => {
        return () => {
            isComponentMounted.current = false
        }
    }, [])

    const useFetchRun = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/run').then(async (data) => {
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

    const useFetchConfig = useCallback(async () => {
        if (isFetching) {
            return;
        }
        setFetching(true);
        const result = await fetch('http://localhost:5000/config').then(async (data) => {
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

        <Paper style={styles.Paper}>
            <Typography variant="h6" style={{ color: "#fff" }}>
                Configuration
                     </Typography>
            <Grid item xs={6}>
                <Button onClick={useFetchRun} variant="contained" style={{ color: "#fff", background: "#2196f3" }} className={classes.button}>
                    <Typography>RUN</Typography>
                </Button>
                <Button onClick={useFetchConfig} variant="contained" color="secondary" className={classes.button}>
                    <Typography>CONFIG</Typography>
                </Button>
            </Grid>
        </Paper>

    );
}