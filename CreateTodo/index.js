var MongoClient = require('mongodb').MongoClient;
const url = 'your connection string here';
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  if (req.body && req.body.todo) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let todo = req.body.todo;
      db
        .collection('todo')
        .insertOne({ id: todo.id, name: todo.name, desc: todo.desc })
        .toArray(function(err, todos) {
          if (err) throw err;
          context.res = {
            status: 200,
            body: 'Todo Item inserted successfully!'
          };
          db.close();
          context.done();
        });
    });
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a todo in the request body'
    };
  }
};
