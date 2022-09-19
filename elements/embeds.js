const { MessageEmbed } = require('discord.js');

const embeds = {


    //COMANDO FIX
    fixEmbed : 
        new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Problemi Comuni')
        .setDescription('Questo comando cercherà di risolvere i problemi che si possono incontrare facilmente su Blender e offrirà varie soluzioni.\n\n**Seleziona qua sotto il problema che vorresti risolvere.**\n\n'+ '*Se non avete trovato quello che stavate cercando o avete altre soluzioni da aggiungere contattate lo staff tramite ticket. Grazie.*\n\n')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

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
            'In edit mode, selezionate tutta la mesh premendo A, in alto troverete il pulsante mesh, si aprirà un menù a tendina, premete su normals e poi recalculate outside o inside, a seconda della vostra mesh'
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=1kwTGXPOj14pG-oT11j5yxMb8icbomBsJ')
        .setFooter({ text: 'Suzanne Bot '}),
    
    fix2 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Glitch nella mesh')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'La mesh può presentare questi errori per diversi motivi: una topologia non propriamente corretta, modificatori usati nel modo sbagliato o possono anche essere dei semplici glitch grafici temporanei.\n\n' +
            "**Come risolvere l'errore**\n" + 
            'Metodo 1 - Merge by distance\n' +
            "Se hai usato l'estrusione o altri strumenti simili per modellare la tua mesh allora è possibile che ti sia scappato qualche doppio vertice da qualche parte, in edit mode, seleziona tutta la mesh premendo A, fatto ciò in alto troverai il pulsante mesh, ti aprirà un menù a tendina, seleziona merge e poi merge by distance, aumenta o diminuisci poi il valore come preferisci\n\n" +
            'Metodo 2 - N-gons\n' +
            'Quando si lavora in 3D bisognerebbe lavorare sempre con i quads (facce da 4 vertici), gli N-gons sono facce composte da più di 4 facce e molto spesso sono la causa di una cattiva topologia, per risolvere questo problema bisogna cercare il più possibile di usare i quads o al massimo i tris.\n' +
            "In edit mode si possono tranquillamente usare alcuni strumenti per semplificarsi la vita, in alto trovate il pulsante faces e cliccatelo, si aprirà un menu a tendina, a seconda dell'esigenza potete trasformare le facce."
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=1g0Cf8tLZ9qujxHsoZTN7vQL30nPCSwDP')
        .setFooter({ text: 'Suzanne Bot '}),

    fix3 : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Render non corretto')
        .setDescription(
            '*Segui questi passaggi per risolvere il problema*\n\n' +
            'Se il render presenta un effetto pixel molto evidente o alcune parti sono leggermente distorte vuol dire che non è stato usato o è stato usato nel modo sbagliato il denoise.\n\n' +
            "**Come risolvere l'errore**\n" + 
            'Metodo 1 - Denoise\n' +
            "Soprattutto se la scena è molto complessa normalmente servirebbero moltissimi samples per fare un render di alta qualità. Si può ottenere lo stesso effetto utilizzando il denoise.\n\n" +
            "Andate nelle proprietà dei layer e attivate Denoising Data, una volta fatto questo dovete recarvi nel compositor e attivare i nodi, inserite il nodo Denoise fate tutti i collegamenti tra la scena, il denoise e l'output.\n\n" +
            "ATTENZIONE - evitate di usare il denoise preimpostato per il rendering (quello che si trova nelle impostazioni di rendering), va benissimo per il viewport ma spesso crea strani effetti nel render."
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=11AhOGm6QqddN_lHpf9VnTp-biDtEx9Li')
        .setFooter({ text: 'Suzanne Bot '}),

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
            "Per prima cosa assicuratevi di aver applicato tutti i modifier in quanto dopo la procedura potrebbero cambiare. Selezionate la mesh e premete ctrl+a, appariranno una serie di opzioni, se volete andare sul sicuro cliccate su All transform.\n" +
            "Vi accorgerete che l'origine della mesh si sarà spostata, per riportarla sulla mesh cliccate il tasto destro e selezionate set origin > origin to geometry."
        )
        .setTimestamp()
        .setImage('https://drive.google.com/uc?id=1rV3YwnCuUa9_WCSR11rkuoUmAaMGxDAR')
        .setFooter({ text: 'Suzanne Bot '}),






    //COMANDO MODIFICATORI
    definizione : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa sono i modificatori?')
        .setDescription('I modificatori sono operazioni automatiche che influiscono sulla geometria di un oggetto in maniera non distruttiva, questo significa che puoi effettuare tante operazioni di modellazione automaticamente senza cambiare la geometria di base del tuo oggetto\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/introduction.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=24)')
        .setImage('https://i.ibb.co/5xPjLzh/Schermata-2022-09-19-alle-19-34-51.png')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    array : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa l\'array modifier?')
        .setDescription('L\'Array modifier crea un array (una serie) di copie dell\'oggetto di base, ogni copia può venire spostata dalla precedente in una qualsiasi delle direzioni possibili\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/array.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=53)')
        .setImage('https://media.giphy.com/media/MRrSb87CI5CsimoRZ5/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    bevel : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il bevel modifier?')
        .setDescription('Il Bevel modifier smussa gli spigoli dell\'oggetto sul quale è applicato, questo fornisce dei controlli su come e dove applicare il bevel (lo smussamento)\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/bevel.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=63)')
        .setImage('https://media.giphy.com/media/BTrOOKK1BQYV2WG4kx/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    boolean : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il boolean modifier?')
        .setDescription('Il boolean modifier combina due oggetti separati tra loro usando una delle 3 operazioni booleane disponibili: Union, Intersect, Difference.\nIn parole più semplici il boolean modifier è principalmente utilizzato per fare letteralmente dei buchi in una mesh o rimuoverne una porzione sfruttando la forma di un altro oggetto\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/booleans.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=72)')
        .setImage('https://media.giphy.com/media/6PsW4jZQ6D0NghNFzh/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    build : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il build modifier?')
        .setDescription('Il build modifier fa in modo che le facce di un oggetto scompaiano e riappaiano una dopo l\'altra nel tempo\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/build.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=83)')
        .setImage('https://media.giphy.com/media/I8sUyClu5NQefp84mo/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    decimate : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il decimate modifier?')
        .setDescription('Il decimate modifier ti permette di ridurre il numero di facce di un oggetto però cercando di mantenere la stessa forma il più possibile\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/decimate.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=91)')
        .setImage('https://media.giphy.com/media/gDRsYTB9RQiV82sOgv/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    edge_split : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa l\'edge split modifier?')
        .setDescription('L\'edge split duplica alcuni o tutti gli spigoli di una mesh e rompe le connessioni intorno a quegli split edges, quando applicato questo ti permetterà di separare le facce l\'una dall\'altra\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/edge_split.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=99)')
        .setImage('https://media.giphy.com/media/N8JgewayfMB4vsWYND/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    geometry_nodes : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il geometry node modifier?')
        .setDescription('Il geometry node modifier applica un node group che definisce la geometria di un oggetto, è chiamato per questo prcedural modeling o modellazione procedurale\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/geometry_nodes.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=111)')
        .setImage('https://media.giphy.com/media/bgBq7JqOv5FUQGVFZi/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    mask : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il mask modifier?')
        .setDescription('Il mask modifier permette ai vertici di un oggetto di venire nascosti il base al vertex group assegnato a quell\'oggetto\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/mask.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=126)')
        .setImage('https://media.giphy.com/media/NpkbyfbbjhWLsFmEOQ/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    mirror : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il mirror modifier?')
        .setDescription('Il mirror modifier specchia la mesh secondo l\'asse X, Y o Z in base all\'origine dell\'oggetto\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/mirror.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=133)')
        .setImage('https://media.giphy.com/media/DvcfnOvRVCMv9hGKBS/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    subdivision_surface : 
        new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Cosa fa il subdivision surface modifier?')
        .setDescription('Il subdivision surface modifier divide le facce di una mesh in parti più piccole suddividendole e moltiplicandole permettendoti di creare delle geometrie più liscie e al contempo modellare un oggetto con pochi vertici fintanto che il modificatore non è applicato.\nAlti livelli di suddivisione significano una mesh più liscia e più suddivisa\n\n[• Docs](https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/subdivision_surface.html)\n[• Video](https://youtu.be/idcFMhoSdIc?t=156)')
        .setImage('https://media.giphy.com/media/tKOAO5MrduraxSnaXN/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Suzanne Bot '}),

    

    

}

module.exports.embeds = embeds;
