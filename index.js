//https://discordjs.guide/creating-your-bot/#creating-the-main-file
require("dotenv").config();
const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, Interaction, Message, GatewayIntentBits } = require('discord.js');
const { channel } = require("diagnostics_channel");
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embeds } = require('./elements/embeds.js');
const { components } = require('./elements/components.js');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const client = new Client({ intents: [ 
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildBans,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildPresences,
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
			await interaction.reply({ embeds: [ embeds.helpEmbed ], components: [ ] });
			break;

		case ('ask') : 
			var response;
			async function asyncCall() {
			 try {
				response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: interaction.options._hoistedOptions[0].value,
				max_tokens: 1024,
				temperature: 0.3,
				});
		
			
				interaction.editReply({ embeds: [embeds.chatGPT.setDescription("❓ " + interaction.options._hoistedOptions[0].value.replace(/```/g, "") + "\n\n" + "```" + response.data.choices[0].text.replace(/```/g, "\n") + "```")] });
			} catch (error) {
				console.error(error);
				var textError = (error.response != undefined ? error.response.data.error.message : error.message);
				interaction.editReply({ embeds: [embeds.chatGPT.setDescription("⚠ Errore!```\nchatGPT ha generato un errore e al momento non è disponibile, ti preghiamo di riprovare più tardi.```\n```ansi\n[2;36m# Errore:[0m\n[2;33m[2;31m[2;33m[2;35m[2;33m" + textError + "[0m[2;35m[0m[2;33m[0m[2;31m[0m[2;33m[0m\n```")] });
			}
			}
			await interaction.deferReply({ content: "La risposta è in caricamento" });
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
	if (!interaction.isSelectMenu()) return;

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
	console.log(guild);

	if (guild.id === "816442399039422476") {
		var user = newPresence.member;
		var activity = newPresence.activities[0];
		console.log(newPresence);

		if (activity === "Blender") {
			user.roles.add('1063931326278946846');
		} else {
			if (user.roles.cache.some(role => role.name === 'Blender')) {
				user.roles.remove('1063931326278946846');
			};
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

client.on("messageCreate", async (message) => {

	if ((message.author.bot) || (message.channel.parentId != '816443423212830781')) return;
	if (user.includes(message.author.id)) return;
	user.push(message.author.id);
	const hasRole = message.member.roles.cache.some(role => role.name === '🤝 Helper Livello 01');
	//console.log(message.channel.parentId)
	if (!hasRole) {
		await message.member.roles.add('880437139874148363');
		await message.reply({ content: 'Ciao ' + message.author.username + '!', embeds: [ embeds.userFix ] });
	};
});

client.login(process.env.TOKEN);