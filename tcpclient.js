let request = require('request')
//client request to TCp

var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

let obj = {

    "type": "action222",
    "TIMESTAMP": "03-OCT-2018 19:02:54",
    "MSISDN": "182205277",
    "SERVICE": "balance",
    "TERMINATION_CODE": "0",
    "NODE": "ge14101",
    "ACCESS_CODE": "*141#",
    "RESPONSE": "Balance Summary:\nAirtime:R3.24\nSMS:0\nData:10.00 MB",
    "STATE": "200"
   
   }
   
   
   request.post({url: 'https://apirest-restapi.firebaseapp.com/api/v1/ussddata', body: JSON.stringify(obj), headers: {'content-type' : 'application/json'}
                 }
                 , function(error, response, body){

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
   // client.write('I am Chuck Norris!');
     client.write(response.body);
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

})