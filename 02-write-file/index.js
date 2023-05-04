
const { stdout, stdin} = process;
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, 'utf-8');

stdout.write(' ----->  Hello. Please enter your text. After you can type "exit" to save it <------\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write(' -----> See you later! Goodbye! <------  ')
    process.exit();
  }
  writeStream.write(data);
});

process.on('SIGINT', process.exit);