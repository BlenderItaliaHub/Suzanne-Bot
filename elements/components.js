const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

const components = {
    
    fixMenu : new MessageActionRow()
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
	),

    btnFix : new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('fixMenu')
				.setLabel('\xa0\xa0\xa0\xa0\xa0\xa0Indietro')
				.setStyle('DANGER')
				.setEmoji('🔙'),
			)
};

module.exports.components = components;