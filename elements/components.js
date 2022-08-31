const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

const components = {
    
    fixMenu : new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('fixes')
			.setPlaceholder('Seleziona il problema')
			.addOptions([
			{
				label: 'Mesh con errori di shading',
				description: 'La tua mesh presenta errori di shading o non viene visualizzata correttamente',
				value: 'first_option',
			},
			{
				label: 'Glitch nella mesh',
				description: 'La tua mesh presenta dei glitch di modellazione',
				value: 'second_option',
			},
			{
				label: 'Render bassa qualità o con strani artefatti',
				description: 'Il render presenta degli strani artefatti o la qualità non è soddisfacente',
				value: 'third_option',
			},
			{
				label: 'Bevel/extrude non funzionano come dovrebbero',
				description: 'Il bevel o altri strumenti non mantengono le giuste proporzioni o presentano altri errori simili',
				value: 'fourth_option',
			},
			{
				label: 'Zoom limitato o movimento della visuale strano',
				description: 'Lo zoom non va oltre una certa distanza e la visuale mi sembra strana',
				value: 'fifth_option',
			},
			{
				label: 'Come installare le addon',
				description: 'Mini guida per installare le addon',
				value: 'sixth_option',
			},
			])
	),

    btnFix : new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setCustomId('fixMenu')
					.setLabel('\xa0\xa0\xa0\xa0\xa0\xa0Indietro')
					.setStyle('DANGER')
					.setEmoji('🔙')
				),

	ok : new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('ok')
				.setLabel('Ho capito')
				.setStyle('SUCCESS')
			)
};

module.exports.components = components;