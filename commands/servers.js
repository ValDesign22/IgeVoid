const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
    async run(client, message, args, prefix) {
        if (message.author.id === client.configs.ownerID) {
            this.client = client;
            
            let i0 = 0;
            let i1 = 10;
            let page = 1;
            
            let description = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${message.guild.lang === "fr" ? "Membres" : "Members"}`).slice(0, 10).join("\n");
            
            let leftPage = new MessageButton()
            .setStyle("blurple")
            .setEmoji("◀️")
            .setID("servsLeftPage")
            .setDisabled()
            
            let deleteMsg = new MessageButton()
            .setStyle("red")
            .setEmoji("🗑️")
            .setID("servsDeleteMsg")
            
            let rightPage = new MessageButton()
            .setStyle("blurple")
            .setEmoji("▶️")
            .setID("servsRightPage")
            if (page === Math.round(this.client.guilds.cache.size/10)) rightPage.setDisabled();

            let buttons = new MessageActionRow()
            .addComponent(leftPage)
            .addComponent(deleteMsg)
            .addComponent(rightPage)

            const embed = new MessageEmbed()
            .setColor(client.colors.blue)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setAuthor(`Liste des serveurs de ${this.client.user.username}`)
            .setFooter(`Page ${page}/${Math.ceil(this.client.guilds.cache.size/10)} | ${this.client.guilds.cache.size} serveurs.`)
            .setDescription(description);
            
            const msg = await message.channel.send({ embed: embed, components: buttons });
            
            const collector = msg.createButtonCollector((button) => button.clicker.user.id === message.author.id);
            
            collector.on("collect", async (button) => {
                if (button.id === "servsLeftPage") {
                    i0 = i0 - 10;
                    i1 = i1 - 10;
                    page = page - 1;
                    
                    if (page < 1) return msg.delete();

                    if (page === 1) leftPage.setDisabled();
                    else leftPage.setDisabled(false);

                    rightPage.setDisabled(false);

                    buttons = new MessageActionRow()
                    .addComponent(leftPage)
                    .addComponent(deleteMsg)
                    .addComponent(rightPage)
    
                    description = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${message.guild.lang === "fr" ? "Membres" : "Members"}`).slice(i0, i1).join("\n");
                    
                    embed.setFooter(`Page: ${page}/${Math.round(this.client.guilds.cache.size/10)} | ${this.client.guilds.cache.size} serve${message.guild.lang === "fr" ? "u" : ""}rs.`)
                    .setDescription(description);

                    msg.edit({ embed: embed, components: buttons });

                    await button.reply.defer();
                }
                
                if (button.id === "servsRightPage") {
                    i0 = i0 + 10;
                    i1 = i1 + 10;
                    page = page + 1;

                    if (page > Math.round(this.client.guilds.cache.size/10)) return msg.delete();

                    if (page === Math.round(this.client.guilds.cache.size/10)) rightPage.setDisabled();
                    else rightPage.setDisabled(false);

                    leftPage.setDisabled(false);

                    buttons = new MessageActionRow()
                    .addComponent(leftPage)
                    .addComponent(deleteMsg)
                    .addComponent(rightPage)

                    description = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${message.guild.lang === "fr" ? "Membres" : "Members"}`).slice(i0, i1).join("\n");

                    embed.setFooter(`Page: ${page}/${Math.round(this.client.guilds.cache.size/10)} | ${this.client.guilds.cache.size} serve${message.guild.lang === "fr" ? "u" : ""}rs.`)
                    .setDescription(description);

                    msg.edit({ embed: embed, components: buttons });

                    await button.reply.defer();
                }
                
                if (button.id === "servsDeleteMsg") msg.delete();
            })
        }
        else return message.error(message.lang.ownerOnly, message, client);
    }
}

module.exports.help = {
    name: "servers",
    aliases: ["servs", "botservers", "botservs"],
    category: "owner",
    description: "Permet de voir les serveurs du bot.",
}