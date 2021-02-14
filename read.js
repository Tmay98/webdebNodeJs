let http = require('http');
let url = require("url");

http.createServer(function (request, response) {
    let names = "";
    let q = url.parse(request.url, true);
    const mysql = require("mysql");
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "webdev"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("connected");
        let sql = "SELECT * FROM score";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            for (i = 0; i < result.length; i++ ) {
                names = names.concat(result[i].name + ": " + result[i].score + "<br>");
            }
            response.writeHead(200, {'Content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
            response.end(names);
        });
    });
    response.end();
}
).listen(process.env.PORT || 3000);
console.log('listening ...');
