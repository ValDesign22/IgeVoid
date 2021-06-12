module.exports = async (client, member) => {
    if (client.db.get(`gbA_${member.guild.id}`) === true) {
        const channel = member.guild.channels.cache.get(client.db.get(`gC_${member.guild.id}`))

        if (!channel) return;
    
        let text = `${client.db.get(`gMsg_${member.guild.id}`)}`
        .replace(/{membre}/g, member)
        .replace(/{membreTag}/g, member.user.tag)
        .replace(/{membreName}/g, member.user.username)
        .replace(/{serveur}/g, member.guild.name)
        .replace(/{memberCount}/g, member.guild.members.cache.filter(x => !x.user.bot).size)
        .replace(/{totalMemberCount}/g, member.guild.members.cache.size)
    
        channel.send(text)
    }
    else return;
}