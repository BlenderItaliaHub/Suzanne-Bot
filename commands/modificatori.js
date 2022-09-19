const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modificatori_generate')
		.setDescription('Lista e spiegazioni dei Modificatori della Sezione generated')

        
    
        .addSubcommand(subcommand =>
            subcommand
            .setName('definizione')
            .setDescription('Spiega che cos\'è un Modificatore.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('array')
            .setDescription('Spiega la funzione del array modifier.'))

        
        .addSubcommand(subcommand =>
            subcommand
            .setName('bevel')
            .setDescription('Spiega la funzione del bevel modifier.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('boolean')
            .setDescription('Spiega la funzione del boolean modifier.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('build')
            .setDescription('Spiega la funzione del build modifier.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('decimate')
            .setDescription('Spiega la funzione del decimate modifier.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('edge_split')
            .setDescription('Spiega la funzione dell\'edge split modifier.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('geometry_nodes')
            .setDescription('Spiega la funzione del geometry nodes modifier.'))
        
        .addSubcommand(subcommand =>
            subcommand
            .setName('mask')
            .setDescription('Spiega la funzione del mask modifier.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('mirror')
            .setDescription('Spiega la funzione del mirror modifier.'))

        .addSubcommand(subcommand =>
            subcommand
            .setName('subdivision_surface')
            .setDescription('Spiega la funzione del subdivision surface modifier.')),

    async execute(interaction) {}
}