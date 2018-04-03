'use strict';

MODULE('title', ({
                     type = 'h1',
                     text = '大标题',
                     fontColor = '',
                     fontFamily = '',
                     fontWeight = '',
                     fontSize = '',
                     backgroundColor = '',
                     width = '',
                     height = '',
                     top = '',
                     left = '',
                     url = ''
                 } = {}) => {

        let oh = ejs.createDom('h1');
        ejs.html(oh, '大标题');

        return {
            dom: oh,
            option: {//配置描述
                type: {
                    name: '类型',
                    type: 'select',
                    value: [
                        {
                            selected: true,
                            name: '大标题',
                            value: 'h1',
                        },
                        {
                            name: '副标题',
                            value: 'h2',
                        },
                        {
                            name: '小标题',
                            value: 'h3'
                        },
                        {
                            name: '极小标题',
                            value: 'h4'
                        }
                    ]
                },
                text: {
                    name: '文本',
                    type: 'text',
                    value: '这是一个标题'
                },
                fontColor: {
                    name: '颜色',
                    type: 'color',
                    value: 'rgba(0,0,0,1)'
                },
                fontFamily: {
                    name: '字体',
                    type: 'select',
                    value: [
                        {
                            selected: true,
                            name: '自动',
                            value: 'auto'
                        },
                        {
                            name: '微软雅黑',
                            value: '微软雅黑'
                        },
                        {
                            name: '宋体',
                            value: '宋体'
                        },
                        {
                            name: '黑体',
                            value: '黑体'
                        }
                    ]
                },
                fontWeight: {
                    name: '字体粗细',
                    type: 'select',
                    value: [
                        {
                            name: '正常',
                            value: 'normal'
                        },
                        {
                            name: '细体',
                            value: 'lighter'
                        },
                        {
                            selected: true,
                            name: '粗体',
                            value: 'bold'
                        },
                        {
                            name: '极粗体',
                            value: 'bolder'
                        }
                    ]
                },
                fontSize: {
                    name: '字号',
                    type: 'range',
                    max: 100,
                    min: 12,
                    value: 14
                },
                backgroundColor: {
                    name: '背景颜色',
                    type: 'color',
                    value: 'rgba(0,0,0,0)'
                },
                width: {
                    name: '宽度',
                    type: 'number',
                    step: 1,
                    min: 0,
                    value: 0
                },
                height: {
                    name: '高度',
                    type: 'number',
                    step: 1,
                    min: 0,
                    value: 0
                },
                top: {
                    name: '距离顶部',
                    type: 'number',
                    step: 1,
                    min: 0,
                    value: 0
                },
                left: {
                    name: '距离左部',
                    type: 'number',
                    step: 1,
                    min: 0,
                    value: 0
                },
                url: {
                    name: '超链接',
                    type: 'text',
                    value: ''
                }
            }
        };
    }
);