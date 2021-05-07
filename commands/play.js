const ytdl = require('discord-ytdl-core');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars


	if (!client.songQueue) {
		client.songQueue = [];
	}

	const voiceChannel = message.member.voice.channel;
	const textChannel = message.channel;

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


	if (message.content != undefined && message.content.split(' ').length > 0) {
		const url = message.content.split(" ")[1];
		const videoInfo = await fetchInfo(url, 0);

		const guildId = message.guild.id;
		let queue;
		if (client.musicQueues.has(guildId)) {
			queue = client.musicQueues.get(guildId);
		}
		else {
			queue = createQueue(textChannel, voiceChannel);
			client.musicQueues.set(guildId, queue);
		}

		let connection;
		const song = getSong(videoInfo);
		addToQueue(song, queue);

		try {
			if (queue.connection == null) {
				connection = await voiceChannel.join();
				queue.connection = connection;
				play(queue, () => {
					client.musicQueues.delete(guildId);
					queue.connection.channel.leave(); //  queue.connection.leave is not a function 
					queue.connection = null;
				});
			}
		}
		catch (err) {
			console.log(err);
			connection.leave();
			client.musicQueues.delete(message.guild.id);
			return;
		}
	}
};

async function createStreamDispatcher(connection, url) {
	const stream = await createStream(url, 0);
	const dispatcher = connection.play(stream, {
		type: 'opus',
	});
	return dispatcher;
}

async function play(guildQueue, onComplete) {
	const song = guildQueue.songs[0];
	const voiceConnection = guildQueue.connection;
	if (!song) {
		onComplete();
		return;
	}

	const playDispatcher = await createStreamDispatcher(voiceConnection, song.url);
	
	playDispatcher
		.on('finish', () => {
			next(guildQueue, onComplete);
		})
		.on('error', error => console.error(error))
		.on('skip', () => {
			next(guildQueue, onComplete);
		});

	guildQueue.dispatcher = playDispatcher;
	guildQueue.textChannel.send(`Started playing: **${song.title}**`);
}


function getSong(videoInfo) {
	return {
		title: videoInfo.videoDetails.title,
		url: videoInfo.videoDetails.video_url,
	};
}

function next(queue, onComplete) {
	removeFromQueue(queue);
	play(queue, onComplete);
}

function addToQueue(song, queueConstruct) {
	queueConstruct.songs.push(song);
}

function removeFromQueue(queueConstruct) {
	queueConstruct.songs.shift();
}

function createQueue(textChannel, voiceChannel) {
	return {
		textChannel: textChannel,
		voiceChannel: voiceChannel,
		connection: null,
		songs: [],
		volume: 5,
		playing: true,
	};
}

async function fetchInfo(url, times) {
	try {
		const info = await ytdl.getInfo(url);
		return info;
	}
	catch (err) {
		console.error(err);
		if (times <= 5) {
			return fetchInfo(url, ++times);
		}
	}
}

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
	category: 'Jukebox',
	description: 'Play music from Youtube on voice channel.',
	usage: 'play',
};
