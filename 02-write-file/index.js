
const { stdout, stdin } = process;
const path = require('path');
const fs = require('fs');
const fileName = 'text.txt';
const filePath = path.join(__dirname, fileName);
const writeStream = fs.createWriteStream(filePath, 'utf-8');

const sayGoodBuy = () => {
  stdout.write('-----> See you later! Goodbye! <------  ');
  process.exit();
};
stdout.write('----->  Hello. Please enter your text. ------>\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    sayGoodBuy();
  }
  writeStream.write(data);
  stdout.write(`---> Yor text '${data.toString().trim()}' has been added to the file "${fileName}" <---- You can type "exit" to save it\n`);
});

process.on('SIGINT', sayGoodBuy);