exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const msg = await message.channel.send('Ping?');
	msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms :fire:`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'ping',
	category: 'Misc',
	description: 'It... like... pings. Then Pongs. And it"s not Ping Pong.',
	usage: 'ping',
};
