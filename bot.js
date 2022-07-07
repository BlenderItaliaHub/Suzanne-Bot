const Discord = require("discord.js")
const client = new Discord.Client(
{ intents:["GUILDS", "GUILD_MEMBERS","GUILD_MESSAGES"]}
)
client.login("")

client.on("messageCreate", (message) => {
    if (message.content == "Ciao") {
        message.channel.send("Ciao anche a te!")
}})
