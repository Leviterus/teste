var express = require('express');
var app = express();
var fs = require("fs");
var gcm = require('node-gcm');


var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));


var input = {};
var inputCompra = {};




// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender('AAAA-OTgkJk:APA91bGhucMn5BG-fi0euXqCxYadJmThKvrQJT5A4_Va0poc7s9cNs5M767wij_Ec9jyfJFLgk4G5C21Jk3iZZu2v8W0Sw11tomI72crmCRwzWT_PyQHTlerPcAMIVeLuJwVGEXOJtHR');

// Prepare a message to be sent
var message = new gcm.Message({
    data: { key1: 'msg1' }
});

// Specify which registration IDs to deliver the message to
var regTokens = ['YOUR_REG_TOKEN_HERE'];


// Post da maquina
app.post('/addMachine', (req, res) => {
   // First read existing users.
   // The difference between the machines.json and users.json is that
   // you have a second object array, the : DADOS-COMPRA
    console.log(req.body.WIFI);
    fs.readFile(__dirname + "/" + "machines.json", 'utf8', function(err, data){
        if(err) console.log(404);
        input = JSON.parse(data);
        input.fp.push(req.body.WIFI);
        inputCompra.fp.push(req.body.DADOS-COMPRA);
        input = JSON.stringify(input, null, ' ');
        fs.writeFile(__dirname + "/" + "machines.json", input, function (err) {
            if(err) console.log(404);
        });
        
        // Actually send the message to the phone
        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        	if (err) console.error(err);
        	else console.log(response);
        });
        
        res.json({
            errors: ['No error']
        });
    });
})


app.post('/addUser', (req, res) => {
   // First read existing users.
    console.log(req.body.WIFI);
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        if(err) console.log(404);
        input = JSON.parse(data);
        input.fp.push(req.body.WIFI);
        input = JSON.stringify(input, null, ' ');
        fs.writeFile(__dirname + "/" + "users.json", input, function (err) {
            if(err) console.log(404);
        });
        res.json({
            errors: ['Failed to create photo']
        });
    });
})
    


app.get('/listUsers', function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      res.end(data);
  });
})



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

function cmp(listWebMaq, listWebUsr){
	var qtdListMaq= listWebMaq.length;
	var qtdListUsr= listWebUsr.length;
	for(i=0;i<qtdListMaq;i++){
		for(j=0;j<qtdListUsr;j++){
			if(listWebMaq[i].name == listWebUsr[j].name && listWebMaq[i].ip== listWebUsr[j].ip){
				acertos++;
			}
		}
	}

	if(qtdListUsr> qtdListMaq){
		total = qtdListUsr;
	}
	else{
		total = qtdListMaq;
	}
	nota = (acertos/total) *100 ;
	if(nota<=45){
		retorno =1
	}
	else if(nota <=60){
		retorno = 2
	}
	else{
		retorno = 3
	}
	return nota;
}