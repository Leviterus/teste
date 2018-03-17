var express = require('express');
var app = express();
var fs = require("fs");

var user = {
   "acesso4": {
        "listWeb": [{
            "name" : "porra", "ip" : "1232323321"
        }]
     }
};

var users =[];

app.post('/addUser', function (req, res) {
   // First read existing users.
   console.log(req.req);
//   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//       data = JSON.parse(data);
//       users.push(data);
//     //   data.push = user;
//         //   data["acesso3"] = user["acesso3"];
//         users = JSON.stringify(users, null, ' ');
//         // console.log(users);
//         fs.writeFile(__dirname + "/" + "users.json", users, function (err) {
//             // console.log(users);
//         });
//     res.end( JSON.stringify(data));
//   });
})
    


app.get('/listUsers', function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log(data);
      res.end(data);
  });
   
//   fs.readFile( __dirname + "/" + "teste.json", 'utf8', function (err, data) {
//       console.log(data);
//       res.end(data);
//   });
})



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
