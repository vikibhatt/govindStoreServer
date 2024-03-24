import sqlite3 from 'sqlite3'

const sqlite = sqlite3.verbose();

const db = new sqlite3.Database('foodItems.db');

const createDatabase = ()=>{
    db.run("CREATE TABLE IF NOT EXISTS items(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), price INTEGER)")
    console.log("table created successfully");
}

const insertData = () =>{
    const data = db.prepare("INSERT INTO items(name, price) VALUES(?, ?)")
    data.run("milk", 33)
    data.finalize();
    console.log("data inserted successfully");
}

const deleteTable = ()=>{
    db.run('DROP table items')
    console.log("table deleted successfully");
}

const showDatabase = ()=>{
    db.each('SELECT * FROM items', (err, row) => {
        if(err){
            console.error(err?.message);
        }
        console.table(row);
    });
}

deleteTable()

db.close();