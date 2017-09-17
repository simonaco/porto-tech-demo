var MongoClient = require('mongodb').MongoClient;
const url = 'your connection string here';
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db
      .collection('todo')
      .find({})
      .toArray(function(err, todos) {
        if (err) throw err;
        todos.forEach(t => {
          delete t._id;
        });
        context.res = {
          body: todos
        };
        db.close();
        context.done();
      });
  });
};
