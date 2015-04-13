#!/usr/bin/env node

var Database = require('./methods');

var input;
var msg;
var db = new Database();

process.stdin.setEncoding('utf8');

process.stdout.write('DATABASE CREATED \n')

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    input = chunk.replace('\n','').split(' ');
    switch(input[0].toUpperCase()) {
      case "SET":
        db.set(input[1], input[2])
        break;
      case "GET":
        process.stdout.write(db.get(input[1])+'\n');
        break;
      case "UNSET":
        db.unset(input[1]);
        break;
      case "NUMEQUALTO":
        process.stdout.write(db.numEqualTo(input[1])+'\n');
        break;
      case "END":
        process.stdout.write('DATABASE DELETED \n')
        process.exit(0)
        break;
      case "BEGIN":
        db.begin();
        break;
      case "ROLLBACK":
        msg = db.rollback();
        if (msg) { process.stdout.write(msg+'\n'); }
        break;
      case "COMMIT":
        msg = db.commit();
        if (msg) { process.stdout.write(msg+'\n'); }
        break;
    }
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});
