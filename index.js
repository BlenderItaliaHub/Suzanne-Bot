//https://discordjs.guide/creating-your-bot/#creating-the-main-file
require("dotenv").config();
const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, Interaction, Message, GatewayIntentBits, InteractionCollector, Embed } = require('discord.js');
const { channel } = require("diagnostics_channel");
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embeds } = require('./elements/embeds.js');
const { components } = require('./elements/components.js');
const { Configuration, OpenAIApi } = require("openai");
const { Player, QueryType } = require("discord-player");
const Canvas = require('@napi-rs/canvas');

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

// MUSIC PLAYER
client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25
	}
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.guild === null) console.log(interaction.user.username + " ha usato il comando: " + interaction.commandName + " nei DM")
	
	switch (interaction.commandName) {
		case ('profile'):
			await interaction.deferReply();

			const canvas = Canvas.createCanvas(700, 250);
			const context = canvas.getContext('2d');
			const background = await Canvas.loadImage('https://prd-rteditorial.s3.us-west-2.amazonaws.com/wp-content/uploads/2019/09/06162117/mandalorian-700x250.jpg');

			// This uses the canvas dimensions to stretch the image onto the entire canvas
			context.drawImage(background, 0, 0, canvas.width, canvas.height);

			// Use the helpful Attachment class structure to process the file for you
			const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

			await interaction.reply({ files: [attachment] });
			
			break;
		case ('play'):
			await interaction.deferReply();
			if (!interaction.member || !interaction.member.voice.channel) {
				return interaction.editReply("Devi essere in un canale vocale per usare questo comando");
			}

			var queue = await client.player.createQueue(interaction.guildId)
			if (!queue.connection) await queue.connect(interaction.member.voice.channel)

			let embed = new EmbedBuilder()

			if (interaction.options.getSubcommand() == "canzone") {
				let url = interaction.options.getString("canzone")
				const result = await client.player.search(url, {
					requestedBy: interaction.user,
					searchEngine: QueryType.AUTO
				})
				if (result.tracks.length === 0) {
					return interaction.editReply("Nessun risultato")
				}
				const song = result.tracks[0];
				await queue.addTrack(song);
				embed
					.setDescription("**[" + song.title + "](" + song.url + ")** è stata aggiunta alla coda")
					.setThumbnail(song.thumbnail)
					.setFooter({ text: "Durata: " + song.duration });

			} else if (interaction.options.getSubcommand() == "playlist") {
				let url = interaction.options.getString("link")
				const result = await client.player.search(url, {
					requestedBy: interaction.user,
					searchEngine: QueryType.YOUTUBE_PLAYLIST
				})
				if (result.tracks.length === 0) {
					return interaction.editReply("Nessun risultato")
				}
				const playlist = result.playlist;
				await queue.addTracks(result.tracks);
				embed
					.setDescription("**" + result.tracks.length + "** canzoni da **[" + playlist.title + "](" + playlist.url + ")** sono state aggiunte alla coda")
					.setThumbnail(result.tracks[0].thumbnail)
					.setFooter({ text: "Canzoni: " + playlist.tracks.length });
				
			}

			if (!queue.playing) await queue.play()
			
			await interaction.editReply({
				embeds: [embed]
			})

			break;

		case ("queue"): 
			await interaction.deferReply();
			
			var queue = await client.player.getQueue(interaction.guildId);
			if (queue == undefined) {
				return await interaction.editReply("Non ci sono canzoni in coda")
			}

			const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
			const page = (interaction.options._hoistedOptions[0] != undefined ? interaction.options._hoistedOptions[0].value : 1) - 1;
			

			if ((page + 1) > totalPages) {
				return await interaction.editReply("Pagina non valida. C'è solo un massimo di " + totalPages + " pagine")
			}

			const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
				return "**" + (page * 10 + i + 1) + ".** `" + song.duration + "` " + song.title + " -- <@" + song.requestedBy.id + ">"
			}).join ("\n")

			var currentSong = queue.current;
			await interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setDescription("**Attualmente in riproduzione**\n" + (currentSong ? "`" + currentSong.duration + "` " + currentSong.title + " -- <@" + currentSong.requestedBy.id + ">" : "Nessuna canzone in riproduzione") + 
						(queueString != "" ? "\n\n**Attualmente in coda**\n" + queueString : ""))
						.setFooter({
							text: (queueString.length > 0 ? "Pagina " + (page + 1) + " di " + totalPages : "Canzone in riproduzione")
						})
						.setThumbnail(currentSong.thumbnail)
				]
			})

			break;

		case ("quit") :
			await interaction.deferReply();

			var queue = await client.player.getQueue(interaction.guildId);

			if (queue == undefined) {
				return await interaction.editReply("Non ci sono canzoni in coda")
			}

			queue.destroy();
			await interaction.editReply("A presto!");

			break;

		case ("shuffle") :
			await interaction.deferReply();
	
			var queue = await client.player.getQueue(interaction.guildId);
	
			if (queue == undefined) {
				return await interaction.editReply("Non ci sono canzoni in coda")
			}
	
			queue.shuffle();
			await interaction.editReply("La coda di " + queue.tracks.length + " canzoni è stata cambiata");
	
			break;

		case ("info") :
			await interaction.deferReply();
		
			var queue = await client.player.getQueue(interaction.guildId);
		
			if (queue == undefined) {
				return await interaction.editReply("Non ci sono canzoni in coda")
			}
		
			let bar = queue.createProgressBar({
				queue: false,
				length: 19
			})

			var song = queue.current;

			await interaction.editReply({
				embeds: [new EmbedBuilder()
					.setThumbnail(song.thumbnail)
					.setDescription("Attualmente in riproduzione [" + song.title + "](" + song.url + ")\n\n" + bar)]
			});
		
			break;

		case ("pause") :
			await interaction.deferReply();
	
			var queue = await client.player.getQueue(interaction.guildId);
	
			if (queue == undefined) {
				return await interaction.editReply("Non ci sono canzoni in coda")
			}
	
			queue.setPaused(true);
			await interaction.editReply("La musica è stata messa in pausa. Usa il comando `/resume` per riprendere la musica");
	
			break;

		case ("resume") :
			await interaction.deferReply();
	
			var queue = await client.player.getQueue(interaction.guildId);
	
			if (queue == undefined) {
				return await interaction.editReply("Non ci sono canzoni in coda")
			}
	
			queue.setPaused(false);
			await interaction.editReply("La musica è stata ripresa. Usa il comando per `/pause` per metterla in pausa");
	
			break;

		case ("skip") :
			await interaction.deferReply();
	
			var queue = await client.player.getQueue(interaction.guildId);
	
			if (queue == undefined) {
				return await interaction.editReply("Non ci sono canzoni in coda")
			}

			var currentSong = queue.current;
	
			queue.skip();
			await interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setDescription(currentSong.title + " è stata saltata")
						.setThumbnail(currentSong.thumbnail)
				]
			});
	
			break;

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
					response = await openai.createChatCompletion({
					model: "gpt-3.5-turbo",
					messages: [
						{role: "system", content: "Ciao, ti chiami Suzanne e sei un assistente digitale molto gentile, ultra professionale e di ultima generazione specifico per il programma Blender e in generale per tutto l'ambito artistico 3D, hai ottime conoscenze teoriche e pratiche di Blender e altri programmi artistici, ti sarà fatta qualche domanda che potrebbe riguardare il programma o altro del mondo 3d e te dovrai rispondere nel modo più accurato e chiaro possibile, inoltre se necessario potrai anche inviare link per delle risorse, video o altri link utili, ma solo nel caso in cui vengano richieste o potrebbero servire. La struttura per l'invio dei link deve essere esattamente questa, anche con le parentesi, prima del link tra parentesi tonde ci deve essere il nome del sito tra parentesi quadre e non ci devono essere spazi tra il testo e il link, eccoti un esempio di come deve essere un link: [**nomesito**](linksito), te devi solo sostituire nomesito con il nome del sito e linksito con il link del sito."},
						{role: "user", content: interaction.options._hoistedOptions[0].value}
					],
					max_tokens: 1024,
					temperature: 0.7,
					});
					var linkRegEx = /https?:\/\/\S+[^\s)]/g;
					var linkArray = response.data.choices[0].message.content.match(linkRegEx);
					var linkString;
					if	(linkArray != null) linkString = linkArray.join("\n");
					interaction.editReply({ embeds: [embeds.chatGPT.setDescription("❓ " + interaction.options._hoistedOptions[0].value.replace(/```/g, "") + "\n\n" + (linkArray != null ? "" : "```") + response.data.choices[0].message.content.replace(/```/g, "\n")/*.replace(linkRegEx, "")*/ + (linkArray != null ? "" : "```")/* + (linkString != undefined ? linkString : "")*/)] });
				} catch (error) {
					console.error(error);
					var textError = (error.response != undefined ? error.response.data.error.message : error.message);
					interaction.editReply({ embeds: [embeds.chatGPT.setDescription("⚠ Errore!```\nchatGPT ha generato un errore e al momento non è disponibile, ti preghiamo di riprovare più tardi.```\n```ansi\n[2;36m# Errore:[0m\n[2;33m[2;31m[2;33m[2;35m[2;33m" + textError + "[0m[2;35m[0m[2;33m[0m[2;31m[0m[2;33m[0m\n```")] });
				}
			}

			/*async function asyncCall() {
				try {
					response = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: interaction.options._hoistedOptions[0].value,
					max_tokens: 1024,
					temperature: 0.7,
					});
			
				
					interaction.editReply({ embeds: [embeds.chatGPT.setDescription("❓ " + interaction.options._hoistedOptions[0].value.replace(/```/g, "") + "\n\n" + "```" + response.data.choices[0].text.replace(/```/g, "\n") + "```")] });
				} catch (error) {
					console.error(error);
					var textError = (error.response != undefined ? error.response.data.error.message : error.message);
					interaction.editReply({ embeds: [embeds.chatGPT.setDescription("⚠ Errore!```\nchatGPT ha generato un errore e al momento non è disponibile, ti preghiamo di riprovare più tardi.```\n```ansi\n[2;36m# Errore:[0m\n[2;33m[2;31m[2;33m[2;35m[2;33m" + textError + "[0m[2;35m[0m[2;33m[0m[2;31m[0m[2;33m[0m\n```")] });
				}
			}*/
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