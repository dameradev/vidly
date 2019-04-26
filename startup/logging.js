const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExeptions.log' }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })  
  );
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
 
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
}








// winston.add(MongoDB, { db: 'mongodb://localhost/vidly', collection: 'log' });



// const p = Promise.reject(new Error('Something failed miserably'));
// p.then(() => console.log('Done'));

// process.on('unhandeledExecption', (ex) => {
//   winston.error(ex.message, ex);
//   process.exit(1);
//})