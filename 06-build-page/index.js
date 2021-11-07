const fs = require('fs');
const path = require('path');

const pathProjectDist = path.join(__dirname, 'project-dist')
const pathComponents = path.join(__dirname, 'components');
const pathTemplate = path.join(__dirname, 'template.html');
const streamIndexHtml = path.join(pathProjectDist, 'index.html');

const pathFolderStyle = path.join(__dirname, 'styles');
const pathStyleCss = path.join(pathProjectDist, 'style.css')

fs.access(pathProjectDist, (err) => {
  if (err) {
  fs.mkdir(pathProjectDist, err => {
  if (err) throw err;
  console.log('Folder created');
  });
  let readableStream = fs.createReadStream(pathTemplate, "utf8");
  let writeableStream = fs.createWriteStream(streamIndexHtml);
  readableStream.pipe(writeableStream); 
  
  fs.readdir((pathComponents), (err, components) => {
    if (err) throw err;
    fs.readFile(streamIndexHtml, "utf-8", (err, data) => {
      if (err) throw err; 
    components.forEach(component => {
      let name = path.parse(component).name; 
      let html = path.extname(component);
      let pathComponent = pathComponents + '/' + component;
      fs.stat(pathComponent, (err, stats) => {
        if (err) throw err; 
        else if (stats.isFile() && html === '.html') {
        fs.readFile(pathComponent, "utf-8", (err, tagName) => {
          if (err) throw err;
                data = data.replace(new RegExp(`{{${name}}}`), tagName);
                let fileHtml = fs.createWriteStream(streamIndexHtml, {flags: 'w'});
                fileHtml.write(data);  
          });
        }
        });  
      });
    });
  })
}
});


fs.readdir((pathComponents), (err, components) => {
  if (err) throw err;
  fs.readFile(streamIndexHtml, "utf-8", (err, data) => {
    if (err) throw err; 
  components.forEach(component => {
    let name = path.parse(component).name; 
    let html = path.extname(component);
    let pathComponent = pathComponents + '/' + component;
    fs.stat(pathComponent, (err, stats) => {
      if (err) throw err; 
      else if (stats.isFile() && html === '.html') {
      fs.readFile(pathComponent, "utf-8", (err, tagName) => {
        if (err) throw err;
              data = data.replace(new RegExp(`{{${name}}}`), tagName);
              let fileHtml = fs.createWriteStream(streamIndexHtml, {flags: 'w'});
              fileHtml.write(data);  
        });
      }
      });  
    });
  });
})

fs.readdir((pathFolderStyle), (err, files) => {
  if (err) throw err;
  for (let file of files) {
    const input = fs.createReadStream(path.join(pathFolderStyle, file), 'utf-8');
    let css = path.extname(file);
    let pathFile = pathFolderStyle + "/" + file;
    fs.stat(pathFile, (error, stats) => {
      if (error) {
        console.log(error);
      }
      else if (stats.isFile() && css === '.css') {
        input.on('data', chunk => {
          fs.appendFile(pathStyleCss, chunk, (err) => {
            if (err) {
              console.log(err);
            }});
        });
        input.on('error', error => console.log(error.message));
     }
    });
  }
});

const pathCurrentAssets = path.join(__dirname, 'assets');
const pathCopiedAssets = path.join(pathProjectDist, 'assets');

function copyFolder(pathCurrentAssets) {

  fs.readdir(pathCurrentAssets, (err) => {

     if(err) throw err;

        function filesInFolder(pathCurrentAssets, pathCopiedAssets) {

          fs.readdir((pathCurrentAssets), (err, files) => {

            if (err) throw err;
              files.forEach(file => {
              let pathFilesAssets = path.join(pathCurrentAssets, file);
              let pathCopiedFilesAssets = path.join(pathCopiedAssets, file);
              fs.rmdir(pathCopiedFilesAssets, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
              fs.stat(pathFilesAssets, (err, stats) => {
                if (err) throw err; 
                else if (stats.isDirectory()) {
                  fs.access(pathCopiedFilesAssets, (err) => {
                    if (err) {
                      fs.mkdir(pathCopiedFilesAssets, (err) => {
                        if (err) { 
                          console.log(err); 
                        } 
                        filesInFolder(pathFilesAssets, pathCopiedFilesAssets)
                      })
                    }
                  })
                }
                else if(stats.isFile()) {
                fs.copyFile(pathFilesAssets, pathCopiedFilesAssets, function(err) {
                  if (err) throw err;
                })
                }
                });
              })
    })  
    });
  }
})
}

fs.access(pathCopiedAssets, (err) => {
 if (err) {
  fs.mkdir(pathCopiedAssets,{ recursive: true }, err => {
    if (err) throw err;
    console.log('Folder assets copied');
    function filesInFolder(pathCurrentAssets, pathCopiedAssets) {
      fs.readdir((pathCurrentAssets), (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          let pathFilesAssets = path.join(pathCurrentAssets, file);
          let pathCopiedFilesAssets = path.join(pathCopiedAssets, file);
          fs.stat(pathFilesAssets, (err, stats) => {
            if (err) throw err; 
            else if (stats.isDirectory()) {
              fs.access(pathCopiedFilesAssets, (err) => {
                if (err) {
                  fs.mkdir(pathCopiedFilesAssets, (err) => {
                    if (err) { 
                      console.log(err); 
                    } 
                    filesInFolder(pathFilesAssets, pathCopiedFilesAssets)
                  })
                }
              })
            }
            else if(stats.isFile()) {
            fs.copyFile(pathFilesAssets, pathCopiedFilesAssets, function(err) {
              if (err) throw err;
            })
            }
            });
        })
        });  
    }
    filesInFolder(pathCurrentAssets, pathCopiedAssets)
 });
 }
 copyFolder(pathCopiedAssets);
});
