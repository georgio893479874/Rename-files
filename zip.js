import archiver from 'archiver';
import fs from 'fs';
import path from 'path';


export function zip() {
  const output = fs.createWriteStream('./example.zip');
  const archive = archiver('zip', {
    zlib: { level: 1 } // Sets the compression level.
  });

  archive.file('./1.txt', { name: './1.txt' });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  output.on('end', function() {
    console.log('Data has been drained');
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      throw err;
    } else {
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });

  let data = fs.readFileSync('./r.png')  
  archive.append(data, { name: 'r.png' });
  archive.pipe(output);
  archive.finalize();
}

zip()

