const fsUtil = require("../util/files");
const formatFolder = "configs";
const simpleEmbedGen = require("../util/embed").generateTextEmbed
const formatFormat = require("../util/formatter").formatFormat;
const genDateTimeExamples = require("../util/timeParse").generateExamples
const _ = require('lodash');
const splitChar = "\u200b";

function filter(objs, visibility = "user") {
    return objs.filter(obj => obj.visibility === "user")
}

function buildFormats(jsons) {
    const objs = Object.values(jsons)
    return _.flatten(filter(objs).map(fmts => {
        return filter(Object.values(fmts)).map(fmt => {
            const examples = fmt.generatedExamples ? createExamples(fmt) : fmt.examples
            return {
                title: fmt.title,
                description: fmt.description,
                examples: examples
            }
        })
    }));
}

function createExamples(fmt) {
    if(fmt.type = "date") {
        return genDateTimeExamples(fmt.formats).examples.join(", ")
    } else {
        console.log("Invalid example generation type")
        return "Could not generate examples"
    }
}

function createMessage(formats) {
    let msg  = "";
    let incr = 1;
    formats.forEach(f =>{
        const title = `${incr}. ${f.title}`
        msg += formatFormat(f, title);
        msg += "\n\n"
        incr += 1;
    });
    return simpleEmbedGen( { "\u200B" : msg }, 
        title = "Formats accepted by the bot" );
}

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send("Getting formats ...");
    const jsons = fsUtil.loadJsons(formatFolder);
    const formats = buildFormats(jsons);
    message.channel.send( createMessage(formats) )
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["format"],
    permLevel: "User"
};

exports.help = {
    name: "formats",
    category: "Help",
    description: "Shows different formats used in commands",
    usage: "formats"
};