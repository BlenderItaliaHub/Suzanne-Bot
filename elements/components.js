const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const components = {
    
    fixMenu : new ActionRowBuilder()
	.addComponents(
		new StringSelectMenuBuilder()
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

	btnComandi : new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
						.setCustomId('comandiBot')
						.setLabel('\xa0\xa0\xa0\xa0\xa0\xa0Comandi')
						.setStyle(ButtonStyle.Secondary)
						.setEmoji('🛠')
					),
	
	btnHelp : new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
						.setCustomId('btnHelp')
						.setLabel('\xa0\xa0\xa0\xa0\xa0\xa0Indietro')
						.setStyle(ButtonStyle.Danger)
						.setEmoji('🔙')
					),

    btnFix : new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
					.setCustomId('fixMenu')
					.setLabel('\xa0\xa0\xa0\xa0\xa0\xa0Indietro')
					.setStyle(ButtonStyle.Danger)
					.setEmoji('🔙')
				),

	ok : new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('ok')
				.setLabel('Ho capito')
				.setStyle(ButtonStyle.Success)
			)
};

module.exports.components = components;