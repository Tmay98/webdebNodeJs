let http = require('http');
let url = require("url")

http.createServer(function (request, response) {
        let q = url.parse(request.url, true);
        const mysql = require("mysql");
        const con = mysql.createPool({
            connectionLimit : 100,
            host: "us-cdbr-east-03.cleardb.com",
            user: "bdd9d9b8d4db5b",
            password: "2481dad7",
            database: "heroku_e26bbf5cbd23920"
        });

        con.getConnection(function(err, connection) {
            if (err) throw err;

            console.log("connected");
            let sql = "REPLACE INTO quote(id, quoteText, author) values" +
                " (" + q.query["index"] + ", '" + q.query["quoteText"] + "', '" +  q.query["author"] + "')";
            connection.query(sql, function (err, result) {
                connection.release();
                console.log(sql);
                console.log("1 record inserted");
            });
            // When done with the connection, release it.
            // Handle error after the release.
        });
        console.log("server received req");
        response.writeHead(200, {'Content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
        response.end(q.query["quoteText"] + ": " + q.query["author"] + "was stored in DB");
    }
).listen(process.env.PORT || 3030);
console.log('listening ...');
