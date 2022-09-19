//https://discordjs.guide/creating-your-bot/#creating-the-main-file
require("dotenv").config();
const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, Interaction, Message } = require('discord.js');
const { channel } = require("diagnostics_channel");
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const { embeds } = require('./elements/embeds.js');
const { components } = require('./elements/components.js');


const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
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

/*const fixEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Problemi Comuni')
	.setDescription('Questo comando cercherà di risolvere i problemi che si possono incontrare facilmente su Blender e offrirà varie soluzioni.\n\n' +
		'*Seleziona qua sotto il problema che vorresti risolvere.*\n\n ')
	.setTimestamp()
	.setFooter({ text: 'Suzanne Bot '});

const fixMenu = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('fixes')
			.setPlaceholder('Seleziona il problema')
			.addOptions([
			{
				label: 'Mesh non corretta',
				description: 'La tua mesh presenta errori di shading',
				value: 'first_option',
			},
			{
				label: 'Glitch nella mesh',
				description: 'La tua mesh presenta dei glitch di modellazione',
				value: 'second_option',
			},
			{
				label: 'Render non corretto',
				description: 'Il render presenta degli strani artefatti',
				value: 'third_option',
			},
			{
				label: 'Bevel/extrude non corretti',
				description: 'Il bevel o altri strumenti non funzionano come dovrebbero',
				value: 'fourth_option',
			},
			])
	);
*/

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;


	//Trigger of the enciclopedia.js commands
	/* const { MessageEmbed } = require('discord.js');

	const cgiEmbed = new MessageEmbed()
	.setColor('#0099ff') //Indispensabile
	.setTitle('***Cosa significa CGI?***') //Indispensabile
	.setURL('https://it.wikipedia.org/wiki/Computer-generated_imagery') //Non Indispensabile
	.setDescription('Letteralmente Computer-Generated Imagery sono una serie di tecniche volte alla creazione di contenuti grafici, effetti speciali e modelli 3D in diversi campi, dal cinema ai videogiochi e molto altro.\n\ndetto a parole più semplici sono immagini generate al computer in generale.Possono essere di qualunque tipo, simulazioni di esplosioni in film, un personaggio, un ambiente di un videogioco o ambienti in realtà aumentata; in base, utto ciò che crei al computer.') //Indispensabile
	.setTimestamp() //Indispensabile
	.setFooter({ text: 'Blender Italia Hub', iconURL: 'https://i.ibb.co/ck66Dbs/blender-logo.png' }); //Indispensabile

	const modellazioneEmbed = new MessageEmbed()
	.setColor('#0099ff') //Indispensabile
	.setTitle('***Cosa significa Modellazione?***') //Indispensabile
	.setURL('https://blog.unioneprofessionisti.com/che-cosa-e-la-modellazione-3d-breve-guida-pratica/21807/') //Non Indispensabile
	.setDescription('La modellazione 3D è il processo di creazione di una rappresentazione 3D di qualsiasi superficie o oggetto manipolando i poligoni, i bordi e i vertici di una forma iniziale (Cubo, Cilindro o Sfera) con l\'obbiettivo di creare forme artificiali come oggetti presenti nel mondo reale dove non sono richiesti dettagli complessi, bensì caratteristiche specifiche legate a forme e proporzioni.\n\nLa modellazione 3D viene utilizzata in una vasta gamma di settori, tra cui ingegneria, architettura, intrattenimento, film, effetti speciali, sviluppo di giochi e pubblicità commerciale.\n\n*Questo è l\'esempio della modellazione di un oggetto:*') //Indispensabile
	.setImage('https://www.3ditaly.it/wp-content/uploads/2015/11/modellazione-geometrica-servizio-service-3d-printing-servizi-stampa-stampanti.jpg') //non indispensabile
	.setTimestamp() //Indispensabile
	.setFooter({ text: 'Blender Italia Hub', iconURL: 'https://i.ibb.co/ck66Dbs/blender-logo.png' }); //Indispensabile

	const verticeEmbed = new MessageEmbed()
	.setColor('#0099ff') //Indispensabile
	.setTitle('***Cos\'è un Vertice?***') //Indispensabile
	.setURL('https://www.google.com/search?q=vertice+significato&bih=648&biw=1440&hl=it&sxsrf=ALiCzsbDFA5Qsfp_zpNyzED5hqHl6PthQA%3A1657501962217&ei=CnnLYs7lDJeklwS8iarACQ&ved=0ahUKEwjOkrD90-_4AhUX0oUKHbyECpgQ4dUDCA4&uact=5&oq=vertice+significato&gs_lcp=Cgdnd3Mtd2l6EAMyCggAEIAEEEYQ-QEyBggAEB4QBzIGCAAQHhAHMggIABAeEA8QBzIGCAAQHhAHMgUIABCABDIFCAAQgAQyCAgAEB4QDxAHMggIABAeEA8QBzIICAAQHhAPEAc6BwgAEEcQsAM6BwgjELACECc6CggAEB4QDxAIEAc6CQgAEB4QBxCLAzoLCAAQHhAHEAoQiwM6CQgAEA0QRhD5AToKCAAQHhAPEAcQCkoECEEYAEoECEYYAFCcBVjzEmCqF2gBcAF4AIABrAGIAf8HkgEDMC43mAEAoAEByAEIuAECwAEB&sclient=gws-wiz') //Non Indispensabile
	.setDescription('Il Vertice è il punto d\'incontro dei lati di un poligono o il punto in cui concorrono spigoli e facce.\nDue vertici formano uno spigolo, tre vertici formano una faccia.\n\n*Ecco un vertice:*') //Indispensabil
	.setImage('https://i.ibb.co/Hgz4fsH/Schermata-2022-07-11-alle-03-25-26.png') //non indispensabile
	.setTimestamp() //Indispensabile
	.setFooter({ text: 'Blender Italia Hub', iconURL: 'https://i.ibb.co/ck66Dbs/blender-logo.png' }); //Indispensabile

	const spigoloEmbed = new MessageEmbed()
	.setColor('#0099ff') //Indispensabile
	.setTitle('***Cos\'è uno Spigolo?***') //Indispensabile
	.setURL('https://www.differenzatra.it/differenza-tra-angolo-e-spigolo/') //Non Indispensabile
	.setDescription('Lo spigolo rappresenta l’incontro tra due piani nello spazio. Ogni lato di ogni poligono termina con uno spigolo.\nNel mondo reale, ad esempio, dove due muri si incontrano e terminano, nasce uno spigolo.\n\n*Ecco uno spigolo:*') //Indispensabil
	.setImage('https://i.ibb.co/1Zn8Nq1/Schermata-2022-07-11-alle-03-47-13.png') //non indispensabile
	.setTimestamp() //Indispensabile
	.setFooter({ text: 'Blender Italia Hub', iconURL: 'https://i.ibb.co/ck66Dbs/blender-logo.png' }); //Indispensabile */
	
	
	switch (interaction.commandName) {
		case ('screen') :
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
			
	};
	

	switch (interaction.commandName) {
		case ('modificatori_generate') :
			
			switch (interaction.options.getSubcommand()) {					
					case ('definizione') :
						await interaction.reply({ embeds: [ embeds.definizione]});
						break;

					case ('array') :
						await interaction.reply({ embeds: [ embeds.array]});
						break;

					case ('bevel') :
						await interaction.reply({ embeds: [ embeds.bevel]});
						break;
						
					case ('boolean') :
						await interaction.reply({ embeds: [ embeds.boolean]});
						break;

					case ('build') :
						await interaction.reply({ embeds: [ embeds.build]});
						break;

					case ('decimate') :
						await interaction.reply({ embeds: [ embeds.decimate]});
						break;

					case ('edge_split') :
						await interaction.reply({ embeds: [ embeds.edge_split]});
						break;

					case ('geometry_nodes') :
						await interaction.reply({ embeds: [ embeds.geometry_nodes]});
						break;

					case ('mask') :
						await interaction.reply({ embeds: [ embeds.mask]});
						break;
						
					case ('mirror') :
						await interaction.reply({ embeds: [ embeds.mirror]});
						break;

					case ('subdivision_surface') :
						await interaction.reply({ embeds: [ embeds.subdivision_surface]});
						break;

						

	};	
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
				await interaction.update({ components: [ components.btnFix ], embeds: [] });
				break;
		}
	};
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	
	if (interaction.customId === 'fixMenu') {
		await interaction.update({ embeds: [ embeds.fixEmbed ], components: [ components.fixMenu ] });
	};
});




client.login(process.env.TOKEN);
