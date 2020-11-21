const ytdl = require('ytdl-core-discord');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	if (!client.songQueue) {
		client.songQueue = [];
	}

	const voiceChannel = message.member.voice.channel;

	if (!voiceChannel) {
		return message.channel.send('You need to be in a voice channel to play music!');
	}

	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	if (validURL(message.content) && (message.content.contains('youtube'))) {
		return message.channel.send('Only Youtube urls supported at the moment');
	}

	const url = message.content;
	// TODO add queue functionality (https://gabrieltanner.org/blog/dicord-music-bot)
	// client.songQueue.push(url);

	const stream = await createStream(url, 0);
	const disp = await voiceChannel.join()
		.then(connection => {
			const dispatcher = connection.play(stream, {
				volume: 0.75,
				type: 'opus',
			})
				.on('finish', () => { voiceChannel.leave(); })
				.on('error', (e) => console.error(e));
			return dispatcher;
		});

	// Failsafe for stuck Kyllikki
	setTimeout(() => { disp.destroy(); voiceChannel.leave(); }, 10 * 60 * 1000);
};


async function createStream(url, times) {
	try {
		const stream = await ytdl(url, {
			opusEncoded: true,
			encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200'],
		});
		return stream;
	}
	catch (err) {
		console.error(err);
		if (times <= 5) {
			return createStream(url, ++times);
		}
	}
}

function validURL(str) {
	const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	return !!pattern.test(str);
}


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'play',
	category: 'Music',
	description: 'Play music from Youtube on voice channel.',
	usage: 'play',
};

exports.init = (client) => {


};