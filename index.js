import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import express from 'express';
import archiver from 'archiver';
import { zip } from './zip.js';
import multer from 'multer';
import { fileURLToPath, pathToFileURL } from 'url';
import { mode } from './main.ejs';

const app = express()

let numberCount = 0;
let myExtesion = ['.json', '.js', '.html', '.css'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, numberCount++ + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

function autoRename() {
    fs.readdir('./', (err, files) => {
        let filesList = [];
        for (let i = 0; i < files.length; i++) {
            if (fs.statSync(path.join('./', files[i])).isFile()) {
                filesList.push(files[i])
            }
        }
        console.log(filesList)
        for (let i = 0; i < filesList.length; i++) {
            let extesion = path.extname(filesList[i]);
            let newName = i+1 + extesion;
            fs.rename('./'+ filesList[i], newName, (err) => {
            })
        }
    })
}

app.post('/zip', (req, res) => {
    zip();
})

app.get('/', (req, res) => {
    res.render('main.ejs', {mode: mode});
})

function deleteStore(req, res, next) {
    console.log("success")
    numberCount = 0;
    fs.readdir('./uploads', (err, files) => {
        console.log(files)
        if (err) {
            console.error('Помилка при читанні директорія:', err);
            return;
        }
        for (const file of files) {
            fs.unlink('./uploads/'+ file, err => {
                if (err) {
                    console.error('Помилка при видаленні файла:', err);
                } 
                else {
                    console.log(`Файл ${file} був успішно видалений`);
                }
            });
        }
    }); next()
}

app.post('/getfiles', deleteStore, upload.array('fileList'), async (req, res) => {
    console.log(req.files)
    await zip()
    setTimeout(function () {
        let __dirname = path.dirname(fileURLToPath(import.meta.url))
        res.sendFile(path.join(__dirname, 'example.zip'))
    }, 10000);
})

app.listen(3000, (err) => {
    console.log('app running')
})



