var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('models/database.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS user(username VARCHAR UNIQUE, password VARCHAR, email VARCHAR, info TEXT, token INTEGER)");
});

function User(user){
  this.id = user.id;
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
  this.info = user.info;
  this.token = user.token;

  this.authed = user.authed;
};

User.prototype.update = function update(item, value, callback){
  db.run("UPDATE user SET username=?, password=?, email=?, info=? WHERE rowid=?", this.username, this.password, this.email, this.info, this.id);
};

User.prototype.auth = function auth(user, callback){
  db.get("SELECT rowid as id, * FROM user WHERE username=?", this.username, function(err, row) {
    if(err)
      console.log(err);
    if(callback)
      if(row && row['password'] == user.password)
        callback(row);
      else
        callback();
  });
}

User.prototype.exist = function exist(user, callback){
  db.get("SELECT rowid as id FROM user WHERE username=?", this.username, function(err, row) {
    if(err)
      console.log(err);
    if(callback)
      callback(user, row? row['id']:0);
  });
}

User.prototype.save = function save(callback){
  db.run("INSERT INTO user(username, password, email, info, token) VALUES(?, ?, ?, ?, ?)", this.username, this.password, this.email, this.info, 0);
};

User.prototype.remove = function remove(callback){
  db.run("DELETE FROM user WHERE rowid=?", this.id);
};

module.exports = User;
