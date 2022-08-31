const webhook = require("webhook-discord");
const os = require("os")
const Json = require("./config.json");
const express = require('express')
const Hook = new webhook.Webhook(Json.token);
const app = express()
const port = 3000
 function exitserver() {

}
app.use(express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
if (process.argv[2] == 'start') {
  const msg = new webhook.MessageBuilder()
  .setName('Бот сервера')
  .setTitle('Сервер запущен!')
  .setColor('#0bdf4e')
  .addField("Операционка:", os.version() + ": " + os.arch(), false)
  .addField("Скоко памят:", (os.freemem()  / 1024 / 1024/ 1024).toFixed(2)  + "/" +  (os.totalmem() / 1024 / 1024/ 1024).toFixed(2) + " GB", false)
  .addField("Ебучий движок:", "Node " + process.version, false)
  .addField("Ссылка:", Json.url, false)
  Hook.send(msg)
}
if (process.argv[2] == 'local') {
  const msg = new webhook.MessageBuilder()
  .setName("Бот сервера")
  .setText("Сервер включен, но работает в локальном режиме");
  Hook.send(msg);
}
var stdin = process.stdin;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );
stdin.on( 'data', function( key ){
  if ( key === 'e' ) {
    const msg = new webhook.MessageBuilder()
    .setName("Бот сервера")
    .setText("Сервер отключен.");
    Hook.send(msg);

  }
  if (key === '\u0003')
  {
    process.exit();
  }
});