/**
 * 模块调度类
 */
class EModule {
    constructor() {
        //模块栈
        this.moduleStack = new Map();
        //数据栈
        this.dataStack = new WeakMap();

        window.MRequire = this._module.bind(this);

        window.MDefine = this._define.bind(this);

        //document.oncontextmenu = (e) => e.preventDefault();

        //克隆后可以使用
        this.shell = this._shell();

        this.windowSize = ejs.windowSize();
    }

    //加载模块
    _module(moduleName) {
        ejs.loadScript('../../EModule/' + moduleName + '.mod', () => {
            let {
                dom,
                option
            } = this.moduleStack.get(moduleName)();
            this._parcel(dom, option);
        })
    }

    //定义模块
    _define(moduleName, fn) {
        this.moduleStack.set(moduleName, fn());
    }

    //模块包装


    //模块编辑器
    _parcel(dom, option) {
        let oShell = this.shell.shell.cloneNode(true),
            oMenu = this.shell.menu.cloneNode(true),
            oCover = this.shell.cover.cloneNode(true);

        //数据
        let data = new Map();

        let
            oItem = ejs.createDom('li'),//菜单项
            oItemClone = null;

        let
            oSelect = ejs.createDom('select'),//菜单
            oText = ejs.createDom('input', {type: 'text'}),//文本
            oColor = ejs.createDom('input', {type: 'color'}),//颜色拾取
            oRange = ejs.createDom('input', {type: 'range'}),//范围
            oNumber = ejs.createDom('input', {type: 'number'});//数字

        let oItemContent = null;
        for (let o in option) {
            oItemClone = oItem.cloneNode();
            switch (option[o].type) {
                //下拉列表
                case 'select':
                    oItemContent = oSelect.cloneNode();
                    option[o].value.forEach(v => {
                        oItemContent.add(new Option(v.name, v.value, v.selected, v.selected));
                    });
                    break;

                //文本输入
                case 'text':
                    oItemContent = oText.cloneNode();
                    oItemContent.value = option[o].value;
                    break;

                //文本输入
                case 'range':
                    oItemContent = oRange.cloneNode();
                    ejs.attr(oItemContent, {
                        value: option[o].value,
                        max: option[o].max,
                        min: option[o].min,
                        step: 1
                    });
                    break;

                //文本输入
                case 'number':
                    oItemContent = oNumber.cloneNode();
                    ejs.attr(oItemContent, {
                        value: option[o].value,
                        min: option[o].min,
                        step: 1
                    });
                    break;

                //颜色拾取
                case 'color':
                    oItemContent = oColor.cloneNode();
                    oItemContent.value = option[o].value;
                    break;
            }

            //保存数据
            let value = option[o].value;
            (typeof value === 'object')
                ? value.forEach(v => {
                    if (v.selected) data.set(o,v.value);
                })
                : data.set(o,value);

            //组装菜单
            ejs.attr(oItemContent,{name:o});
            ejs.append(oMenu, ejs.appendBatch(oItemClone, [
                ejs.textNode(option[o].name.padEnd(4, '　')),
                oItemContent]));
        }

        ejs.append(oMenu, ejs.appendBatch(
            oItem.cloneNode(), [
                ejs.html(ejs.createDom('button', {
                    type: "button"
                }), '删除'),
                ejs.html(ejs.createDom('button', {
                    type: "button"
                }), '复制'),
                ejs.html(ejs.createDom('button', {
                    type: "button"
                }), '存为模板')
            ]
        ));


        //输入的监听
        oMenu.onkeyup = e => {
            let target = e.target;
            if(target.nodeName === 'INPUT'){
                this._update(oCover,target.name,target.value);
            }
        };
        //选择的监听
        oMenu.onchange = e =>{
            let target = e.target;
            if(target.nodeName === 'SELECT'){

            }
            if(target.type === 'color'){

            }
        };
        //兼容其他事件
        oMenu.onmouseup = e =>{
            let target = e.target;
            if(target.type === 'number'){

            }
            if(target.type === 'range'){

            }
        };


        //绑定数据
        this.dataStack.set(oCover, data);
        //绘制菜单

        //组装模块
        ejs.append(ejs.body, ejs.appendBatch(oShell, [
            ejs.append(oCover, oMenu),
            dom]
        ));

        //居中显示
        ejs.css(oShell, {
            'left': (this.windowSize.ww - dom.clientWidth) / 2 + 'px',
            'top': (this.windowSize.wh - dom.clientHeight) / 3 + 'px',
            'display': 'block'
        });
    }

