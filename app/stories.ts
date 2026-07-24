export type StorySentence = { fr: string; es: string };
export type StoryVerb = { infinitive: string; form: string; person: string; tense: string; es: string };
export type Story = {
  id: string;
  level: "A1" | "A2" | "A2+";
  title: string;
  subtitle: string;
  focus: string;
  persons: string[];
  tenses: string[];
  sentences: StorySentence[];
  verbs: StoryVerb[];
};

export const stories: Story[] = [
  {id:"lea-matin",level:"A1",title:"Le matin de LÃ©a",subtitle:"Une routine simple avant le travail",focus:"PrÃ©sent Â· je / elle",persons:["je","elle"],tenses:["prÃ©sent"],sentences:[
    {fr:"Je mâ€™appelle LÃ©a et jâ€™habite dans un petit appartement Ã  MontrÃ©al.",es:"Me llamo LÃ©a y vivo en un pequeÃ±o apartamento en Montreal."},
    {fr:"Chaque matin, je me lÃ¨ve Ã  sept heures et je prÃ©pare un cafÃ©.",es:"Cada maÃ±ana me levanto a las siete y preparo un cafÃ©."},
    {fr:"Je mange du pain avec du fromage et jâ€™Ã©coute la radio.",es:"Como pan con queso y escucho la radio."},
    {fr:"Ã€ huit heures, ma voisine arrive et nous parlons quelques minutes.",es:"A las ocho llega mi vecina y hablamos unos minutos."},
    {fr:"Elle est trÃ¨s gentille et elle a toujours une histoire amusante.",es:"Ella es muy amable y siempre tiene una historia divertida."},
    {fr:"Ensuite, je prends mon sac et je vais au travail en mÃ©tro.",es:"DespuÃ©s tomo mi bolso y voy al trabajo en metro."},
    {fr:"Ma journÃ©e commence tranquillement, et cela me plaÃ®t.",es:"Mi dÃ­a comienza tranquilamente y eso me gusta."}
  ],verbs:[
    {infinitive:"sâ€™appeler",form:"mâ€™appelle",person:"je",tense:"prÃ©sent",es:"llamarse"},{infinitive:"habiter",form:"habite",person:"je",tense:"prÃ©sent",es:"vivir"},{infinitive:"se lever",form:"me lÃ¨ve",person:"je",tense:"prÃ©sent",es:"levantarse"},{infinitive:"Ãªtre",form:"est",person:"elle",tense:"prÃ©sent",es:"ser / estar"},{infinitive:"avoir",form:"a",person:"elle",tense:"prÃ©sent",es:"tener"},{infinitive:"aller",form:"vais",person:"je",tense:"prÃ©sent",es:"ir"}
  ]},
  {id:"marche-samedi",level:"A1",title:"Notre samedi au marchÃ©",subtitle:"Une sortie en famille",focus:"PrÃ©sent Â· nous / ils",persons:["nous","ils"],tenses:["prÃ©sent"],sentences:[
    {fr:"Le samedi, nous allons au marchÃ© avec nos deux enfants.",es:"Los sÃ¡bados vamos al mercado con nuestros dos hijos."},
    {fr:"Nous cherchons des lÃ©gumes, du pain et un peu de fromage.",es:"Buscamos verduras, pan y un poco de queso."},
    {fr:"Les enfants regardent les fruits et choisissent de belles pommes rouges.",es:"Los niÃ±os miran las frutas y eligen unas bonitas manzanas rojas."},
    {fr:"Ils aiment aussi parler avec le marchand de fleurs.",es:"TambiÃ©n les gusta hablar con el vendedor de flores."},
    {fr:"Mon mari achÃ¨te un bouquet et me dit que les fleurs sont pour moi.",es:"Mi marido compra un ramo y me dice que las flores son para mÃ­."},
    {fr:"Nous avons faim, alors nous mangeons une petite crÃªpe.",es:"Tenemos hambre, asÃ­ que comemos una pequeÃ±a crepa."},
    {fr:"Ã€ midi, nous rentrons chez nous avec des sacs bien remplis.",es:"Al mediodÃ­a regresamos a casa con las bolsas bien llenas."}
  ],verbs:[
    {infinitive:"aller",form:"allons",person:"nous",tense:"prÃ©sent",es:"ir"},{infinitive:"chercher",form:"cherchons",person:"nous",tense:"prÃ©sent",es:"buscar"},{infinitive:"choisir",form:"choisissent",person:"ils",tense:"prÃ©sent",es:"elegir"},{infinitive:"aimer",form:"aiment",person:"ils",tense:"prÃ©sent",es:"gustar"},{infinitive:"avoir",form:"avons",person:"nous",tense:"prÃ©sent",es:"tener"},{infinitive:"rentrer",form:"rentrons",person:"nous",tense:"prÃ©sent",es:"regresar"}
  ]},
  {id:"nouvelle-collegue",level:"A1",title:"Une nouvelle collÃ¨gue",subtitle:"La premiÃ¨re journÃ©e de Sofia",focus:"ÃŠtre, avoir et descriptions",persons:["elle","nous"],tenses:["prÃ©sent"],sentences:[
    {fr:"Aujourdâ€™hui, une nouvelle collÃ¨gue commence dans notre bureau.",es:"Hoy comienza una nueva compaÃ±era en nuestra oficina."},
    {fr:"Elle sâ€™appelle Sofia, elle est colombienne et elle parle trois langues.",es:"Se llama Sofia, es colombiana y habla tres idiomas."},
    {fr:"Elle a trente ans et elle habite prÃ¨s de lâ€™entreprise.",es:"Tiene treinta aÃ±os y vive cerca de la empresa."},
    {fr:"Sofia est curieuse, organisÃ©e et trÃ¨s souriante.",es:"Sofia es curiosa, organizada y muy sonriente."},
    {fr:"Nous lui montrons la cuisine, la salle de rÃ©union et son nouveau bureau.",es:"Le mostramos la cocina, la sala de reuniones y su nueva oficina."},
    {fr:"Ã€ midi, nous dÃ©jeunons ensemble et nous parlons de nos familles.",es:"Al mediodÃ­a almorzamos juntos y hablamos de nuestras familias."},
    {fr:"Ã€ la fin de la journÃ©e, elle dit quâ€™elle est heureuse dâ€™Ãªtre ici.",es:"Al final del dÃ­a dice que estÃ¡ feliz de estar aquÃ­."}
  ],verbs:[
    {infinitive:"sâ€™appeler",form:"sâ€™appelle",person:"elle",tense:"prÃ©sent",es:"llamarse"},{infinitive:"Ãªtre",form:"est",person:"elle",tense:"prÃ©sent",es:"ser / estar"},{infinitive:"avoir",form:"a",person:"elle",tense:"prÃ©sent",es:"tener"},{infinitive:"montrer",form:"montrons",person:"nous",tense:"prÃ©sent",es:"mostrar"},{infinitive:"dÃ©jeuner",form:"dÃ©jeunons",person:"nous",tense:"prÃ©sent",es:"almorzar"},{infinitive:"dire",form:"dit",person:"elle",tense:"prÃ©sent",es:"decir"}
  ]},
  {id:"dimanche-amis",level:"A1",title:"Un dimanche entre amis",subtitle:"Des habitudes et des goÃ»ts diffÃ©rents",focus:"PrÃ©sent Â· tu / vous / ils",persons:["tu","vous","ils"],tenses:["prÃ©sent"],sentences:[
    {fr:"Le dimanche, tu invites souvent tes amis chez toi.",es:"Los domingos invitas a menudo a tus amigos a tu casa."},
    {fr:"Vous prÃ©parez le repas ensemble et chacun apporte quelque chose.",es:"Preparan la comida juntos y cada uno lleva algo."},
    {fr:"Paul et Nina adorent cuisiner, alors ils coupent les lÃ©gumes.",es:"A Paul y Nina les encanta cocinar, asÃ­ que cortan las verduras."},
    {fr:"Vous prÃ©fÃ©rez la musique douce, mais ils aiment les chansons Ã©nergiques.",es:"Ustedes prefieren la mÃºsica suave, pero a ellos les gustan las canciones enÃ©rgicas."},
    {fr:"AprÃ¨s le dÃ©jeuner, tu proposes une promenade dans le parc.",es:"DespuÃ©s del almuerzo propones un paseo por el parque."},
    {fr:"Vous marchez, vous discutez et vous prenez beaucoup de photos.",es:"Caminan, conversan y toman muchas fotos."},
    {fr:"Le soir, tes amis rentrent heureux et ils promettent de revenir.",es:"Por la noche tus amigos vuelven felices y prometen regresar."}
  ],verbs:[
    {infinitive:"inviter",form:"invites",person:"tu",tense:"prÃ©sent",es:"invitar"},{infinitive:"prÃ©parer",form:"prÃ©parez",person:"vous",tense:"prÃ©sent",es:"preparar"},{infinitive:"adorer",form:"adorent",person:"ils",tense:"prÃ©sent",es:"encantar"},{infinitive:"prÃ©fÃ©rer",form:"prÃ©fÃ©rez",person:"vous",tense:"prÃ©sent",es:"preferir"},{infinitive:"proposer",form:"proposes",person:"tu",tense:"prÃ©sent",es:"proponer"},{infinitive:"promettre",form:"promettent",person:"ils",tense:"prÃ©sent",es:"prometer"}
  ]},
  {id:"train-manque",level:"A2",title:"Le train que jâ€™ai manquÃ©",subtitle:"Une matinÃ©e pleine dâ€™imprÃ©vus",focus:"PassÃ© composÃ© avec avoir et Ãªtre",persons:["je","il"],tenses:["passÃ© composÃ©"],sentences:[
    {fr:"Hier matin, je me suis rÃ©veillÃ© plus tard que prÃ©vu.",es:"Ayer por la maÃ±ana me despertÃ© mÃ¡s tarde de lo previsto."},
    {fr:"Jâ€™ai prÃ©parÃ© mon sac rapidement, mais jâ€™ai oubliÃ© mon billet sur la table.",es:"PreparÃ© mi bolso rÃ¡pidamente, pero olvidÃ© mi boleto sobre la mesa."},
    {fr:"Je suis sorti de lâ€™appartement et jâ€™ai couru jusquâ€™Ã  la station.",es:"SalÃ­ del apartamento y corrÃ­ hasta la estaciÃ³n."},
    {fr:"Quand je suis arrivÃ©, le train est parti devant moi.",es:"Cuando lleguÃ©, el tren partiÃ³ delante de mÃ­."},
    {fr:"Un employÃ© mâ€™a expliquÃ© quâ€™un autre train allait partir trente minutes plus tard.",es:"Un empleado me explicÃ³ que otro tren iba a salir treinta minutos despuÃ©s."},
    {fr:"Jâ€™ai achetÃ© un nouveau billet et jâ€™ai appelÃ© mon collÃ¨gue.",es:"ComprÃ© otro boleto y llamÃ© a mi compaÃ±ero."},
    {fr:"Finalement, je suis arrivÃ© au bureau avec une heure de retard, mais mon directeur a compris la situation.",es:"Finalmente lleguÃ© a la oficina con una hora de retraso, pero mi director comprendiÃ³ la situaciÃ³n."}
  ],verbs:[
    {infinitive:"se rÃ©veiller",form:"me suis rÃ©veillÃ©",person:"je",tense:"passÃ© composÃ©",es:"despertarse"},{infinitive:"oublier",form:"ai oubliÃ©",person:"je",tense:"passÃ© composÃ©",es:"olvidar"},{infinitive:"sortir",form:"suis sorti",person:"je",tense:"passÃ© composÃ©",es:"salir"},{infinitive:"partir",form:"est parti",person:"il",tense:"passÃ© composÃ©",es:"partir"},{infinitive:"comprendre",form:"a compris",person:"il",tense:"passÃ© composÃ©",es:"comprender"}
  ]},
  {id:"voyage-quebec",level:"A2",title:"Notre voyage au QuÃ©bec",subtitle:"Un projet pour le mois prochain",focus:"Futur proche et projets",persons:["nous","ils"],tenses:["prÃ©sent","futur proche"],sentences:[
    {fr:"Le mois prochain, nous allons dÃ©couvrir plusieurs rÃ©gions du QuÃ©bec.",es:"El prÃ³ximo mes vamos a descubrir varias regiones de Quebec."},
    {fr:"Nous allons dâ€™abord passer trois jours Ã  QuÃ©bec, oÃ¹ nous allons visiter le Vieux-QuÃ©bec.",es:"Primero vamos a pasar tres dÃ­as en Quebec, donde visitaremos el Viejo Quebec."},
    {fr:"Ensuite, mes cousins vont nous rejoindre pour une randonnÃ©e prÃ¨s du fleuve.",es:"DespuÃ©s mis primos se van a reunir con nosotros para una caminata cerca del rÃ­o."},
    {fr:"Ils connaissent bien la rÃ©gion et ils vont choisir un parcours facile.",es:"Conocen bien la regiÃ³n y van a elegir un recorrido fÃ¡cil."},
    {fr:"Nous allons louer une voiture, mais nous allons aussi prendre le train.",es:"Vamos a alquilar un automÃ³vil, pero tambiÃ©n tomaremos el tren."},
    {fr:"Ma sÅ“ur veut goÃ»ter la poutine et je vais chercher de bonnes adresses.",es:"Mi hermana quiere probar la poutine y yo voy a buscar buenos lugares."},
    {fr:"Nous sommes impatients, car ce voyage va Ãªtre notre premiÃ¨re grande aventure en franÃ§ais.",es:"Estamos impacientes porque este viaje serÃ¡ nuestra primera gran aventura en francÃ©s."}
  ],verbs:[
    {infinitive:"dÃ©couvrir",form:"allons dÃ©couvrir",person:"nous",tense:"futur proche",es:"descubrir"},{infinitive:"rejoindre",form:"vont rejoindre",person:"ils",tense:"futur proche",es:"reunirse"},{infinitive:"connaÃ®tre",form:"connaissent",person:"ils",tense:"prÃ©sent",es:"conocer"},{infinitive:"louer",form:"allons louer",person:"nous",tense:"futur proche",es:"alquilar"},{infinitive:"chercher",form:"vais chercher",person:"je",tense:"futur proche",es:"buscar"}
  ]},
  {id:"journee-clara",level:"A2",title:"La journÃ©e de Clara",subtitle:"Une routine qui change",focus:"Verbes pronominaux Â· prÃ©sent et passÃ©",persons:["elle"],tenses:["prÃ©sent","passÃ© composÃ©"],sentences:[
    {fr:"Habituellement, Clara se rÃ©veille Ã  six heures et elle se prÃ©pare sans perdre de temps.",es:"Normalmente Clara se despierta a las seis y se prepara sin perder tiempo."},
    {fr:"Elle se douche, sâ€™habille et se rend au travail Ã  vÃ©lo.",es:"Se ducha, se viste y va al trabajo en bicicleta."},
    {fr:"Mais hier, elle ne sâ€™est pas rÃ©veillÃ©e quand son alarme a sonnÃ©.",es:"Pero ayer no se despertÃ³ cuando sonÃ³ su alarma."},
    {fr:"Elle sâ€™est levÃ©e Ã  huit heures et elle sâ€™est habillÃ©e en cinq minutes.",es:"Se levantÃ³ a las ocho y se vistiÃ³ en cinco minutos."},
    {fr:"Elle ne sâ€™est pas coiffÃ©e et elle a oubliÃ© de prendre son dÃ©jeuner.",es:"No se peinÃ³ y olvidÃ³ llevar su almuerzo."},
    {fr:"Au bureau, ses collÃ¨gues se sont inquiÃ©tÃ©s, puis ils ont ri avec elle.",es:"En la oficina sus compaÃ±eros se preocuparon y luego se rieron con ella."},
    {fr:"Ce soir, Clara va se coucher tÃ´t et elle va placer deux alarmes prÃ¨s de son lit.",es:"Esta noche Clara se acostarÃ¡ temprano y pondrÃ¡ dos alarmas junto a su cama."}
  ],verbs:[
    {infinitive:"se rÃ©veiller",form:"se rÃ©veille",person:"elle",tense:"prÃ©sent",es:"despertarse"},{infinitive:"se rendre",form:"se rend",person:"elle",tense:"prÃ©sent",es:"dirigirse"},{infinitive:"se lever",form:"sâ€™est levÃ©e",person:"elle",tense:"passÃ© composÃ©",es:"levantarse"},{infinitive:"sâ€™habiller",form:"sâ€™est habillÃ©e",person:"elle",tense:"passÃ© composÃ©",es:"vestirse"},{infinitive:"se coucher",form:"va se coucher",person:"elle",tense:"futur proche",es:"acostarse"}
  ]},
  {id:"cadeau-marie",level:"A2",title:"Le cadeau de Marie",subtitle:"Une surprise et beaucoup de pronoms",focus:"Pronoms COD, COI, y et en",persons:["je","nous","elle"],tenses:["prÃ©sent","passÃ© composÃ©"],sentences:[
    {fr:"Marie adore les plantes, alors nous lui avons prÃ©parÃ© une surprise.",es:"A Marie le encantan las plantas, asÃ­ que le preparamos una sorpresa."},
    {fr:"Jâ€™ai trouvÃ© un petit citronnier au marchÃ© et je lâ€™ai achetÃ© immÃ©diatement.",es:"EncontrÃ© un pequeÃ±o limonero en el mercado y lo comprÃ© inmediatamente."},
    {fr:"Le vendeur mâ€™a donnÃ© des conseils et jâ€™en ai notÃ© plusieurs.",es:"El vendedor me dio consejos y anotÃ© varios."},
    {fr:"Nous sommes allÃ©s chez Marie samedi et nous lui avons offert lâ€™arbre.",es:"Fuimos a casa de Marie el sÃ¡bado y le regalamos el Ã¡rbol."},
    {fr:"Elle lâ€™a placÃ© prÃ¨s de la fenÃªtre parce quâ€™il y a beaucoup de lumiÃ¨re.",es:"Ella lo colocÃ³ cerca de la ventana porque hay mucha luz."},
    {fr:"Elle va sâ€™en occuper chaque jour et elle va y ajouter un peu dâ€™eau le matin.",es:"Va a cuidarlo todos los dÃ­as y va a ponerle un poco de agua por la maÃ±ana."},
    {fr:"Marie nous a remerciÃ©s et nous a promis de nous envoyer une photo du premier citron.",es:"Marie nos agradeciÃ³ y prometiÃ³ enviarnos una foto del primer limÃ³n."}
  ],verbs:[
    {infinitive:"prÃ©parer",form:"lui avons prÃ©parÃ©",person:"nous",tense:"passÃ© composÃ©",es:"prepararle"},{infinitive:"acheter",form:"lâ€™ai achetÃ©",person:"je",tense:"passÃ© composÃ©",es:"comprarlo"},{infinitive:"noter",form:"en ai notÃ©",person:"je",tense:"passÃ© composÃ©",es:"anotar algunos"},{infinitive:"offrir",form:"lui avons offert",person:"nous",tense:"passÃ© composÃ©",es:"ofrecerle"},{infinitive:"sâ€™occuper",form:"va sâ€™en occuper",person:"elle",tense:"futur proche",es:"ocuparse de Ã©l"}
  ]},
  {id:"velo-rouge",level:"A2+",title:"Le vÃ©lo rouge",subtitle:"Une rencontre qui change une habitude",focus:"PrÃ©sent, passÃ© composÃ© et futur proche",persons:["je","il","nous"],tenses:["prÃ©sent","passÃ© composÃ©","futur proche"],sentences:[
    {fr:"Depuis quelques mois, je prends toujours lâ€™autobus pour aller au travail, mÃªme quand il fait beau.",es:"Desde hace algunos meses siempre tomo el autobÃºs para ir al trabajo, incluso cuando hace buen tiempo."},
    {fr:"La semaine derniÃ¨re, jâ€™ai rencontrÃ© mon voisin Karim dans lâ€™entrÃ©e de lâ€™immeuble.",es:"La semana pasada encontrÃ© a mi vecino Karim en la entrada del edificio."},
    {fr:"Il portait un casque et poussait un magnifique vÃ©lo rouge quâ€™il venait dâ€™acheter.",es:"Llevaba un casco y empujaba una hermosa bicicleta roja que acababa de comprar."},
    {fr:"Il mâ€™a expliquÃ© que le trajet Ã  vÃ©lo Ã©tait plus rapide et beaucoup plus agrÃ©able.",es:"Me explicÃ³ que el trayecto en bicicleta era mÃ¡s rÃ¡pido y mucho mÃ¡s agradable."},
    {fr:"Nous avons regardÃ© ensemble la carte des pistes cyclables et il mâ€™a montrÃ© un itinÃ©raire sÃ©curitaire.",es:"Miramos juntos el mapa de ciclovÃ­as y me mostrÃ³ una ruta segura."},
    {fr:"Aujourdâ€™hui, je compare les prix des vÃ©los dâ€™occasion et je cherche un modÃ¨le lÃ©ger.",es:"Hoy comparo precios de bicicletas usadas y busco un modelo ligero."},
    {fr:"Samedi, Karim va mâ€™accompagner au magasin, et la semaine prochaine, nous allons faire notre premier trajet ensemble.",es:"El sÃ¡bado Karim me acompaÃ±arÃ¡ a la tienda y la prÃ³xima semana haremos nuestro primer trayecto juntos."}
  ],verbs:[
    {infinitive:"prendre",form:"prends",person:"je",tense:"prÃ©sent",es:"tomar"},{infinitive:"rencontrer",form:"ai rencontrÃ©",person:"je",tense:"passÃ© composÃ©",es:"encontrar"},{infinitive:"expliquer",form:"a expliquÃ©",person:"il",tense:"passÃ© composÃ©",es:"explicar"},{infinitive:"chercher",form:"cherche",person:"je",tense:"prÃ©sent",es:"buscar"},{infinitive:"accompagner",form:"va accompagner",person:"il",tense:"futur proche",es:"acompaÃ±ar"},{infinitive:"faire",form:"allons faire",person:"nous",tense:"futur proche",es:"hacer"}
  ]},
  {id:"decision-ana",level:"A2+",title:"La dÃ©cision dâ€™Ana",subtitle:"Ã‰tudier, travailler et prÃ©parer lâ€™avenir",focus:"Chronologie et personnes variÃ©es",persons:["elle","ses amis","nous"],tenses:["prÃ©sent","passÃ© composÃ©","futur proche"],sentences:[
    {fr:"Ana travaille dans un cafÃ© depuis deux ans, mais elle rÃªve de devenir infirmiÃ¨re.",es:"Ana trabaja en una cafeterÃ­a desde hace dos aÃ±os, pero sueÃ±a con ser enfermera."},
    {fr:"Pendant longtemps, elle a eu peur de reprendre ses Ã©tudes parce que les cours semblaient difficiles.",es:"Durante mucho tiempo tuvo miedo de retomar sus estudios porque los cursos parecÃ­an difÃ­ciles."},
    {fr:"Le mois dernier, ses amis lui ont parlÃ© dâ€™un programme offert le soir.",es:"El mes pasado sus amigos le hablaron de un programa impartido por las noches."},
    {fr:"Ils lâ€™ont encouragÃ©e et ils ont proposÃ© de lâ€™aider avec ses enfants.",es:"La animaron y propusieron ayudarla con sus hijos."},
    {fr:"Ana a rempli le formulaire, a passÃ© une entrevue et a reÃ§u une rÃ©ponse positive.",es:"Ana completÃ³ el formulario, hizo una entrevista y recibiÃ³ una respuesta positiva."},
    {fr:"Maintenant, elle organise son horaire et nous cherchons une solution pour chaque journÃ©e.",es:"Ahora organiza su horario y buscamos una soluciÃ³n para cada dÃ­a."},
    {fr:"En septembre, elle va commencer sa formation, et toute la famille va cÃ©lÃ©brer ce nouveau dÃ©part.",es:"En septiembre comenzarÃ¡ su formaciÃ³n y toda la familia celebrarÃ¡ este nuevo comienzo."}
  ],verbs:[
    {infinitive:"travailler",form:"travaille",person:"elle",tense:"prÃ©sent",es:"trabajar"},{infinitive:"avoir",form:"a eu",person:"elle",tense:"passÃ© composÃ©",es:"tener"},{infinitive:"encourager",form:"ont encouragÃ©e",person:"ils",tense:"passÃ© composÃ©",es:"animar"},{infinitive:"recevoir",form:"a reÃ§u",person:"elle",tense:"passÃ© composÃ©",es:"recibir"},{infinitive:"commencer",form:"va commencer",person:"elle",tense:"futur proche",es:"comenzar"}
  ]},
  {id:"diner-inattendu",level:"A2+",title:"Le dÃ®ner inattendu",subtitle:"Quand un petit problÃ¨me devient un bon souvenir",focus:"RÃ©cit passÃ© et consÃ©quences prÃ©sentes",persons:["nous","elle","ils"],tenses:["passÃ© composÃ©","prÃ©sent","futur proche"],sentences:[
    {fr:"Vendredi soir, nous avons invitÃ© nos nouveaux voisins Ã  dÃ®ner pour mieux les connaÃ®tre.",es:"El viernes por la noche invitamos a cenar a nuestros nuevos vecinos para conocerlos mejor."},
    {fr:"Ma sÅ“ur a prÃ©parÃ© une soupe, jâ€™ai fait un gÃ¢teau et les enfants ont dÃ©corÃ© la table.",es:"Mi hermana preparÃ³ una sopa, yo hice un pastel y los niÃ±os decoraron la mesa."},
    {fr:"Quelques minutes avant leur arrivÃ©e, le four est tombÃ© en panne et le gÃ¢teau est restÃ© presque cru.",es:"Unos minutos antes de su llegada el horno se averiÃ³ y el pastel quedÃ³ casi crudo."},
    {fr:"Nous avons dâ€™abord paniquÃ©, puis notre voisine a proposÃ© dâ€™apporter un dessert.",es:"Primero entramos en pÃ¡nico y luego nuestra vecina propuso llevar un postre."},
    {fr:"Ses enfants sont arrivÃ©s avec des crÃªpes et tout le monde a ri de notre aventure.",es:"Sus hijos llegaron con crepas y todos se rieron de nuestra aventura."},
    {fr:"Aujourdâ€™hui, nous parlons souvent avec cette famille et les enfants jouent ensemble aprÃ¨s lâ€™Ã©cole.",es:"Hoy hablamos a menudo con esa familia y los niÃ±os juegan juntos despuÃ©s de la escuela."},
    {fr:"Le mois prochain, ils vont nous inviter chez eux, mais ils ont promis de vÃ©rifier leur four avant le dÃ®ner.",es:"El prÃ³ximo mes nos invitarÃ¡n a su casa, pero prometieron revisar su horno antes de la cena."}
  ],verbs:[
    {infinitive:"inviter",form:"avons invitÃ©",person:"nous",tense:"passÃ© composÃ©",es:"invitar"},{infinitive:"faire",form:"ai fait",person:"je",tense:"passÃ© composÃ©",es:"hacer"},{infinitive:"tomber",form:"est tombÃ©",person:"il",tense:"passÃ© composÃ©",es:"averiarse"},{infinitive:"proposer",form:"a proposÃ©",person:"elle",tense:"passÃ© composÃ©",es:"proponer"},{infinitive:"parler",form:"parlons",person:"nous",tense:"prÃ©sent",es:"hablar"},{infinitive:"inviter",form:"vont inviter",person:"ils",tense:"futur proche",es:"invitar"}
  ]},
  {id:"jardin-quartier",level:"A2+",title:"Le jardin du quartier",subtitle:"Un projet collectif prend vie",focus:"Actions collectives dans trois temps",persons:["nous","vous","ils"],tenses:["passÃ© composÃ©","prÃ©sent","futur proche"],sentences:[
    {fr:"Lâ€™annÃ©e derniÃ¨re, un terrain vide prÃ¨s de notre immeuble Ã©tait sale et personne ne lâ€™utilisait.",es:"El aÃ±o pasado un terreno vacÃ­o cerca de nuestro edificio estaba sucio y nadie lo utilizaba."},
    {fr:"Nous avons organisÃ© une rÃ©union et plusieurs voisins sont venus avec des idÃ©es.",es:"Organizamos una reuniÃ³n y varios vecinos vinieron con ideas."},
    {fr:"Vous avez proposÃ© un jardin partagÃ©, tandis que les enfants ont demandÃ© un petit espace de jeu.",es:"Ustedes propusieron un jardÃ­n compartido, mientras que los niÃ±os pidieron un pequeÃ±o espacio de juego."},
    {fr:"Ensemble, nous avons nettoyÃ© le terrain, construit des bacs et plantÃ© des lÃ©gumes.",es:"Juntos limpiamos el terreno, construimos cajones y plantamos verduras."},
    {fr:"Aujourdâ€™hui, chacun sâ€™occupe dâ€™une partie du jardin et les familles y passent beaucoup de temps.",es:"Hoy cada uno se ocupa de una parte del jardÃ­n y las familias pasan mucho tiempo allÃ­."},
    {fr:"Les voisins partagent leurs tomates, leurs herbes et leurs conseils avec les nouveaux participants.",es:"Los vecinos comparten sus tomates, hierbas y consejos con los nuevos participantes."},
    {fr:"Au printemps prochain, nous allons installer une table, et ils vont organiser un repas pour tout le quartier.",es:"La prÃ³xima primavera instalaremos una mesa y organizarÃ¡n una comida para todo el barrio."}
  ],verbs:[
    {infinitive:"organiser",form:"avons organisÃ©",person:"nous",tense:"passÃ© composÃ©",es:"organizar"},{infinitive:"venir",form:"sont venus",person:"ils",tense:"passÃ© composÃ©",es:"venir"},{infinitive:"proposer",form:"avez proposÃ©",person:"vous",tense:"passÃ© composÃ©",es:"proponer"},{infinitive:"sâ€™occuper",form:"sâ€™occupe",person:"chacun",tense:"prÃ©sent",es:"ocuparse"},{infinitive:"partager",form:"partagent",person:"ils",tense:"prÃ©sent",es:"compartir"},{infinitive:"installer",form:"allons installer",person:"nous",tense:"futur proche",es:"instalar"}
  ]}
];
