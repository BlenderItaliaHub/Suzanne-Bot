const { MessageEmbed, Message, ClientUser } = require('discord.js');

const embeds = {

    fixEmbed : 
        new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Problemi Comuni')
        .setDescription('Questo comando cercherà di risolvere i problemi che si possono incontrare facilmente su Blender e offrirà varie soluzioni.\n\n**Seleziona qua sotto il problema che vorresti risolvere.**\n\n'+ '*Se non avete trovato quello che stavate cercando o avete altre soluzioni da aggiungere contattate lo staff tramite ticket. Grazie.*\n\n')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),

    fix1 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Mesh con errori di shading')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'La mesh può presentare questi errori per diversi motivi: una topologia non propriamente corretta, normals invertite o smoothing non adeguato.\n\n' +
            "**Come risolvere l'errore**\n" + 
            'Metodo 1 - Autosmooth\n' +
            "Se la tua mesh utilizza lo shade smooth allora potresti provare ad andare nel pannello vertici (si trova sulla destra, l'icona rappresenta un triangolo verde), seleziona la voce normals e infine metti il check su autosmooth, se serve puoi modificare il valore, noterai che la mesh avrà alcuni bordi arrotondati e altri no.\n\n" +
            'Metodo 2 - Ricalcolo delle normal\n' +
            'Se la tua mesh è complessa può essere che in fase di modellazione ci sia stato qualche errore con le normals.\n' +
            'In edit mode, selezionate tutta la mesh premendo A, in alto troverete il pulsante mesh, si aprirà un menù a tendina, premete su normals e poi recalculate outside o inside, a seconda della vostra mesh. (shortcut: `shift + n` | `shift + ctrl + n`)'
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=1kwTGXPOj14pG-oT11j5yxMb8icbomBsJ')
        .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),
    
    fix2 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Glitch nella mesh')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'La mesh può presentare questi errori per diversi motivi: una topologia non propriamente corretta, modificatori usati nel modo sbagliato o possono anche essere dei semplici glitch grafici temporanei.\n\n' +
            "**Come risolvere l'errore**\n" + 
            'Metodo 1 - Merge by distance\n' +
            "Se hai usato l'estrusione o altri strumenti simili per modellare la tua mesh allora è possibile che ti sia scappato qualche doppio vertice da qualche parte, in edit mode, seleziona tutta la mesh premendo A, fatto ciò in alto troverai il pulsante mesh, ti aprirà un menù a tendina, seleziona merge e poi merge by distance, aumenta o diminuisci poi il valore come preferisci. (shortcut: `m`) \n\n" +
            'Metodo 2 - N-gons\n' +
            'Quando si lavora in 3D bisognerebbe lavorare sempre con i quads (facce da 4 vertici), gli N-gons sono facce composte da più di 4 facce e molto spesso sono la causa di una cattiva topologia, per risolvere questo problema bisogna cercare il più possibile di usare i quads o al massimo i tris.\n' +
            "In edit mode si possono tranquillamente usare alcuni strumenti per semplificarsi la vita, in alto trovate il pulsante faces e cliccatelo, si aprirà un menu a tendina, a seconda dell'esigenza potete trasformare le facce. (shortcut: `ctrl + t` | `alt + j`) "
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=1g0Cf8tLZ9qujxHsoZTN7vQL30nPCSwDP')
        .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),

    fix3 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Render bassa qualità o con glitch')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'Se il render presenta un effetto pixel molto evidente o alcune parti sono leggermente distorte vuol dire che non è stato usato o è stato usato nel modo sbagliato il denoise.\n\n' +
            "**Come risolvere l'errore**\n" + 
            'Metodo 1 - Denoise\n' +
            "Soprattutto se la scena è molto complessa normalmente servirebbero moltissimi samples per fare un render di alta qualità. Si può ottenere lo stesso effetto utilizzando il denoise.\n\n" +
            "Andate nelle proprietà dei layer e attivate Denoising Data, una volta fatto questo dovete recarvi nel compositor e attivare i nodi, inserite il nodo Denoise (`shift + a`) fate tutti i collegamenti tra la scena, il denoise e l'output.\n\n" +
            "ATTENZIONE - evitate di usare il denoise preimpostato per il rendering (quello che si trova nelle impostazioni di rendering), va benissimo per il viewport ma spesso crea strani effetti nel render."
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=11AhOGm6QqddN_lHpf9VnTp-biDtEx9Li')
        .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),

    fix4 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Alcuni strumenti e modificatori non funzionano a dovere')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'A volte capita di dover ingrandire o modificare una mesh in object mode, questa azione ha volte ha degli effetti imprevisti che non vogliamo.\n\n' +
            "**Come risolvere l'errore**\n" + 
            'Metodo 1 - Applicare le trasformazioni\n' +
            "Se state usando strumenti come il bevel e vi accorgete che l'effetto è stretchato o comunque non è come vi sareste aspettati vuol dire che bisogna applicare le trasformazioni alla mesh.\n" +
            "Per prima cosa assicuratevi di aver applicato tutti i modifier in quanto dopo la procedura potrebbero cambiare. Selezionate la mesh e premete `ctrl + a`, appariranno una serie di opzioni, se volete andare sul sicuro cliccate su All transform.\n" +
            "Vi accorgerete che l'origine della mesh si sarà spostata, per riportarla sulla mesh cliccate il tasto destro e selezionate set origin > origin to geometry."
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=1rV3YwnCuUa9_WCSR11rkuoUmAaMGxDAR')
        .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),

    fix5 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Lo zoom o la visuale non si muovono nel modo giusto')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'Su blender la visuale è sempre centrata rispetto ad un punto nella scena, se capita di dover fare delle modifiche in una zona della scena lontana da quel punto si potrebbe incorrere in alcune difficoltà ad utilizzare la visuale\n\n' +
            "**Come risolvere l'errore**\n" + 
            'Metodo 1 - Ricentrare la visuale\n' +
            "Se state avendo problemi con lo zoom o la visuale potete selezionare l'oggetto su cui volete avere la visuale e poi premete `.` sul tastierino numerico oppure cliccate il pulsante view e poi frame selected.\n"
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=1cXaWh79BVdNUfU0ofO3DvLiH7iHn1kKd')
        .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),

    fix6 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Come installare le addon')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'Le addon sono utili per molti motivi: semplificano il workflow e aggiungono molte funzioni.\n\n' +
            '**Come installare le addon**\n' +
            "Il primo passo consiste nel scaricare l'addon desiderata, ovviamente accertandosi che sia compatibile con la versione di Blender utilizzata.\n" +
            "Il file scaricato nella maggior parte dei casi sarà uno zip (nomefile.zip), a questo punto bisogna assicurarsi che all'interno del file zip non ci sia un altro file zip o una singola cartella, in questo caso dovrete estrarre il contenuto rifare lo zip.\n" +
            "Dopo aver fatto questi accertamenti si può procedere all'installazione, aprite Blender, in alto a sinistra trovate il pulsante edit, premetelo e poi cliccate su preferences, si aprirà una piccola finestra, andate nella sezione add-ons e poi premete il tasto install, cercate il file zip dell'addon e installatelo.\n" + 
            "Dopo qualche secondo la lista delle addon dovrebbe aggiornarsi con la nuova addon installata, non resta che attivarla cliccando sul quadrato di fianco al nome.\n\n" +
            "In alcuni casi è possibile che durante l'installazione venga fuori un messaggio di errore o comunque l'addon non risulti nella lista, in questo caso consigliamo di contattare l'autore dell'addon."
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=13A7sgnZpDW9dbJeSWWBBulskxTjYa0mg')
        .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),

    userFix :
            new MessageEmbed()
            .setColor('#ff4444')
            .setTitle('Prova ad usare il comando /fix del nostro bot')
            .setDescription(
                'Ti ricordiamo che il nostro bot **Suzanne** ha un comando che **ti potrebbe aiutare a risolvere eventuali problemi su Blender**. Dagli una possibilità.\n\n' +
                '*Per attivare il bot scrivi il comando* `/fix` *in questo canale o nel canale dei bot.*'
            )
            .setTimestamp()
            .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),

    helpEmbed :
            new MessageEmbed()
            .setColor('#ea7700')
            .setTitle('Help - Suzanne')
            .setDescription(
                'Suzanne è stato creato per aiutare tutti quelli che vogliono approcciarsi a Blender o già lo usano e vogliono migliorare.\n\n' +
                'Offre comandi di utilità e aiuto che possono servire in qualunque momento. Seleziona qua sotto cosa guardare.\n' +
                '\xa0\u200B \n\n'
            )
            .setThumbnail('https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF')
	        .addFields(
		        { name: '🖥\xa0 Funzionamento', value: 'Scopri come funziona il bot', inline: true },
		        { name: '🛠\xa0 Comandi', value: 'Informazioni sui comandi disponibili', inline: true },
                { name: 'ℹ\xa0 Materiali utili', value: '[Risorse utili per Blender](https://discord.com/channels/816442399039422476/1004384151329316994)', inline: true },
                //{ name: 'Inline field title', value: 'Some value here', inline: true },
                { name: '\u200B', value: '\u200B', inline: false },
	        )
            .setTimestamp()
            .setFooter({ text: 'Suzanne Bot ', iconURL: 'https://drive.google.com/uc?id=1Bl1G_ja_-ihvfrxvTfbsDCkA226lIRpF'}),
}

module.exports.embeds = embeds;