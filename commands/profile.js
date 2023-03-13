const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Gestisci il tuo profilo del server'),

    async execute(interaction) {}
}