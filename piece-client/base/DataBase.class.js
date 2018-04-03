const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const ejs = require('./base');

class DataBase {
    /**
     * 构造函数
     * @param render 渲染进程地址
     * @param token 渲染进程跟主进程通信的令牌
     * @param params 通讯期间，携带的主进程的必要信息
     */
    constructor(path) {
        this._db = lowdb(new FileSync(path));
    }

    get id() {
        return new Date().getTime() + ejs.randomChar() + ejs.randomNum();
    }

    insert(table, data) {
        this._db.get(table).push(data).write();
    }

    delete() {

    }

    update() {

    }

    select() {

    }
}

module.exports = {
    DataBase: DataBase
};