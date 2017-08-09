var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('models/database.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS question(title VARCHAR UNIQUE, info TEXT, subject Text, tag Text, content TEXT, author INTEGER)");
});

function Question(question){
  this.id = question.id;
  this.title = question.title;
  this.info = question.info;
  this.subject = question.subject;
  this.tag = question.tag;
  this.content = question.content;
  this.author = question.author;
}

Question.prototype.save = function save(){
  db.run("INSERT INTO TABLE question(title, info, subject, tag, content, author) VALUES(?, ?, ?, ?, ?, ?)", this.title, this.info, this.subject, this.tag, this.content, this.author);
}

module.exports = Question;
