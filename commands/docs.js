const axios = require("axios");
const { MessageCollector } = require("discord.js");

module.exports.run = async (client, message) => {
    const filter = (m) => m.author.id === message.author.id;

    const docSearch = new MessageCollector(message.channel, filter, {
        max: 1,
        time: 1000 * 30
    });

    message.channel.send("Merci de spécifier une recherche sur la doc discord.js ci dessous.")

    docSearch.on("collect", (m) => {})

    docSearch.on("end", (collected) => {
        collected.forEach((value) => {
            if (!value.content) {
                message.channel.send("Le cooldown est tombé à zéro, merci de réutiliser cette commande plus tard.")
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
                        message.reply(`Aucun résultats trouvé sur la documentation discord.js pour ${value.content}.`)
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