exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const guildId = message.guild.id;
	if (client.musicQueues != undefined) {
		const queue = client.musicQueues.get(guildId);
		if (queue != undefined && queue.dispatcher != undefined) {
			queue.dispatcher.end();
			return message.channel.send('Song skipped');

		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'next',
	category: 'Jukebox',
	description: 'Skips a song',
	usage: 'next',
};
