const welcome = require("../models/welcome");

module.exports = async (client, member) => {
    let welcomeStat = await welcome.findOne({ id: member.guild.id, reason: "welcome" });

    if (!welcomeStat) {
        const newWlcDBSave = new welcome({
            id: member.guild.id,
            statut: false,
            content: member.guild.id,
            reason: 'welcome',
        }).save();
    }

    let welcomeStatGet = await welcome.findOne({ id: member.guild.id, reason: "welcome" });
    let statut = welcomeStatGet ? welcomeStatGet.statut : false;

    if (statut === true) {
        const channel = member.guild.channels.cache.get(client.db.get(`wC_${member.guild.id}`))

        const role = member.guild.roles.cache.get(client.db.get(`wR_${member.guild.id}`))

        if (!channel) return;
    
        let text = `${client.db.get(`wMsg_${member.guild.id}`)}`
        .replace(/{membre}/g, member)
        .replace(/{membreTag}/g, member.user.tag)
        .replace(/{membreName}/g, member.user.username)
        .replace(/{serveur}/g, member.guild.name)
        .replace(/{memberCount}/g, member.guild.members.cache.filter(x => !x.user.bot).size)
        .replace(/{totalMemberCount}/g, member.guild.members.cache.size)
    
        channel.send(text)

        if (!role) return;

        if (!member.user.bot) return member.roles.add(role, { reason: "Nouveau membre sur le serveur." });
    }
    else return;
}