require('dotenv').config();
var YMD = require("youtube-mp3-downloader");

var YD = new YoutubeMp3Downloader({
    "ffmpegPath": process.env.FFMPEG_PATH,        // Where is the FFmpeg binary located?
    "outputPath": "song",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});

YD.download("Vhd6Kc4TZls");

YD.on("finished", function(err, data) {
    console.log(JSON.stringify(data));
});

YD.on("error", function(error) {
    console.log(error);
});

YD.on("progress", function(progress) {
    console.log(JSON.stringify(progress));
});