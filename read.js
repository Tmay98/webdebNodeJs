let http = require('http');
let url = require("url");

http.createServer(function (request, response) {
    let names = "";
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
        let sql = "SELECT * FROM score";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            for (i = 0; i < result.length; i++ ) {
                names = names.concat(result[i].name + ": " + result[i].score + "<br>");
            }
            response.writeHead(200, {'Content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
            response.end(names);
        });
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
    });
}
).listen(process.env.PORT || 3000);
console.log('listening ...');
