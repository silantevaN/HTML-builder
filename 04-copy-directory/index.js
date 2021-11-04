const fs = require('fs');
const path = require('path');


const pathCurrentFolder = path.join(__dirname, 'files');
const pathCopiedFolder = path.join(__dirname, 'files-copy');


function listObjects(pathFolder){

  fs.readdir(pathFolder, (err, files) => {

     if(err) throw err;
     for (let file of files) {

      fs.unlink(pathCopiedFolder + '/' + file, function(err) {
        if (err) throw err;
        listObjects(pathCopiedFolder);
        fs.readdir((pathCurrentFolder), (err, files) => {
          if (err) throw err;
          files.forEach(file => {
            fs.copyFile(pathCurrentFolder + '/' + file, pathCopiedFolder + '/' + file, function(err) {
              if (err) throw err;
            });
          });
        });
      });
    };
  });
}

fs.access(pathCopiedFolder, (err) => {
 if (err) {
  fs.mkdir(pathCopiedFolder, err => {
    if (err) throw err;
    console.log('Folder copied');
    fs.readdir((pathCurrentFolder), (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        fs.copyFile(pathCurrentFolder + '/' + file, pathCopiedFolder + '/' + file, function(err) {
          if (err) throw err;
        });
      });
    });
 });
 } 
 listObjects(pathCopiedFolder);
});



