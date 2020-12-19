const ytdl = require('discord-ytdl-core');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	if (validURL(message.content) && (message.content.contains('youtube'))) {
		return message.channel.send('Only Youtube urls supported at the moment');
	}

	const url = message.content;

	const info = await getInfo(url, 0);

	const videoInfo = {
		color: 0x0099ff,
		title: info.title,
		url: info.video_url,
		author: {
			name: info.author.name,
			icon_url: info.author.avatar,
			url: info.author.channel_url,
		},
		description: info.description,
		fields: [
			{
				name: 'Likes',
				value: info.likes,
				inline: true,
			},
			{
				name: 'Dislikes',
				value: info.dislikes,
				inline: true,
			},
			{
				name: 'Category',
				value: info.videoDetails.category,
				inline: true,
			},
			{
				name: 'Rating',
				value: info.videoDetails.averageRating,
				inline: true,
			},
		],
	};
	await message.channel.send({ embed: videoInfo });
};


async function getInfo(url, times) {
	try {
		const info = await ytdl.getInfo(url);
		return info;
	}
	catch (err) {
		console.error(err);
		if (times <= 5) {
			return getInfo(url, ++times);
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
	name: 'playinfo',
	category: 'Misc',
	description: 'Retrieves video information.',
	usage: 'playinfo',
};