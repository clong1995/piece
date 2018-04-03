ejs.ready($ => {
    //格式化样式
    $.formatStyle();
    /*
    $.loadScript('../../EModule/EModule.class', () => {
        window.M = new EModule();
        MRequire('title');
    })*/

    NEW($.root + '../EModule/module', {}, fn => {
            fn.USE('title');
        }
    )
});