var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('models/user.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS user(username VARCHAR UNIQUE, password VARCHAR)");
});

function User(user){
  this.username = user.username;
  this.password = user.password;
};

User.prototype.exist = function exist(user, callback){
  db.get("SELECT COUNT(rowid) FROM user WHERE username=?", this.username, function(err, row) {
    if(err)
      console.log(err);
    if(callback)
      callback(user, row['COUNT(rowid)']);
  });
}

User.prototype.save = function save(callback){
  db.run("INSERT INTO user(username, password) VALUES(?, ?)", this.username, this.password);
};

module.exports = User;
