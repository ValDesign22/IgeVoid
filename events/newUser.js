module.exports = async (client, user) => {
    if (client.dash.has(`${user.id}`)) return;
    console.log(`${user.username} just logged into the dashboard`);
    client.dash.set(`${user.id}`, true)
}