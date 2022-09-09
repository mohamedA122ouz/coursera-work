
    const express = require('express');
    const cors = require('cors');
    const ytdl = require('ytdl-core');
    const app = express();
    app.use(cors());
    app.listen(4000,()=>{
        console.log('server works !!!! at port 4000');
    });
    app.get('/download',(req,res)=>{
        var URL = req.query.URL;

        res.header('Content-DisPosition','attachment; filename="Video.mp4"');
        
        ytdl(URL,{
            format:'mp4',
            quality: 'highest',
            filter:'videoandaudio'
        }).pipe(res);
    });
