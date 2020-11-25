
var amqp = require('amqplib/callback_api')
module.exports = (callback) => {
  amqp.connect('amqps://tbuyqjoy:NyvSxKcb3KBsSd4pNTHR1C0BCDWb8mIU@squid.rmq.cloudamqp.com/tbuyqjoy',
    (error, conection) => {
    if (error) {
      throw new Error(error);
    }
    callback(conection);
  })
}
