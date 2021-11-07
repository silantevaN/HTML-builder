const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './secret-folder');

fs.readdir((filePath), (err, files) => {
  if (err) throw err;
  for (let file of files) {
      let fileName = file.split('.')[0];
      let fileExtname = path.extname(file).split('.')[1];
      let pathFile = filePath + "/" + file;
      fs.stat(pathFile, (error, stats) => {
        if (error) {
          console.log(error);
        }
        else if (stats.isFile()) {
          console.log(fileName + ' - ' +  fileExtname + ' - ' + stats.size + 'b');
        }
      });
  };
});
