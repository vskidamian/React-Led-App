const express = require('express');
const bodyParser = require('body-parser');
const Serialport = require("serialport");
const firmata = require("firmata");

const MY_COMMAND = 0x01;
const SET_PATTERN = 0x01;
const SET_SOLID = 0x02;
const GET_PATTERN = 0x03;
const RUN = 0x03;
const CONFIG = 0x04;
const ACCESS0R = 0x05;
const SET = 0x00;
const GET = 0x01;
const NUMBER = 0x03;
const VALUE = 0x02;
const RED = 0x04;
const GREEN = 0x05;
const BLUE = 0x06;
const STATICNUMBER = 0x00;
const STATICDELTA = 0x01;
const DYNAMICNUMBER = 0x07;
const DYNAMICDELTA = 0x08;
const COOLINGWATER = 0x09;
const SPARKINGWATER = 0x0a;
const COOLINGFIRE = 0x0b;
const SPARKINGFIRE = 0x0c;
const BLINKNUMBER = 0x0d;
const CYLONTRAIL = 0x0e;
const CYLONSPEED = 0x0f;
const CYLONNUMBER = 0x10;
const SPARKNUMBER = 0x11;
const BPMNUMBER = 0x12;
const BPMSPEED = 0x13;
const PATTERN = 0x1b;
const COLOR = 0x1c;
const GET_SOLID = 0x04;
var encode = [];

var obecna_wartosc;
var obecny_color;
var actual_pattern;
function handleAccessorCommand(data) { 
      try {
        encode = firmata.decode(data);
        //console.log(encode);
      } catch (e) {
        console.log({m: 'error', e});
      }

      if (encode.length && encode[1] === PATTERN) { //
        obecna_wartosc = encode[2];
        console.log({ok: obecna_wartosc});
        switch(obecna_wartosc){
            case 0:{
                actual_pattern = "Solid Color";
                break;
            }
            case 1:{
                actual_pattern = "Blink";
                break;
            }
            case 2:{
                actual_pattern = "Spark";
                break;
            }
            case 3:{
                actual_pattern = "Water";
                break;
            }
            case 4:{
                actual_pattern = "Fire";
                break;
            }
            case 5:{
                actual_pattern = "Rainbow Solid";
                break;
            }
            case 6:{
                actual_pattern = "Rainbow Dynamic";
                break;
            }
            case 7:{
                actual_pattern = "Cylon";
                break;
            }
            case 8:{
                actual_pattern = "None";
                break;
            }
            case 9:{
                actual_pattern = "BPM";
                break;
            }
            default: {
                actual_pattern = "NONE";
            }
        }
        console.log({handleAccessorCommand: actual_pattern});
      } else if (encode.length && encode[1] === COLOR){
          obecny_color = encode[2];
          console.log({kolor: obecny_color});
      }
    }

var cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
var strip = undefined;

var urlencodedParse = bodyParser.urlencoded({extended: false});

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

var board = new firmata.Board('COM3', function () {
    board.sysexResponse(MY_COMMAND, handleAccessorCommand);
   
});

app.use(cors({ origin: '*' }));
app.get('/', async (req, res) => {
    res.send({hi: 'Lights MENU'});
});

