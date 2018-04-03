const ejs = require('./base/base');
const elc = require('./base/electron');
const db = require('./base/DataBase.class');

ejs.setGlobal('render', 'http://127.0.0.1:63342/piece/application');

elc.ready(
    () => ejs.setGlobal('mainWin', elc.window(ejs.getGlobal('render') + '/login', {
            width: 800,
            height: 494,
            frame: false,
            resizable: false
        }))
);
elc.ipc();



