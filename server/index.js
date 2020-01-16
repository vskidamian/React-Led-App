const express = require('express');
const bodyParser = require('body-parser');
const Serialport = require("serialport");
const firmata = require("firmata");

const MY_COMMAND = 0x01;
const SET_PATTERN = 0x01;
const SET_SOLID = 0x02;
const RUN = 0x03;
const CONFIG = 0x04;

const SET_BLINK_TIME = 0x05;

var cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
var strip = undefined;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const promiseWrite = async (transport, command) => {
    const promise = new Promise((resolve, reject) => {
        transport.write(command, (error) => {
            console.log({ command, error: error});
            if (!error) {
                resolve();
            } else {
                console.log('rejected');
                reject(error);
            }
        });
    });
    return promise;
};
var board = new firmata.Board('COM6', function () {
});

app.use(cors({ origin: '*' }));
app.get('/', async (req, res) => {
    res.send({hi: 'Lights MENU'});
});
/// '/color/test/0' (value='test', id='0' )
/// '/color/test/1' (value='test', id='1' )
/// '/color/test/2' (value='test', id='2' )
/*app.get('/color/:value/:id', (req, res) => {
    const { value } = req.params; 
    // const value = req.params.value;
});
*/
app.get('/on', (req, res) => { //to zmienic
    board.transport.write([0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    res.send({ hi: 'on' });
});
app.get('/run', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, RUN, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'run' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/config', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, CONFIG, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'config' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/red', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x00, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'red' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/green', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x01, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'green' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/blue', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x02, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'blue' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/yellow', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x03, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'yellow' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/cyan', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x04, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'cyan' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/magenta', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x05, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'magenta' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/white', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x06, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'white' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/upbrightness', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, 0x09, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'upbrightness' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/downbrightness', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, 0x0a, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'downbrightness' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/rainbowstatic', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x05, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'rainbowstatic' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });  
});
app.get('/rainbowdynamic', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x06, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ h1: 'rainbowdynamic' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/water', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x03, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'water' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/blink', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x01, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'blink' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/fire', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x04, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'fire' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });   
});

app.get('/cylon', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x07, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'cylon' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });   
});

app.get('/confetti', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x02, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'confetti' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });   
});

app.get('/beat', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x09, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'beat' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });  
});
/*app.get('/brightcontrol', async (req, res) => {
    board.transport.write([0xF0, MY_COMMAND, SET_PATTERN, 0x0b, 0xF7]);
    res.send({ hi: 'brightcontrol' });
});
*/
app.get('/uppattern', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, 0x0e, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'uppattern' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/downpattern', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, 0x0f, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'downpattern' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/off', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'off' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });  
});

//----------TESTY------------------------
app.post('/blinknumber', async (req,res) => {
    console.log(req.body);
    var blinknumber = req.body.post;
});
//---------------------------------------

app.get('/solidcolor', (req, res) => { //to zmienic
    board.transport.read([0xF0, MY_COMMAND, SET_PATTERN, 0x20, 0xF7]);
    res.send({ hi: 'solidcolor' });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
