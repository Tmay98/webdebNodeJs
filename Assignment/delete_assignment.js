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

            let sql = "DELETE from quote where id=" +  q.query["index"];
            connection.query(sql, (err, result) => {
                if (err) throw err;
                console.log('Table created');
                connection.release();
            });
            console.log("connected");
            // When done with the connection, release it.
            // Handle error after the release.
            if (err) throw error;
        });
        console.log("server received req");
        response.writeHead(200, {'Content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
        response.end("deleted!");
    }
).listen(process.env.PORT || 3040);
console.log('listening ...');
