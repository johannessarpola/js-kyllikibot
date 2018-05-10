exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send(
        "Kasuarbird", {
            file: "https://i.imgur.com/TRQ3rtA.jpg"
        }
    );
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "pleb",
    category: "Misc",
    description: "...",
    usage: "pleb"
};