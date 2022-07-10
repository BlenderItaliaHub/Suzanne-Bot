//https://discordjs.guide/creating-your-bot/#creating-the-main-file
require("dotenv").config();
const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, Interaction, Message } = require('discord.js');
const { channel } = require("diagnostics_channel");


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




client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;


	//Trigger of the enciclopedia.js commands
	if (interaction.commandName === 'enciclopedia') {
        if (interaction.options.getSubcommand() === 'cgi') {
            await interaction.reply('***Cosa significa CGI?***\nLetteralmente Computer-Generated Imagery sono una serie di tecniche volte alla creazione di contenuti grafici, effetti speciali e modelli 3D in diversi campi, dal cinema ai videogiochi e molto altro.\ndetto a parole più semplici sono immagini generate al computer in generale. Possono essere di qualunque tipo, simulazioni di esplosioni in film, un personaggio, un ambiente di un videogioco o ambienti in realtà aumentata; in base, utto ciò che crei al computer.');
	}}
	
	if (interaction.commandName === 'enciclopedia') {
		if (interaction.options.getSubcommand() === 'retopology') {
			await interaction.reply('***Cosa significa Retopology?***\nRetopology significa ricreare la topologia della mesh mantenendo la stessa forma.\nDato che i modelli 3d ad alta densità poligonale sono difficili da gestire durante le fasi di lavoro in genere si cerca di mantenere la struttura della mesh più leggera possibile, ottimizzando il numero di facce in modo da avere solo quelle che servono e non di più: un modello che in fase di scultura iniziale (usando software come zbrush) può contare centinaia di milioni di poligoni dovrebbe essere ridotto verosimilmente a qualche centinaio di migliaia o meno a seconda dello scopo del modello. il retopology può essere utilizzato anche per aggiustare degli artefatti e generalmente la topologia della mesh');
	}}

	if (interaction.commandName === 'enciclopedia') {
		if (interaction.options.getSubcommand() === 'viewport') {
			await interaction.reply({content: '***Cosa significa viewport?***\nIl 3D viewport viene utilizzato per interagire con la scena 3D per una varietà di scopi, come la modellazione, l\'animazione, la pittura di texture, ecc.\n\nQuesto è il 3D viewport di Blender:', files: ["https://www.katsbits.com/codex/wp-content/uploads/2019/06/initial-view.jpg"] });
			
	}}



	//Error handler
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try{
		await command.execute(interaction);
		//throw new Error("Command not implemented."); //test of the error handler
	} catch(err) {
		if (err) console.error(err);

		await interaction.reply({
			content: "An error occurred while executing the command.",
			ephemeral: true
		})
	}
})
client.login(process.env.TOKEN);
	if (!command) return;

	try{
		await command.execute(interaction);
	} catch(err) {
		if (err) console.error(err);

		await interaction.reply({
			content: "An error occurred while executing the command.",
			emphemeral: true
		})
;	}
});


client.login(process.env.TOKEN);
