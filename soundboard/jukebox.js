const fs = require('fs');
const mp3duration = require("mp3-duration");
const dcBufferSeconds = 3;

delayedAction = (timeout, action) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    }, timeout);
  }).then(() => action());
};

playSound = (client, message, args) => {
  const voiceChannel = message.member.voice;
  if (voiceChannel != null) {
    fs.readdir("./sounds/", (err, files) => {
      files.forEach(file => {
        fileName = file.split('.')[0];
        fileType = file.split('.')[1];
        if (args[0] === fileName && voiceChannel.channel != null) {
          voiceChannel.channel.join().then((connection) => {
            const dispatcher = connection.play("./sounds/" + file);
            dispatcher.on('finish', (reason) => {
              delayedAction(2000, () => connection.disconnect());
            });
          }).catch(err => {
            delayedAction(2000, () => connection.disconnect());
            client.logger.error(err);
          });
        }
      });
    });
  } else {
    message.channel.send('Please join a voice channel to use the soundboard')
  }
};

listSounds = (client, message, args) => {
  let promises = [];
  fs.readdir("./sounds/", (err, files) => {
    files.forEach(file => {
      const promise = new Promise((resolve, reject) => {
        const fileName = file.split('.')[0];
        mp3duration("./sounds/" + file, (err, duration) => {
          err ? reject(err) : resolve(`**${fileName}** ${duration} s`);
        });
      });
      promises.push(promise);
    });
    Promise.all(promises).then((values) => {
      const msg = values.join(", ");
      message.channel.send(msg)
    });
  });
};

exports.handleMessage = (client, message, args) => {
  if (args.length === 0) {
    listSounds(client, message, args);
  } else {
    playSound(client, message, args);
  }
  // TODO STOP
  // TODO VOLUME
};