const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Chiedi a ChatGPT quello che vuoi')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Inserisci la domanda')
                .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('Inserisci immagine')),

    async execute(interaction) {}
}