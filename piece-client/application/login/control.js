const ejs = require('../../base/base');
const elc = require('../../base/electron');
module.exports = (fn, data, event) => {
    switch (fn) {
        case 'login':
            if (data.id === 'admin' && data.password === '123456') {
                ejs.getGlobal('mainWin').hide();
                let mainWin = elc.window(ejs.getGlobal('render') + '/index', {
                    //max:true,
                    minWidth: 1060,
                    minHeight: 688,
                    width: 1060,
                    height: 688,
                    backgroundColor:'#000',
                    frame: false
                });
                ejs.getGlobal('mainWin').close();
                ejs.updateGlobal('mainWin',mainWin);

            } else {
                //'用户名或者密码错误'
            }
            break;
        case 'close':

            break;
        case 'logout':

            break;
    }
};