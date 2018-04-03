ejs.ready(() => {
    //使用electron模块
    const {send, sendSync, listen} = NEW_ASYNC(ejs.root + 'electron/electron');

    //格式化样式
    $.formatStyle({
        fontSize: 14,
        fontColor: '#fff',
        background: '#2d2d35',
        cursor: 'default'
    });

    //图标
    $.iconFont({
        ttfUrl: '../../resources/iconfont/iconfont.ttf'
    });

    //保存地址
    $.on('.location', 'click', e => {
        listen(send('index/projectLocation'), data => e.target.value = data[0]);
    });


    //关闭
    $.on('.close', 'click', () => send('index/projectClose'));
    //确定
    $.on('.confirm', 'click', () => {
        let type = document.querySelector('#type');
        let name = document.querySelector('#name');
        let location = document.querySelector('#location');
        if (name.value === '') {
            error(name, '名称不得为空！');
        } else if (location.value === '') {
            error(location, '工程地址不得为空！');
        } else {
            send('index/projectConfirm', {
                type: type.value,
                name: name.value,
                location: location.value
            })
        }
    });

    function error(dom, str) {
        ejs.addClass(dom, 'error');
        dom.value = str;
        dom.onfocus = function () {
            if (ejs.hasClass(dom, 'error')) {
                dom.value = '';
                ejs.removeClass(dom, 'error')
            }
        }
    }
});

