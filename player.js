playerJoin = async function(msg){
    if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
    } else {
        msg.reply('Connectez-vous à un chan pour connecter Ruby');
    }
}

playerLeave = function(msg){
    if (msg.guild.voice.channel){
        msg.guild.voice.channel.leave();
    }
}

playerPlay = function(msg, link){
    //pathSong = 

}

exports.playerCommand = function(msg, client){
    message = msg.content.substring(5, msg.content.length);
    index = message.content.indexOf(' ');
    if (index != -1){
        command = message.substring(0, index + 1);
    }

    switch(command){
        case "join":
            playerJoin(msg);
            break;
        case "leave":
            playerLeave(msg);
            break;
        case "play":
            playerPlay(msg, message.substring(index + 1, message.length));
            break;
        case "add":
            //add song
            break;
        case "skip":
            // skip song
            break;
        case "list":
            // disp list
            break;
        case "pause":
            //pause song
            break;
        case "volume":
            // change volume
            break;
        case "clear":
            //clear queue
            break;
    }
}