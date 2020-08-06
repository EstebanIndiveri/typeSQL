"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase init');
        this.conn = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'user',
            password: 'admin',
            database: 'typeapp',
            charset: 'utf8'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.conn.query(query, (err, results, fields) => {
            if (err) {
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.conn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            ;
            this.conectado = true;
            console.log('base init');
        });
    }
}
exports.default = MySQL;
