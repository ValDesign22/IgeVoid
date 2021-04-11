const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (message.author.id === "650664078649458699") {
        this.client = message.client;
        
        let i0 = 0;
        let i1 = 10;
        let page = 1;
        
        let description =
            	this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
            .slice(0, 10)
            .join("\n");
        
        const embed = new Discord.MessageEmbed()
        .setThumbnail(this.client.user.displayAvatarURL())
            .setAuthor(`Liste des serveurs de ${this.client.user.username}`)
            .setColor("#2F3136")
        .setFooter(`Page ${page}/${Math.ceil(this.client.guilds.cache.size/10)} | ${this.client.guilds.cache.size} serveurs.`)

        .setDescription(description);
        
        const msg = await message.channel.send(embed);
        
        await msg.react("◀️");
        await msg.react("🗑️");
        await msg.react("▶️");
        
        const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
        
        collector.on("collect", async(reaction) => {
            if (reaction._emoji.name === "◀️") {

                // Updates variables
                i0 = i0 - 10;
                i1 = i1 - 10;
                page = page - 1;

                // if there is no guild to display, delete the message
                if (i0 < 0) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
                    .slice(i0, i1)
                    .join("\n");

                // Update the embed with new informations
                
                embed.setFooter(`Page: ${page}/${Math.round(this.client.guilds.cache.size/10)} | ${this.client.guilds.cache.size} serveurs.`)
                    .setDescription(description);

                // Edit the message 
                msg.edit(embed);

            }
            
            if (reaction._emoji.name === "▶️") {

                // Updates variables
                i0 = i0 + 10;
                i1 = i1 + 10;
                page = page + 1;

                // if there is no guild to display, delete the message
                if (i1 > this.client.guilds.cache.size + 10) {
                    return msg.delete();
                }
                if (!i0 || !i1) {
                    return msg.delete();
                }

                description = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} membres`)
                    .slice(i0, i1)
                    .join("\n");

                
                
                embed.setFooter(`Page: ${page}/${Math.round(this.client.guilds.cache.size/10)} | ${this.client.guilds.cache.size} serveurs.`)
                    .setDescription(description);

                // Edit the message 
                msg.edit(embed);

            }
            
            if (reaction._emoji.name === "🗑️") {
                return msg.delete();
            }
            
            await reaction.users.remove(message.author.id);
            
        })
    }
    else {
        message.reply("Tu n'es pas le propriétaire du bot.")
    }
}