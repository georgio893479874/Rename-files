import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

export async function zip() {
const output = fs.createWriteStream('./example.zip');
const archive = archiver('zip', {
  zlib: { level: 1 }
});

archive.directory('./uploads', 'uploads');
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
  return true;
});
output.on('end', function() {
  console.log('Data has been drained');
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    throw err;
  } 
  else {
    throw err;
  }
});
archive.on('error', function(err) {
  throw err;
});
archive.pipe(output);
archive.finalize();
}

zip()


