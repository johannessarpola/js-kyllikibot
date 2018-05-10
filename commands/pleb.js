exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send("", {files: "https://imgur.com/TRQ3rtA"});
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
  