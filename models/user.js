var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('models/user.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS user(email VARCHAR(32), password VARCHAR(32))");
});

function User(user){
  this.email = user.email;
  this.password = user.password;
};

User.prototype.save = function save(callback){
  db.run("INSERT INTO user(email, password) VALUES(?, ?)", this.email, this.password);
};

module.exports = User;
