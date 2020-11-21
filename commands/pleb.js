exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const user = message.guild.members.find('displayName', args.join(' '));
	const msg = await message.channel.send(
		user != undefined ? `${user}` : 'Kasuarbird', {
			file: 'https://i.imgur.com/TRQ3rtA.jpg',
		},
	);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'User',
};

exports.help = {
	name: 'pleb',
	category: 'Joni',
	description: '...',
	usage: 'pleb',
};