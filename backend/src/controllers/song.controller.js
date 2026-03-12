const songModel = require('../models/song.model');
const id3 = require('node-id3');
const storageService = require('../services/storage.service')

async function uploadSong (req, res){
const songbuffer = req.file.buffer;
const {mood} = req.body;

const tags = id3.read(songbuffer);

 const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songbuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ]);

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        postUrl: posterFile.url,
        mood,

    })
    
    res.status(201).json({
        message: "song created successfully",
        song
    })

}

module.exports = {
    uploadSong,
}