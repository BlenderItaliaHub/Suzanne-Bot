const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modifier_gen')
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
                .setDescription('Spiega la funzione del subdivision surface modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('multiresolution')
                .setDescription('Spiega la funzione del multiresolution modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('remesh')
                .setDescription('Spiega la funzione del remesh modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('screw')
                .setDescription('Spiega la funzione dello screw modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('skin')
                .setDescription('Spiega la funzione dello skin modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('solidify')
                .setDescription('Spiega la funzione del solidify modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('triangulate')
                .setDescription('Spiega la funzione del triangulate modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('volume_to_mesh')
                .setDescription('Spiega la funzione del volume_to_mesh modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('weld')
                .setDescription('Spiega la funzione del weld modifier.'))

            .addSubcommand(subcommand =>
                subcommand
                .setName('wireframe')
                .setDescription('Spiega la funzione del wireframe modifier.')),

    async execute(interaction) {}
}
