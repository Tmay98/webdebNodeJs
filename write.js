let http = require('http');
let url = require("url")

http.createServer(function (request, response) {
    let q = url.parse(request.url, true);
    const mysql = require("mysql");
    const con = mysql.createPool({
        host: "us-cdbr-east-03.cleardb.com",
        user: "bdd9d9b8d4db5b",
        password: "2481dad7",
        database: "heroku_e26bbf5cbd23920"
    });

    con.getConnection(function(err, connection) {
        if (err) throw err;

        const createTableQuery = [
            'CREATE TABLE IF NOT EXISTS score',
            '(id INT AUTO_INCREMENT PRIMARY KEY,',
            'name VARCHAR(255),',
            'score INT)'
        ].join(' ');
        connection.query(createTableQuery, (err, result) => {
            if (err) throw err;
            console.log('Table created');
        });

        console.log("connected");
        let sql = "INSERT INTO score(name, score) values ('" + q.query["name"] + "', " +  q.query["score"] + ")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
    });
        console.log("server received req");
        response.writeHead(200, {'Content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
        response.end(q.query["name"] + ": " + q.query["score"] + "was stored in DB");
    }
).listen(process.env.PORT || 3030);
console.log('listening ...');
