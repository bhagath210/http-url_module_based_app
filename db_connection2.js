const pg = require('pg');
const connectionString = "postgres://postgres:Bhagath*999@localhost:5432/postgres";
const client = new pg.Client(connectionString);

client.connect(function (error, result) {
    if (error) {
        return console.error('could not connect to postgres', err);
    }
    else {
        return console.log("Successfully connected to PostgreSQL DB")
    }
});

function insertUser(user) {
    let insertQuery = `INSERT INTO test.user_tbl (uname, email) VALUES ('${user.userName}','${user.email}')`;
    console.log('insertQuery-->', insertQuery);
    client.query(insertQuery, function (error, result) {
        if (error) {
            return console.error('error while exicuting the query', error);
        } else {
            console.log('User Details Inserted successfully...', result.rows);
        }
    });
}

function usersListUsingCallback(fn){
    let selectQuery = `SELECT * FROM test.user_tbl`;
    console.log('selectQuery-->', selectQuery);
    client.query(selectQuery, function(error, result){
        if(error){
            fn({'error':"error"});
        }
        else{
            fn(result.rows)
        }
    });
}

function usersListUsingPromise(){
    let selectQuery = `SELECT * FROM test.user_tbl`;
    console.log('selectQuery-->', selectQuery);
    var prom = new Promise(function(resolve,reject){ // creating Promise object
        client.query(selectQuery, function(error, result){
            if(error){
                reject({'error':"error"});
            }
            else{
                resolve(result.rows)
            }
        });
    })
    return prom;
}

module.exports = {insertUser:insertUser, usersListUsingCallback:usersListUsingCallback, usersListUsingPromise:usersListUsingPromise};