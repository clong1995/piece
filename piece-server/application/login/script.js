ejs.ready(() => {
    //使用electron模块
    const {send} = NEW_ASYNC(ejs.root + 'electron/electron', {});

    $.formatStyle({
        scrollbarSize: 5,
        scrollbarRadius: 3,
        scrollbarColor: '#c2c2c2',
        scrollbarBackgroundColor: 'none'
    });
    $.iconFont({
        ttfUrl: '../../resources/iconfont/iconfont.ttf'
    });
    //登录
    $.on('.id-login', 'click', () =>
        send('login/login', {
            id: document.querySelector('#id').value,
            password: document.querySelector('#password').value
        })
    );
    //关闭
    $.on('.close', 'click', () => send('close'))
}, false);