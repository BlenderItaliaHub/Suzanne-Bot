const Discord = require("discord.js")
const client = new Discord.Client(
{ intents:["GUILDS", "GUILD_MEMBERS","GUILD_MESSAGES"]}
)
client.login("OTkzNTg3Mjc4MzIyNjE0Mjk0.G7wrDK.RBqjOHazw9ujUtdDTtxnWPAictMnqJcBvayGjw")

client.on("messageCreate", (message) => {
    if (message.content == "Ciao") {
        message.channel.send("Ciao anche a te!")
}})