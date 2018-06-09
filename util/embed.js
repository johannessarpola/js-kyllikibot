const RichEmbed = require("discord.js").RichEmbed;
const defaultColor = "#f442e5"

module.exports.generateTextEmbed = (obj, 
    title, 
    description = "", 
    footer = "",
    footerIcon = "",
    url = "", 
    color = defaultColor, 
    author = "",
    authorIcon = "") => {

    const embed = new RichEmbed();
    if(title.length > 0) {
        embed.setTitle(title)
    }
    if(url.length > 0) {
        embed.setURL(url);
    }
    if(author.length > 0) {
        embed.setAuthor(author, authorIcon ? authorIcon : null);
    }
    if(description.length > 0) {
        embed.setDescription(description);
    }
    if(footer.length > 0) {
        embed.setFooter(footer, footerIcon ? footerIcon : null)
    }
    embed.setColor(color);
    Object.keys(obj).forEach( key => {
        if (obj.hasOwnProperty(key)) {
         embed.addField(key, obj[key]);
        }
    });
    return embed;
}