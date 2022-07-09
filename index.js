//https://discordjs.guide/creating-your-bot/#creating-the-main-file
require("dotenv").config();
const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection } = require('discord.js');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

//Array
const commands = [];

//Commands
client.commands = new Collection();

//File
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.once("ready", () =>{
	console.log("Suzanne Ready!");

	const CLIENT_ID = client.user.id;
	const rest = new REST({
		version: "9"
	}).setToken(process.env.TOKEN);

	(async () => {
		try {
			if (process.env.ENV === "production") {
			await rest.put(Routes.applicationGuildCommands(CLIENT_ID), {
				body: commands
			});
			console.log("Successfully registred commands globally.");
			} else {
				await rest.put(Routes.applicationCommands(CLIENT_ID, process.env.GUILD_ID), {
					body: commands
				});
				console.log("Successfully registred commands locally.");
			}
		} catch (err) {
			if (err) console.log(err);
		}
	})();
})


client.login(process.env.TOKEN);