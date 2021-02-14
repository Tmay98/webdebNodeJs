let http = require('http');
let url = require("url")

http.createServer(function (request, response) {
    let q = url.parse(request.url, true);
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "us-cdbr-east-03.cleardb.com",
        user: "bdd9d9b8d4db5b",
        password: "2481dad7",
        database: "heroku_e26bbf5cbd23920"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        let sql = "INSERT INTO score(name, score) values ('" + q.query["name"] + "', " +  q.query["score"] + ")";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
        console.log("server received req");
        response.writeHead(200, {'Content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
        response.end("Hello " + q.query["name"] + q.query["score"]);
    }
).listen(process.env.PORT || 3030);
console.log('listening ...');
