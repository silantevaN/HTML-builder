const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, './styles');
const pathBundleFile = path.join(__dirname, './project-dist/bundle.css');

fs.readdir((pathFolder), (err, files) => {
  if (err) throw err;
  for (let file of files) {
    const input = fs.createReadStream(path.join(pathFolder, file), 'utf-8');
    let css = path.extname(file);
    var pathFile = pathFolder + "/" + file;
    fs.stat(pathFile, (error, stats) => {
      if (error) {
        console.log(error);
      }
      else if (stats.isFile() && css === '.css') {
        input.on('data', chunk => {
          fs.appendFile(pathBundleFile, chunk, (err) => {
            if (err) {
              console.log(err);
            }});
        });
        input.on('error', error => console.log(error.message));
     }
    });
  }
});