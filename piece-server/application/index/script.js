ejs.ready(() => {
    //使用electron模块
    const {send} = NEW_ASYNC(ejs.root + 'electron/electron');

    //格式化样式
    $.formatStyle({
        fontSize: 14,
        fontColor: '#cdcdcd',
        background: '#2d2d35',
        cursor: 'default',
        userSelect: 'none',
        scrollbarRadius: 5
    });

    //图标
    $.iconFont({
        ttfUrl: '../../resources/iconfont/iconfont.ttf'
    });

    //窗口控制
    $.on('.win-min', 'click', () => send('index/winMin'));
    $.on('.win-med-max', 'click', () => send('index/winMedMax'));
    $.on('.win-close', 'click', () => send('index/winClose'));


    //新建工程
    $.on('.new-project', 'click', () => send('index/projectNew'));

    //导入工程
    $.on('.import-project', 'click', () => send('index/projectImport'));


}, false);