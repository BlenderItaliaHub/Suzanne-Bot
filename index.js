//https://discordjs.guide/creating-your-bot/#creating-the-main-file
require("dotenv").config();
const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, Interaction, Message, GatewayIntentBits, InteractionCollector, Embed } = require('discord.js');
const { channel } = require("diagnostics_channel");
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embeds } = require('./elements/embeds.js');
const { components } = require('./elements/components.js');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
})

const client = new Client({ intents: [ 
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildVoiceStates,
] 
});

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
});

const path = require('path');
const commandsPath = path.resolve(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

//Array
const commands = [];

//Commands
client.commands = new Collection();

//File
for (const file of commandFiles) {
	const command = require(path.join(commandsPath, file));
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
};

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.guild === null) console.log(interaction.user.username + " ha usato il comando '" + interaction.commandName + "' nei DM")
	
	switch (interaction.commandName) {

		case ('screenshot') :
		//ATTIVAZIONE COMANDO SCREENSHOT E SUBCOMMAND RELATIVI
			switch (interaction.options.getSubcommand()) {
				
				case ('viewport') :
					await interaction.reply('https://drive.google.com/uc?id=1PJwQIjvRLK6q1f-4i57W3-6whCuM0YNe');
					break;

				case ('modeling') :
					await interaction.reply('https://drive.google.com/uc?id=1SYPgG-IcNB9Ih0EKa3z4wq_89JxZoHxC');
					break;

				case ('sculpting') :
					await interaction.reply('https://drive.google.com/uc?id=10IdLfPMSo6TjtIQPu-pra4vB5dNRP6sS');
					break;

				case ('uv_editing') :
					await interaction.reply('https://drive.google.com/uc?id=1QP5Bv5zSIEEAMq1Sn22vhHmwnUi-M4wE');
					break;

				case ('texture_paint') :
					await interaction.reply('https://drive.google.com/uc?id=1PTCfnTuIoif4iljqSWYoIhJTiurV8Fvk');
					break;

				case ('shading') :
					await interaction.reply('https://drive.google.com/uc?id=1fhVDllM233ruFhNg-ftY-YqnTZKpg2AO');
					break;

				case ('animation') :
					await interaction.reply('https://drive.google.com/uc?id=1k_ynEsHHLCr5Bt8yXtWPipam-gHhDnbk');
					break;

				case ('rendering') :
					await interaction.reply('https://drive.google.com/uc?id=1-tCO4iu_qMnl08U_Tspaib80deCE3dK4');
					break;

				case ('compositing') :
					await interaction.reply('https://drive.google.com/uc?id=149CuOmeVwV-VMMVUuDQ5-EzcbyHoKH-U');
					break;

				case ('geometry_nodes') :
					await interaction.reply('https://drive.google.com/uc?id=1zY4pgFsXcrB-JwnFkHj9nT3PuMuoqATV');
					break;

				case ('scripting') :
					await interaction.reply('https://drive.google.com/uc?id=17ujUC5-vgnvysZ4vnS0uhNb0yfxx9ozN');
					break;
			};
			break;


		case ('fix') :
			await interaction.reply({ embeds: [ embeds.fixEmbed ], components: [ components.fixMenu ] });
			break;

		case ('help') :
			await interaction.reply({ embeds: [ embeds.helpEmbed ] });
			break;

		case ('ask') : 
			var response;
			async function asyncCall() {
				try {
					response = await openai.chat.completions.create({
					model: "gpt-3.5-turbo",
					messages: [
						{role: "system", content: "Ciao, ti chiami Suzanne e sei un assistente digitale molto gentile, solare, anche molto simpatica, ultra professionale e di ultima generazione specifico per il programma Blender e in generale per tutto l'ambito artistico 3D, hai ottime conoscenze teoriche e pratiche di Blender e altri programmi artistici, ti sarà fatta qualche domanda che potrebbe riguardare il programma o altro del mondo 3d e te dovrai rispondere nel modo più accurato e chiaro possibile, inoltre se necessario potrai anche inviare link per delle risorse, video o altri link utili, ma solo nel caso in cui vengano richieste o potrebbero servire. La struttura per l'invio dei link deve essere esattamente questa, anche con le parentesi, prima del link tra parentesi tonde ci deve essere il nome del sito tra parentesi quadre e non ci devono essere spazi tra il testo e il link, eccoti un esempio di come deve essere un link: [**nomesito**](linksito), te devi solo sostituire nomesito con il nome del sito e linksito con il link del sito. Quanto devi scrivere dei pezzi di codice invece scrivili usando il formato che usa Discord per formattare il codice py nei messaggi."},
						{role: "system", content: "I seguenti parametri ti servono solo per avere delle informazioni in più, usali solo se necessario. Nome utente: " + interaction.user.username + ";"},
						{role: "user", content: interaction.options._hoistedOptions[0].value}
					],
					max_tokens: 1024,
					temperature: 0.7,
					});
					var linkRegEx = /https?:\/\/\S+[^\s)]/g;
					var linkArray = response.choices[0].message.content.match(linkRegEx);
					var linkString;
					if	(linkArray != null) linkString = linkArray.join("\n");
					interaction.editReply({ embeds: [embeds.chatGPT.setDescription("❓ **" + interaction.options._hoistedOptions[0].value.replace(/```/g, "") + "**\n\n" + /*(linkArray != null ? "" : "```") + */response.choices[0].message.content/*.replace(/```/g, "\n").replace(linkRegEx, "") + (linkArray != null ? "" : "```") + (linkString != undefined ? linkString : "")*/)] });
				} catch (error) {
					console.error(error);
					var textError = (error.response != undefined ? error.response.data.error.message : error.message);
					interaction.editReply({ embeds: [embeds.chatGPT.setDescription("⚠ Errore!```\nchatGPT ha generato un errore e al momento non è disponibile, ti preghiamo di riprovare più tardi.```\n```ansi\n[2;36m# Errore:[0m\n[2;33m[2;31m[2;33m[2;35m[2;33m" + textError + "[0m[2;35m[0m[2;33m[0m[2;31m[0m[2;33m[0m\n```")] });
				}
			}

			await interaction.deferReply();
			asyncCall();
			break;
};

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
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	if (interaction.customId === 'fixes') {
		
		switch (interaction.values[0]) {
			case ('first_option') :
				await interaction.update({ components: [ components.btnFix ], embeds: [ embeds.fix1 ] });
				break;

			case ('second_option') :
				await interaction.update({ components: [ components.btnFix ], embeds: [ embeds.fix2 ] });
				break;
			
			case ('third_option') :
				await interaction.update({ components: [ components.btnFix ], embeds: [ embeds.fix3 ] });
				break;

			case ('fourth_option') :
				await interaction.update({ components: [ components.btnFix ], embeds: [ embeds.fix4 ] });
				break;

			case ('fifth_option') :
				await interaction.update({ components: [ components.btnFix ], embeds: [ embeds.fix5 ] });
				break;
			
			case ('sixth_option') :
				await interaction.update({ components: [ components.btnFix ], embeds: [ embeds.fix6 ] });
		}
	};
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
	var guild = newPresence.guild;
	var user = newPresence.member;

	if (guild.id === "816442399039422476") {

		var activity = newPresence.activities;
		var blender = false;

		if (activity.length > 0) {

			activity.forEach(function(status) {
				if (status.name === "Blender") {
					blender = true;
				};
			});

		} else {
			user.roles.remove('1063931326278946846');
		};

		if (blender) {
			user.roles.add('1063931326278946846');
		} else {
			user.roles.remove('1063931326278946846');
		};
	};
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	
	if (interaction.customId === 'fixMenu') {
		await interaction.update({ embeds: [ embeds.fixEmbed ], components: [ components.fixMenu ] });
	} else if (interaction.customId === 'ok') {
		await interaction.message.delete();
	}
});

var user = [];
var threadCreated = false;
var thread;
var loading = false;

client.on("messageCreate", async (message) => {
	if (message.author.bot || message.guildId != "816442399039422476") return;
	if (message.mentions.users.size > 0) {
		var bot = message.mentions.users.get("993587278322614294");
		if (bot == "993587278322614294") {
			if (!threadCreated) {
				thread = await openai.beta.threads.create();
				threadCreated = true;
			}
			if (!loading) {
				loading = true;
				var botReply = await message.reply("*Suzanne sta pensando...*");

				var msg = message.content.replace('<@993587278322614294>', "");
				const userMessage = await openai.beta.threads.messages.create(
					thread.id,
					{
					role: "user",
					content: msg
					}
				);
				const run = await openai.beta.threads.runs.create(
					thread.id,
					{ 
					assistant_id: "asst_sUW7UeSKwpe4pdEinW0VyC0Y",
					instructions: "Utente: " + message.author.username
					}
				);

				var isCompleted = false;
				var error = false;

				while (!isCompleted & !error) {
					var progress = await openai.beta.threads.runs.retrieve(
						thread.id,
						run.id
					);
					if (progress.status == "failed") {
						console.log(progress);
						error = true;
						loading = false;
					}
					if (progress.status == "completed") {
						loading = false;
						isCompleted = true;
					}
				};
				if (isCompleted && !error) {
					const chat = await openai.beta.threads.messages.list(
						thread.id
					);
					await botReply.edit(chat.data[0].content[0].text.value);
				} else {
					await botReply.edit("*Suzanne non ha risposto per un errore, riprova tra qualche minuto!*");
				}
			}
		}
	};
	if (message.channel.parentId != '816443423212830781') return;
	if (user.includes(message.author.id)) return;
	user.push(message.author.id);
	const hasRole = message.member.roles.cache.some(role => role.name === '🤝 Helper Novizio');
	if (!hasRole) {
		await message.member.roles.add('880437139874148363');
		await message.reply({ content: 'Ciao ' + message.author.username + '!', embeds: [ embeds.userFix ] });
	};
});

client.login(process.env.TOKEN);