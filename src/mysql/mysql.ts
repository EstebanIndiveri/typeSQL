import mysql=require('mysql');


export default class MySQL{

    private static _instance:MySQL;

    conn:mysql.Connection;
    conectado:boolean=false;

    constructor(){
        console.log('Clase init');
        this.conn=mysql.createConnection({
            host     : 'localhost',
            port     : 3306,
            user     : 'user',
            password : 'admin',
            database : 'typeapp',
            charset : 'utf8'
          });
          this.conectarDB();
    }

    public static get instance(){
        return this._instance || (this._instance=new this())
    }

    static ejecutarQuery(query:string,callback:Function){
        this.instance.conn.query(query,(err,results:Object[],fields)=>{
            if(err){
                console.log('error en query');
                console.log(err);
                return callback(err);
            }
            if(results.length===0){
                callback('El registro no existe');
            }else{
                callback(null,results);
            }
        });
    }

    private conectarDB(){
        this.conn.connect((err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                return
            };
            this.conectado=true;
            console.log('base init');
        });
    }
}


