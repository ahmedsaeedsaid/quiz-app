const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

let mongoConnect;
//let onlineDb = "mongodb+srv://khaled:123@cluster0-w0rmb.mongodb.net/test?retryWrites=true&w=majority";
let local = 'mongodb://localhost:27017/Quiz';
mongoConnect = callback => {
    MongoClient.connect(
        local, {useNewUrlParser: true, useUnifiedTopology: true } , 
    )
        .then(client => {
            console.log('Connected!');

            _db = client.db();

            //callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