    /**
     * 包装壳
     * @returns {{shell: *, cover: *}}
     * @private
     */
    _shell() {
        //最外壳
        let oShellClass = ejs.simple(),
            oShell = ejs.createDom('div', {
                class: oShellClass
            });
        ejs.setStyle('.' + oShellClass, {
            'position': 'absolute',
            'cursor': 'pointer',
            'display': 'none'
        });

        //遮罩
        let oCoverClass = ejs.simple(),
            oCover = ejs.createDom('div', {
                class: oCoverClass
            });
        ejs.setStyle('.' + oCoverClass, {
            'width': '100%',
            'height': '100%',
            'background': 'rgba(54, 146, 208, .3)',
            'border': '1px solid rgb(54, 146, 208)',
            'position': 'absolute',
            'display': 'none'
        });

        //hover效果
        ejs.setStyle('.' + oShellClass + ':hover>.' + oCoverClass, {
            'display': 'block'
        });

        //菜单外壳
        let oMenuWrapClass = ejs.simple(),
            oMenuWrap = ejs.createDom('ul', {
                'class': oMenuWrapClass
            });
        ejs.setStyle('.' + oMenuWrapClass, {
            'background': 'rgb(204, 204, 204)',
            'border': '1px solid rgb(102, 102, 102)',
            'position': 'absolute',
            'top': '15px',
            'left': '15px',
            'display': 'none',
            'padding': '10px'
        });

        ejs.setStyle('.' + oMenuWrapClass + ' li', {
            'white-space': 'nowrap'
        });


        /**
         * 拖拽事件
         */
        let target, x0, y0, x1, y1, x2, y2, isMove = false, clickTag;
        ejs.on('.' + oCoverClass, 'mousedown', function (e) {
            if (e.button === 0) {//左键移动
                target = e.target.parentNode;
                //原始坐标
                x0 = parseFloat(target.style.left);
                y0 = parseFloat(target.style.top);
                //获取点击的坐标
                x1 = e.clientX;
                y1 = e.clientY;
                isMove = true;
            } else if (e.button === 2) {//显示菜单
                clickTag = e.target;
                ejs.css(clickTag.firstChild, {
                    'display': 'block'
                });
            }
        });

        //鼠标移出菜单
        ejs.on('.' + oMenuWrapClass, 'mouseleave', function (e) {
            ejs.css(e.target, {
                'display': 'none'
            });
        });
        //或者鼠标移出模块
        ejs.on('.' + oCoverClass, 'mouseleave', function (e) {
            ejs.css(e.target.firstChild, {
                'display': 'none'
            });
        });


        //解除移动
        ejs.body.onmouseup = () => isMove ? isMove = false : '';

        //移动
        ejs.body.onmousemove = (e) => {
            if (isMove) {
                //移动坐标
                x2 = e.clientX;
                y2 = e.clientY;
                ejs.css(target, {
                    'top': (y0 + y2 - y1) + 'px',
                    'left': (x0 + x2 - x1) + 'px'
                })
            }
        };
        return {shell: oShell, cover: oCover, menu: oMenuWrap};
    }

    /**
     * 更新到数据栈
     * @param objKey
     * @param key
     * @param value
     * @private
     */
    _update(objKey,key,value){
        this.dataStack.get(objKey).set(key,value);
    }
}