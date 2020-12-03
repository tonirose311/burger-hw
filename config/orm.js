const dbConn = require('./connection');

class ORM {
  constructor(connection = dbConn, table = 'burgers') {
    this.conn = connection;  
    this.table = table;      
  }
  
  selectAll(table = this.table, columns = '*') {
    const query = 'SELECT id, burger_name, devoured FROM burgers';
    
    return new Promise((resolve, reject) => {
      this.conn.query(query, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }
  
  insertOne(burgerName, devoured = false) {
    const data = {
      burger_name: burgerName,
      devoured: devoured 
    }
    const query = 'INSERT INTO ?? SET ?';
    
    return new Promise((resolve, reject) => {
      this.conn.query(query, [this.table, data], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }
  
  updateOne(id, obj) {
    const query = 'UPDATE ?? SET ? WHERE id = ?';
    
    return new Promise((resolve, reject) => {
      this.conn.query(query, [this.table, obj, id], (error, result, fields) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }
  
  deleteOne(id, obj) {
    const query = 'DELETE FROM ?? WHERE id = ?';
    
    return new Promise((resolve, reject) => {
      this.conn.query(query, [this.table, id], (error, result, fields) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }
}

module.exports = new ORM(dbConn);