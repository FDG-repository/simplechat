INTRODUCTION

A simple Chat using:
- Server: nodejs + socket.io 
- Cliente: HTML + jQuery + Bootstrap 

This chat was based in the tutorial of the Tamas Piros:
http://www.tamas.io/simple-chat-application-using-node-js-and-socket-io/

DEMO
http://nodejs-cdcunha.rhcloud.com/

HOW EXECUTE
You need install a nodejs.
After install nodejs, open you command prompt and change to folder (Ex: cd \simplechat) and type: 'npm install'
You need alter the IP adress in the chat.html and server.js.
Then, type: 'node server.js'

NOTE
In the server.js, remove both: "process.env.OPENSHIFT_NODEJS_PORT || " and "process.env.OPENSHIFT_NODEJS_IP || "
In the chat.html, alter "'http://nodejs-cdcunha.rhcloud.com:8000/', {'forceNew':true }" to your IP and port (ex: '127.0.0.1:1337'
The Port in server.js and chat.html should be the same.
   

HOW TO USE A CHAT
After the browser be loaded, type your name and press ENTER or click in the Join button.
Then, type your message and press ENTER or click in the Send button.
To logoff, simply close the web browser.
