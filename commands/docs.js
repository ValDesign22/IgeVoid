const axios = require("axios");
const { MessageCollector } = require("discord.js");

module.exports.run = async (client, message) => {
    const filter = (m) => m.author.id === message.author.id;

    const docSearch = new MessageCollector(message.channel, filter, {
        max: 1,
        time: 1000 * 30
    });

    message.channel.send(message.lang.docs.doc1)

    docSearch.on("collect", (m) => {})

    docSearch.on("end", (collected) => {
        collected.forEach((value) => {
            if (!value.content) {
                message.error(message.lang.docs.doc2, message, client)
            }
            else if (value.content) {
                const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(value.content)}`
    
                axios
                .get(uri)
                .then((embed) => {
                    const { data } = embed;
                    
                    if (data && !data.error) {
                        message.channel.send({ embed: data })
                    }
                    else {
                        message.reply(message.lang.docs.doc3.replace(/{value}/g, value.content))
                    }
                })
            }
        })
    })
}

module.exports.help = {
    description: "Sert à faire une recherche sur la documentation discord.js.",
    name: "docs",
    aliases: ["djs", "djsdocs"],
    category: "utils"
}