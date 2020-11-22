const ytdl = require('ytdl-core-discord');

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


	const url = message.content;
	// TODO add queue functionality (https://gabrieltanner.org/blog/dicord-music-bot)
	// client.songQueue.push(url);

	const videoInfo = await fetchInfo(url, 0);


	const guildId = message.guild.id;
	let first = false;
	let queue;
	if (client.musicQueues.has(guildId)) {
		queue = client.musicQueues.get(guildId);
	}
	else {
		queue = createQueue(textChannel, voiceChannel);
		client.musicQueues.set(guildId, queue);
		first = true;
	}

	const song = getSong(videoInfo);
	addToQueue(song, queue);

	if(first) {
		try {
			const connection = await voiceChannel.join();
			queue.connection = connection;
			play(queue, () => {
				voiceChannel.leave();
				client.musicQueues.delete(guildId);
			});
		}
		catch (err) {
			console.log(err);
			client.musicQueues.delete(message.guild.id);
			return;
		}
	}

};

async function playInternal(connection, url) {
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

	const dispatcher = await playInternal(voiceConnection, song.url);
	// TODO
	// dispatcher.setVolumeLogarithmic(guildQueue.volume / 5);
	dispatcher.on('finish', () => {
		removeFromQueue(guildQueue);
		play(guildQueue, onComplete);
	})
		.on('error', error => console.error(error));


	guildQueue.textChannel.send(`Started playing: **${song.title}**`);
}


function getSong(videoInfo) {
	return {
		title: videoInfo.videoDetails.title,
		url: videoInfo.videoDetails.video_url,
	};
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
	category: 'Music',
	description: 'Play music from Youtube on voice channel.',
	usage: 'play',
};
