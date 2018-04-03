//伪全局变量
const globalVar = new Map();

module.exports = {
    /**
     * 获取数组最大最小值
     * @param arr
     * @param type
     * @returns {number}
     */
    arrMaxMin: (arr, type = 'max') => type === 'max' ? Math.max(...arr) : Math.min(...arr),

    /**
     * 深度合并和拷贝对象，建议obj2为少的一方
     * @param obj
     * @param obj2
     * @returns {*}
     */
    assignDeep: (obj, obj2) => {
        for (let k in obj2)
            typeof obj2[k] === 'object'
                ? obj[k] === undefined
                ? obj[k] = obj2[k]
                : this.assignDeep(obj[k], obj2[k])
                : obj[k] = obj2[k];
        return obj
    },

    /**
     * 转驼峰写法
     * @param str
     * @returns {string | void | *}
     */
    camelize: str => (!str.includes('-') && !str.includes('_'))
        ? str
        : str.replace(/[-_][^-_]/g, match => match.charAt(1).toUpperCase()),

    /**
     * 首字母大写
     * @param str
     * @returns {string}
     */
    capitalize: str => str.charAt(0).toUpperCase() + str.substring(1),

    /**
     * 克隆数组
     * @param arr
     * @returns {*[]}
     */
    cloneArr: arr => [...arr],

    delGlobal: key => globalVar.delete(key),

    /**
     * 差集
     * @param arr1
     * @param arr2
     * @returns {*[]}
     */
    difference: (arr1, arr2) => [...new Set([...arr1].filter(x => !arr2.has(x)))],

    /**
     * 数组去重
     * @param arr
     * @returns {*[]}
     */
    distinct: arr => [...new Set(arr)],

    getAllGlobal: () => globalVar,

    getGlobal: key => globalVar.get(key),

    /**
     * GUID
     * @returns {string}
     */
    guid: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }),

    hasGlobal: key => globalVar.has(key),

    /**
     * 交集
     * @param arr1
     * @param arr2
     * @returns {*[]}
     */
    intersect: (arr1, arr2) => [...new Set([...arr1].filter(x => arr2.has(x)))],

    /**
     * 向数组的尾部拼接数组
     * @param tagArr 目标数组
     * @param endArr 尾部数组
     * @returns {*|number}
     */
    pushEnd: (tagArr, endArr) => tagArr.push(...endArr),

    /**
     * 随机字母
     * @param len
     * @param type
     * @returns {string}
     */
    randomChar: (len = 4, type = 'upper') => {
        let rc = '';
        for (let i = 0; i < len; ++i)
            rc += String.fromCharCode(65 + Math.ceil(Math.random() * 25));
        return type === 'upper' ? rc : rc.toLowerCase();
    },

    /**
     * 随机数
     * @param minNum
     * @param maxNum
     * @returns {number}
     */
    randomNum: (minNum = 0, maxNum = 1000) => parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10),

    setGlobal: (key, value) => globalVar.has(key)
        ? console.error(key + ' 全局变量：已经被使用了！')
        : globalVar.set(key, value),

    /**
     * 获取文本的长度，兼容各种码点的长度
     * @param str
     * @returns {number}
     */
    strLength: str => {
        let size = 0;
        for (let i of str) ++size;
        return size;
    },

    /**
     *  去除空白和指定字符串，无参默认去除左右空白
     * @param str
     * @param char 指定字符 默认：''
     * @param position  left right 默认：''
     * @returns {string}
     */
    trim: (str, {char = '', position = ''} = {}) => {
        let newStr = '';
        if (char) {
            if (position === 'left')
                newStr = str.replace(new RegExp('^\\' + char + '+', 'g'), '');
            if (position === 'right')
                newStr = str.replace(new RegExp('\\' + char + '+$', 'g'), '');
            if (position === '')
                newStr = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
        } else
            newStr = str.trim();
        return newStr;
    },

    /**
     * 字符的截断处理
     * @param str
     * @param length
     * @param truncation
     * @returns {string}
     */
    truncate: (str, length = 30, truncation = '...') => str.length > length
        ? str.slice(0, length - truncation.length) + truncation
        : str,

    /**
     * 转划线写法
     * @param str
     * @param type
     * @returns {string}
     */
    underscored: (str, type = '-') => str.replace(/([a-z\d])([A-Z])/g, '$1' + type + '$2').replace(/\-/g, type).toLowerCase(),

    /**
     * 实体转html
     * @param str
     * @returns {string}
     */
    unescapeHTML: str => str.replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, "&") //处理转义的中文和实体字符
        .replace(
            /&#([\d]+);/g,
            ($0, $1) => String.fromCharCode(parseInt($1, 10))
        ),

    /**
     * 并集
     * @param arr1
     * @param arr2
     * @returns {*[]}
     */
    union: (arr1, arr2) => [...new Set([...arr1, ...arr2])],

    updateGlobal: (key, value) => globalVar.set(key, value),
};