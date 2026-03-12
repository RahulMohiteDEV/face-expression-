const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url:{
    type:String,
    required:true,
    },
    postUrl:{
    type:String,
    required:true,
    },
    title:{
    type:String,
    required:true,
    },
    mood:{
        type:String,
        enum:{
            values:['Happy', 'Sad', 'Angry', 'Surprised'],
            message:'Mood must be one of Happy, Sad, Angry, or Surprised'
        }
    }
})

const song = mongoose.model('song', songSchema);

module.exports = song;