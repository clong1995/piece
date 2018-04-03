const {app, BrowserWindow, ipcMain} = require('electron');
const ejs = require('./base');
// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => app.quit());


module.exports = {
    /**
     * 加载完成
     * @param callback
     * @returns {*}
     */
    ready: callback => app.on('ready', () => callback()),

    /**
     * 创建窗口
     * @param url
     * @param opt
     */
    window: (url = 'http://127.0.0.1', opt = {}, callback) => {
        let win = new BrowserWindow(ejs.assignDeep({
            show: false,
            width: 1024,
            height: 768
        }, opt));
        win.loadURL(url);
        win.once('ready-to-show', () => {
            if (opt.max)
                win.maximize();
            else
                win.show();
        });
        return win;
    },

    /**
     * ipc通讯
     * @param ipcToken
     */
    ipc: (ipcToken = 'ipc-token') => {
        ipcMain.on(ipcToken, (event, route, data = {}) => {
            let r = route.split('/');
            let returnData = null;
            try {
                returnData = require('../application/' + r[0] + '/control.js')(r[1], JSON.parse(data), event);
            } catch (e) {
                returnData = {state: 'err', msg: e}
            }
            if (!returnData)
                event.sender.send(ipcToken, JSON.stringify(returnData));
        });
    }
};