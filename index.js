//https://discordjs.guide/creating-your-bot/#creating-the-main-file
require("dotenv").config();
const fs = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Collection, Interaction, Message } = require('discord.js');
const { channel } = require("diagnostics_channel");
const { MessageEmbed } = require('discord.js');


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

const fixEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('title')
	.setDescription('description')
	.addFields(
		{ name: 'title', value: 'value', inline: false },
	);

	//channel.send(fixEmbed);

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
	if (interaction.commandName === 'screenshot') {

		//ATTIVAZIONE COMANDO SCREENSHOT E SUBCOMMAND RELATIVI
		switch (interaction.commandName === 'screenshot') {
			
			case (interaction.options.getSubcommand() === 'viewport') :
				await interaction.reply('https://drive.google.com/uc?id=1PJwQIjvRLK6q1f-4i57W3-6whCuM0YNe');
				break;

			case (interaction.options.getSubcommand() === 'modeling') :
				await interaction.reply('https://drive.google.com/uc?id=1SYPgG-IcNB9Ih0EKa3z4wq_89JxZoHxC');
				break;

			case (interaction.options.getSubcommand() === 'sculpting') :
				await interaction.reply('https://drive.google.com/uc?id=10IdLfPMSo6TjtIQPu-pra4vB5dNRP6sS');
				break;

			case (interaction.options.getSubcommand() === 'uv_editing') :
				await interaction.reply('https://drive.google.com/uc?id=1QP5Bv5zSIEEAMq1Sn22vhHmwnUi-M4wE');
				break;

			case (interaction.options.getSubcommand() === 'texture_paint') :
				await interaction.reply('https://drive.google.com/uc?id=1PTCfnTuIoif4iljqSWYoIhJTiurV8Fvk');
				break;

			case (interaction.options.getSubcommand() === 'shading') :
				await interaction.reply('https://drive.google.com/uc?id=1fhVDllM233ruFhNg-ftY-YqnTZKpg2AO');
				break;

			case (interaction.options.getSubcommand() === 'animation') :
				await interaction.reply('https://drive.google.com/uc?id=1k_ynEsHHLCr5Bt8yXtWPipam-gHhDnbk');
				break;

			case (interaction.options.getSubcommand() === 'rendering') :
				await interaction.reply('https://drive.google.com/uc?id=1-tCO4iu_qMnl08U_Tspaib80deCE3dK4');
				break;

			case (interaction.options.getSubcommand() === 'compositing') :
				await interaction.reply('https://drive.google.com/uc?id=149CuOmeVwV-VMMVUuDQ5-EzcbyHoKH-U');
				break;

			case (interaction.options.getSubcommand() === 'geometry_nodes') :
				await interaction.reply('https://drive.google.com/uc?id=1zY4pgFsXcrB-JwnFkHj9nT3PuMuoqATV');
				break;

			case (interaction.options.getSubcommand() === 'scripting') :
				await interaction.reply('https://drive.google.com/uc?id=17ujUC5-vgnvysZ4vnS0uhNb0yfxx9ozN');
				break;
		};
	} else if (interaction.commandName === 'fix') {

		//COMANDO FIX COMUNI
		switch (interaction.commandName === 'fix') {
			
			case (interaction.options.getSubcommand() === 'autosmooth') :
				await interaction.reply({ embeds: [ fixEmbed ]});
				break;

		};
	} else {return false};

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




client.login(process.env.TOKEN);