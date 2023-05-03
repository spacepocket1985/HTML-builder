const path = require('path');
const fs = require('fs');
console.log(path.join(__dirname, '01-read-file', 'text.txt'))
const stream = fs.createReadStream(path.join(__dirname, '01-read-file', 'text.txt'), 'utf-8');
let data = '';

stream.on(path.join(__dirname, '01-read-file', 'text.txt'), chunk => data += chunk);
stream.on('end', () => console.log('End', data));
stream.on('error', error => console.log('Error', error.message));


