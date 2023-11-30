import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import express from 'express';
import archiver from 'archiver';
import { zip } from './zipper.js';
import multer from 'multer';

const app = express()

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
            let extesion = path.extname(filesList[i])
            let newName = i+1 + extesion
            fs.rename('./'+ filesList[i], newName, (err) =>{
            })
        }
    })
}

app.post('/zip', (req, res) => {
    zip()
})

app.get('/', (req, res) => {
    res.render('main.ejs', {mode: mode})
})

app.listen(3000, (err) => {
    console.log('error')
})