app.get('/on', (req, res) => { //to zmienic
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x01, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'on' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
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
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise3 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    const data1 = firmata.encode([MY_COMMAND, GET_SOLID]);
    const promise4 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_SOLID, 0xF7]);
    return Promise.all([promise1, promise2, data, promise3, data1, promise4]).then(() => {
        res.send({ hi: 'red' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/green', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x01, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise3 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    const data1 = firmata.encode([MY_COMMAND, GET_SOLID]);
    const promise4 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_SOLID, 0xF7]);
    return Promise.all([promise1, promise2, data, promise3, data1, promise4]).then(() => {
        res.send({ hi: 'green' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/blue', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x02, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise3 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    const data1 = firmata.encode([MY_COMMAND, GET_SOLID]);
    const promise4 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_SOLID, 0xF7]);
    return Promise.all([promise1, promise2, data, promise3, data1, promise4]).then(() => {
        res.send({ hi: 'blue' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/yellow', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x03, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise3 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    const data1 = firmata.encode([MY_COMMAND, GET_SOLID]);
    const promise4 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_SOLID, 0xF7]);
    return Promise.all([promise1, promise2, data, promise3, data1, promise4]).then(() => {
        res.send({ hi: 'yellow' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/cyan', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x04, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise3 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    const data1 = firmata.encode([MY_COMMAND, GET_SOLID]);
    const promise4 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_SOLID, 0xF7]);
    return Promise.all([promise1, promise2, data, promise3, data1, promise4]).then(() => {
        res.send({ hi: 'cyan' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/magenta', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x05, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise3 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    const data1 = firmata.encode([MY_COMMAND, GET_SOLID]);
    const promise4 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_SOLID, 0xF7]);
    return Promise.all([promise1, promise2, data, promise3, data1, promise4]).then(() => {
        res.send({ hi: 'magenta' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/white', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x00, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_SOLID, 0x06, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise3 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    const data1 = firmata.encode([MY_COMMAND, GET_SOLID]);
    const promise4 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_SOLID, 0xF7]);
    return Promise.all([promise1, promise2, data, promise3, data1, promise4]).then(() => {
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
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2, ]).then(() => {
        console.log({actual_pattern: actual_pattern});
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });  
});

app.get('/rainbowstaticoptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1,data,promise2]).then(() => {
        //res.send({ hi: 'static options'});
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/rainbowdynamicoptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1,data,promise2]).then(() => {
        //res.send({ hi: 'dynamic options'});
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/rainbowdynamic', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x06, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        //res.send({ h1: 'rainbowdynamic' });
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/wateroptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1,data,promise2]).then(() => {
        //res.send({ hi: 'water options'});
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/water', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x03, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        //res.send({ hi: 'water' });
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/blinkoptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1,data,promise2]).then(() => {
        res.json(actual_pattern);
        //res.send({ hi: 'blink options'});
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/blink', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x01, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        //res.send({ hi: 'blink' });
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});
app.get('/fireoptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1,data,promise2]).then(() => {
       // res.send({ hi: 'fire options'});
       res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/fire', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x04, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        res.json(actual_pattern);
        //res.send({ hi: 'fire' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });   
});
app.get('/cylonoptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1,data,promise2]).then(() => {
        res.json(actual_pattern);
        //res.send({ hi: 'cylon options'});
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});


app.get('/cylon', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x07, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        res.json(actual_pattern);
        //res.send({ hi: 'cylon' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });   
});

app.get('/confettioptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        //res.send({ hi: 'confetti options'});
        res.json(actual_pattern);
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/confetti', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x02, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        res.json(actual_pattern);
        //res.send({ hi: 'confetti' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });   
});
app.get('/beatoptions', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x08, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        res.json(actual_pattern);
        //res.send({ hi: 'beat options'});
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});


app.get('/beat', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x09, 0xF7]);
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise2 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([promise1, data, promise2]).then(() => {
        res.json(actual_pattern);
        //res.send({ hi: 'beat' });
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });  
});

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

app.post('/numberofleds', async (req,res) => {
    var numberofleds = req.body.ledsNumber;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, NUMBER, numberofleds, 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, NUMBER, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'number of leds'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/choosecolor', async (req, res) => {
    let valueOfColors = req.body.valueOfColors;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, RED, valueOfColors[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, RED, 0xF7]);
    const promise3 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, GREEN, valueOfColors[1], 0xF7]);
    const promise4 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, GREEN, 0xF7]);
    const promise5 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, BLUE, valueOfColors[2], 0xF7]);
    const promise6 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, BLUE, 0xF7]);
    return Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then(() => {
        res.send({ hi: 'colors number'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/staticsettings', async (req, res) => {
    let settingsOfStatic = req.body.staticSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, STATICNUMBER, settingsOfStatic[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, STATICNUMBER, 0xF7]);
    const promise3 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, STATICDELTA, settingsOfStatic[1], 0xF7]);
    const promise4 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, STATICDELTA, 0xF7]);
    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        res.send({ hi: 'static settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/dynamicsettings', async (req, res) => {
    let settingsOfDynamic = req.body.dynamicSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, DYNAMICNUMBER, settingsOfDynamic[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, DYNAMICNUMBER, 0xF7]);
    const promise3 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, DYNAMICDELTA, settingsOfDynamic[1], 0xF7]);
    const promise4 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, DYNAMICDELTA, 0xF7]);
    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        res.send({ hi: 'dynamic settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/watersettings', async (req, res) => {
    let settingsOfWater = req.body.waterSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, COOLINGWATER, settingsOfWater[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, COOLINGWATER, 0xF7]);
    const promise3 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, SPARKINGWATER, settingsOfWater[1], 0xF7]);
    const promise4 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, SPARKINGWATER, 0xF7]);
    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        res.send({ hi: 'water settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/firesettings', async (req, res) => {
    let settingsOfFire = req.body.fireSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, COOLINGFIRE, settingsOfFire[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, COOLINGFIRE, 0xF7]);
    const promise3 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, SPARKINGFIRE, settingsOfFire[1], 0xF7]);
    const promise4 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, SPARKINGFIRE, 0xF7]);
    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        res.send({ hi: 'fire settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/blinksettings', async (req, res) => {
    let settingsOfBlink = req.body.blinkSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, BLINKNUMBER, settingsOfBlink[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, BLINKNUMBER, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'blink settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/cylonsettings', async (req, res) => {
    let settingsOfCylon = req.body.cylonSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, CYLONNUMBER, settingsOfCylon[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, CYLONNUMBER, 0xF7]);
    const promise3 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, CYLONSPEED, settingsOfCylon[1], 0xF7]);
    const promise4 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, CYLONSPEED, 0xF7]);
    const promise5 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, CYLONTRAIL, settingsOfCylon[2], 0xF7]);
    const promise6 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, CYLONTRAIL, 0xF7]);
    return Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then(() => {
        res.send({ hi: 'cylon settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/sparksettings', async (req, res) => {
    let settingsOfSpark = req.body.sparkSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, SPARKNUMBER, settingsOfSpark[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, SPARKNUMBER, 0xF7]);
    return Promise.all([promise1, promise2]).then(() => {
        res.send({ hi: 'spark settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});

app.post('/bpmsettings', async (req, res) => {
    let settingsOfbpm = req.body.bpmSettings;
    const promise1 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, BPMNUMBER, settingsOfbpm[0], 0xF7]);
    const promise2 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, BPMNUMBER, 0xF7]);
    const promise3 = promiseWrite(board.transport, [0xF0, ACCESS0R, SET, BPMSPEED, settingsOfbpm[1], 0xF7]);
    const promise4 = promiseWrite(board.transport, [0xF0, ACCESS0R, GET, BPMSPEED, 0xF7]);
    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        res.send({ hi: 'bpm settings'});
    }).catch((error) => {
        res.send({ hi: 'error', details: error});
    });
});


app.get('/showcolor', async (req, res) => {
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, SET_PATTERN, 0x0a, 0xF7]);
    return Promise.all([promise1]).then(() => {
        res.send({ hi: 'showcolor hex'});
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
});

app.get('/test', async (req, res) => {
    const data = firmata.encode([MY_COMMAND, GET_PATTERN]);
    const promise1 = promiseWrite(board.transport, [0xF0, MY_COMMAND, GET_PATTERN, 0xF7]);
    return Promise.all([data,promise1]).then(() => {
        res.send({ hi: 'TEST'});
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
   
});

app.get('/read', async (req, res) => {
    const read = console.log(obecna_wartosc);
    return Promise.all([read]).then(() => {
        res.send({ hi: 'READ'});
    }).catch((error) => {
        res.send({hi: 'error', details: error});
    });
   
});



app.get('/solidcolor', (req, res) => { 
    board.transport.read([0xF0, MY_COMMAND, SET_PATTERN, 0x20, 0xF7]);
    res.send({ hi: 'solidcolor' });
    
});


app.listen(port, () => console.log(`Listening on port ${port}`));
