let http = require('http');
let url = require("url");

http.createServer(function (request, response) {
    let names = "[";
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

        console.log("connected");
        let sql = "SELECT * FROM quote";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            for (i = 0; i < result.length; i++ ) {
                names = names.concat("\"" + result[i].id + "\", \"" + result[i].quoteText + "\", \"" + result[i].author + "\", ");
            }
            names = names.slice(0, -2)
            names = names.concat("]");
            connection.release();
            response.writeHead(200, {'Content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
            response.end(names);
        });
        // When done with the connection, release it.
        // Handle error after the release.
        if (err) throw error;
    });
}
).listen(process.env.PORT || 3000);
console.log('listening ...');
