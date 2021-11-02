const fs = require('fs');
const path = require('path');

const filePath = path.resolve('02-write-file', 'text.txt');
const streamWriteConsole = fs.createWriteStream(filePath);
const readline = require('readline');

const { stdin, stdout } = require('process');

stdout.write('Write something\n');

process.stdin.on('data', data => {
  const answer = data.toString().trim();
  if (answer === 'exit') {
    stdout.write('Good bye\n');
    process.exit();
  }
  else {
    streamWriteConsole.write(`${answer}\n`);
  }
});

process.on('SIGINT', () => {
  stdout.write('Good bye\n');
  process.exit();
});
