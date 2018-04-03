const {BrowserWindow, dialog} = require('electron');
const {db} = require('./database');

module.exports = (fn, data, conn, event) => {
    switch (fn) {
        //最小化
        case 'winMin':
            conn.params.mainWin.minimize();
            break;
        //最大
        case 'winMedMax':
            conn.params.mainWin.isMaximized() ? conn.params.mainWin.unmaximize() : conn.params.mainWin.maximize();
            break;
        //关闭
        case 'winClose':
            conn.params.mainWin.close();
            break;
        //新建
        case 'projectNew':
            if (conn.params.newWin)
                conn.params.newWin.show();
            else {
                let newWin = new BrowserWindow({
                    parent: conn.params.mainWin,
                    width: 340,
                    height: 190,
                    modal: true,
                    show: false,
                    frame: false,
                    resizable: false
                });
                newWin.loadURL(conn.render + 'newProject/');
                newWin.once('ready-to-show', () => newWin.show());
                conn.addParams('newWin', newWin);
            }
            break;
        //关闭
        case 'projectClose':
            conn.params.newWin.hide();
            break;
        //确定
        case 'projectConfirm':
            //conn.params.newWin.hide();
            /*conn.params.newWin.close();
            conn.delParams('newWin');*/
            db('addProject',{
                type:data.type,
                name:data.name,
                location:data.location
            });
            break;
        //选择地址
        case 'projectLocation':
            dialog.showOpenDialog({
                title: '创建工程',
                properties: ['openDirectory']
            }, filenames => {
                if (filenames)
                    conn.respond(event, filenames);
            });
            break;
        //导入
        case 'projectImport':
            break;
    }
};