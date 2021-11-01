const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(file, 'utf-8');

stream.on('readable', function() {
  let data;

  while (data = this.read()) {
    console.log(data);
  }
});