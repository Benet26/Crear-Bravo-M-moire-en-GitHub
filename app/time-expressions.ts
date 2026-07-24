export type TimeExercise = {
  id:string; lesson:string; mode:"choice"|"fill"|"reorder"|"translate"|"correct";
  prompt:string; answer:string; options?:string[]; tokens?:string[]; hint:string; explanation:string;
};
export type TimeLesson = {
  id:string; title:string; objective:string; summary:string;
  note:string; rows:[string,string,string][];
};

export const timeLessons:TimeLesson[]=[
  {id:"duration",title:"1 Â· Exprimer une durÃ©e",objective:"Elegir pendant, depuis, pour, en y durant.",note:"Pendant, depuis y pour no siempre son adverbios: se estudian juntos porque expresan relaciones temporales.",summary:"Depuis = empezÃ³ antes y continÃºa; pendant/durant = duraciÃ³n cerrada; pour = duraciÃ³n prevista; en = tiempo necesario.",rows:[["depuis","desde hace / desde","Je travaille depuis deux ans."],["pendant / durant","durante","Jâ€™ai Ã©tudiÃ© pendant deux heures."],["pour","por (duraciÃ³n prevista)","Je pars pour trois semaines."],["en","en (tiempo necesario)","Il a fini en dix minutes."]]},
  {id:"when",title:"2 Â· Situer une action",objective:"Decir cuÃ¡ndo ocurriÃ³, ocurrirÃ¡ o termina una acciÃ³n.",note:"Il y a se refiere al pasado; dans, al futuro; dâ€™ici marca un lÃ­mite.",summary:"Il y a = hace; dans = dentro de; jusquâ€™Ã  = hasta; dâ€™ici = de aquÃ­ a / antes de.",rows:[["il y a","hace","Je suis arrivÃ© il y a une heure."],["dans","dentro de","Le cours commence dans dix minutes."],["jusquâ€™Ã ","hasta","Je reste jusquâ€™Ã  vendredi."],["dâ€™ici","de aquÃ­ a / antes de","Dâ€™ici demain, je terminerai."]]},
  {id:"frequency",title:"3 Â· Parler de frÃ©quence",objective:"Expresar hÃ¡bitos, frecuencia y continuidad.",note:"La posiciÃ³n suele ser despuÃ©s del verbo conjugado: Je travaille souvent.",summary:"Toujours = siempre; souvent = a menudo; parfois = a veces; rarement = rara vez; jamais = nunca.",rows:[["toujours","siempre","Elle arrive toujours tÃ´t."],["souvent / parfois","a menudo / a veces","Nous sortons souvent."],["rarement / jamais","rara vez / nunca","Il ne voyage jamais."],["dâ€™habitude","normalmente","Dâ€™habitude, je prends le mÃ©tro."]]},
  {id:"sequence",title:"4 Â· Organiser un rÃ©cit",objective:"Ordenar cronolÃ³gicamente una historia.",note:"Los conectores hacen visible la estructura; son esenciales en una producciÃ³n TCF.",summary:"Dâ€™abord abre; ensuite/puis desarrollan; pendant ce temps introduce simultaneidad; enfin/finalement cierran.",rows:[["dâ€™abord","primero","Dâ€™abord, nous avons prÃ©parÃ© le repas."],["ensuite / puis","despuÃ©s / luego","Ensuite, les invitÃ©s sont arrivÃ©s."],["pendant ce temps","mientras tanto","Pendant ce temps, Paul dÃ©corait la salle."],["enfin / finalement","por Ãºltimo / finalmente","Enfin, nous sommes rentrÃ©s."]]},
  {id:"argument",title:"5 Â· Connecteurs pour le TCF",objective:"Matizar y organizar una opiniÃ³n.",note:"Un conector no reemplaza una idea: Ãºsalo para mostrar la relaciÃ³n entre dos frases.",summary:"Cependant/pourtant = oposiciÃ³n; donc/ainsi = consecuencia; Ã©galement = adiciÃ³n; surtout/notamment = precisiÃ³n.",rows:[["cependant / pourtant","sin embargo","Cependant, cette solution coÃ»te cher."],["nÃ©anmoins","no obstante","NÃ©anmoins, elle reste utile."],["donc / ainsi","por lo tanto / asÃ­","Ainsi, il faut agir."],["notamment / surtout","en particular / sobre todo","Jâ€™aime notamment les musÃ©es."]]},
  {id:"review",title:"6 Â· RÃ©vision gÃ©nÃ©rale",objective:"Elegir la expresiÃ³n por el sentido, no por traducciÃ³n literal.",note:"Lee toda la frase: Â¿la acciÃ³n continÃºa, termina, dura o estÃ¡ planificada?",summary:"Relee el contexto, identifica el tiempo y luego elige la expresiÃ³n temporal o el conector.",rows:[["Ã§a faitâ€¦ que","haceâ€¦ que","Ã‡a fait deux ans que jâ€™apprends."],["depuis","acciÃ³n aÃºn actual","Depuis lundi, il pleut."],["pendant","duraciÃ³n terminada","Pendant les vacances, jâ€™ai lu."],["dans","momento futuro","Dans une semaine, je pars."]]},
];

const q=(id:string,lesson:string,mode:TimeExercise["mode"],prompt:string,answer:string,hint:string,explanation:string,options?:string[],tokens?:string[]):TimeExercise=>({id,lesson,mode,prompt,answer,hint,explanation,options,tokens});
export const timeExercises:TimeExercise[]=[
q("te01","duration","choice","Jâ€™apprends le franÃ§ais ___ deux ans et je continue.","depuis","La acciÃ³n continÃºa hoy.","Depuis se utiliza porque comenzÃ³ antes y sigue ahora.",["pendant","depuis","pour","en"]),
q("te02","duration","fill","Jâ€™ai travaillÃ© ___ trois heures hier.","pendant","DuraciÃ³n terminada.","Pendant expresa un periodo cerrado en el pasado."),
q("te03","duration","choice","Nous partons au Canada ___ six mois.","pour","Es una duraciÃ³n prevista.","Pour indica la duraciÃ³n que se proyecta.",["depuis","pour","en","il y a"]),
q("te04","duration","fill","Elle a terminÃ© le rapport ___ vingt minutes.","en","Pregunta: Â¿cuÃ¡nto tardÃ³?","En expresa el tiempo necesario para completar una acciÃ³n."),
q("te05","duration","choice","___ la rÃ©union, personne nâ€™a utilisÃ© son tÃ©lÃ©phone.","durant","SinÃ³nimo mÃ¡s formal de pendant.","Durant funciona como pendant para una duraciÃ³n delimitada.",["depuis","durant","dans","dâ€™ici"]),
q("te06","duration","translate","Traduce: Â«EstudiÃ© durante dos semanasÂ».","Jâ€™ai Ã©tudiÃ© pendant deux semaines","Usa passÃ© composÃ© + pendant.","Pendant va con un perÃ­odo terminado."),
q("te07","duration","correct","Corrige: Â«Je travaille pendant 2022 ici.Â»","Je travaille depuis 2022 ici","La acciÃ³n sigue en curso.","Depuis es necesario cuando el inicio estÃ¡ en el pasado y continÃºa."),
q("te08","duration","reorder","Ordena la frase.","Je suis restÃ© pendant une heure", "Empieza por el sujeto.", "La duraciÃ³n cerrada se expresa con pendant.",undefined,["une heure","pendant","Je","suis restÃ©"]),
q("te09","when","choice","Je lâ€™ai rencontrÃ© ___ trois jours.","il y a","Hecho pasado.","Il y a significa Â«haceÂ» y sitÃºa un hecho en el pasado.",["dans","il y a","jusquâ€™Ã ","dâ€™ici"]),
q("te10","when","fill","Le train arrive ___ dix minutes.","dans","Momento futuro.","Dans significa Â«dentro deÂ» con referencia al futuro."),
q("te11","when","choice","Je travaille ___ 18 heures aujourdâ€™hui.","jusquâ€™Ã ","Marca un lÃ­mite.","Jusquâ€™Ã  indica hasta quÃ© momento dura una acciÃ³n.",["depuis","jusquâ€™Ã ","il y a","en"]),
q("te12","when","fill","___ vendredi, envoyez-moi votre rÃ©ponse.","Dâ€™ici","Hay una fecha lÃ­mite.","Dâ€™ici vendredi significa antes de / de aquÃ­ al viernes."),
q("te13","when","translate","Traduce: Â«LleguÃ© hace una horaÂ».","Je suis arrivÃ© il y a une heure","Pasado + il y a.","Il y a se coloca despuÃ©s del verbo para una duraciÃ³n transcurrida."),
q("te14","when","correct","Corrige: Â«Je partirai il y a deux jours.Â»","Je partirai dans deux jours","El verbo estÃ¡ en futuro.","Dans, no il y a, acompaÃ±a una referencia futura."),
q("te15","when","choice","___ demain matin, nous devons finir le dossier.","Dâ€™ici","Hay un plazo.","Dâ€™ici presenta un lÃ­mite temporal futuro.",["Pendant","Depuis","Dâ€™ici","Il y a"]),
q("te16","when","reorder","Ordena la frase.","Le cours commence dans cinq minutes","El grupo temporal va al final.","Dans + duraciÃ³n sitÃºa un evento futuro.",undefined,["cinq minutes","commence","Le cours","dans"]),
q("te17","frequency","choice","Je lis ___ avant de dormir.","souvent","Es un hÃ¡bito frecuente.","Souvent expresa frecuencia alta, no continuidad.",["depuis","souvent","ensuite","donc"]),
q("te18","frequency","fill","Elle nâ€™oublie ___ son agenda.","jamais","Con negaciÃ³n francesa.","Jamais expresa Â«nuncaÂ» y se usa con ne en francÃ©s formal."),
q("te19","frequency","choice","___, nous allons au marchÃ© le samedi.","Dâ€™habitude","Habito normal.","Dâ€™habitude introduce una rutina habitual.",["Finalement","Dâ€™habitude","Il y a","Pour"]),
q("te20","frequency","fill","Ils voyagent ___, une ou deux fois par an.","rarement","Frecuencia baja.","Rarement equivale a rara vez."),
q("te21","frequency","translate","Traduce: Â«A veces trabajo tardeÂ».","Je travaille parfois tard","Adverbio despuÃ©s del verbo.","Parfois expresa una frecuencia ocasional."),
q("te22","frequency","correct","Corrige: Â«Je jamais ne mange dehors.Â»","Je ne mange jamais dehors","Ne va antes del verbo; jamais despuÃ©s.","La negaciÃ³n estÃ¡ndar es ne + verbo + jamais."),
q("te23","frequency","choice","Il arrive ___ Ã  lâ€™heure : câ€™est fiable.","toujours","Habito constante.","Toujours indica que algo ocurre siempre.",["parfois","toujours","rÃ©cemment","ensuite"]),
q("te24","frequency","reorder","Ordena la frase.","Nous sortons de temps en temps", "La expresiÃ³n va al final.", "De temps en temps indica frecuencia ocasional.",undefined,["de temps en temps","Nous","sortons"]),
q("te25","sequence","choice","___, expliquez votre idÃ©e principale.","Dâ€™abord","Primer paso.","Dâ€™abord abre una secuencia clara.",["Cependant","Dâ€™abord","Enfin","Pourtant"]),
q("te26","sequence","fill","___, ajoutez un exemple concret.","Ensuite","Segundo paso.","Ensuite permite continuar el desarrollo."),
q("te27","sequence","choice","Paul prÃ©parait le cafÃ©. ___, je mettais la table.","Pendant ce temps","Acciones simultÃ¡neas.","Pendant ce temps conecta dos acciones que ocurren a la vez.",["Finalement","Pendant ce temps","Donc","Depuis"]),
q("te28","sequence","fill","___, nous avons remerciÃ© tous les participants.","Enfin","Cierre de una secuencia.","Enfin presenta el Ãºltimo paso."),
q("te29","sequence","translate","Traduce: Â«Luego fuimos al museoÂ».","Puis nous sommes allÃ©s au musÃ©e","Conector + passÃ© composÃ©.","Puis organiza una sucesiÃ³n cronolÃ³gica."),
q("te30","sequence","correct","Corrige: Â«Dâ€™abord, finalement nous sommes partis.Â»","Finalement, nous sommes partis","No hay primer paso aquÃ­.","Finalement se usa para el resultado o la conclusiÃ³n, no junto a dâ€™abord."),
q("te31","sequence","choice","La rÃ©union a Ã©tÃ© longue ; ___, elle a Ã©tÃ© utile.","finalement","Resultado final.","Finalement resume el desenlace.",["depuis","finalement","rarement","pour"]),
q("te32","sequence","reorder","Ordena la frase.","Dâ€™abord nous avons choisi le sujet","Abre con el conector.","Dâ€™abord hace explÃ­cito el primer paso.",undefined,["le sujet","avons choisi","nous","Dâ€™abord"]),
q("te33","argument","choice","Le projet est intÃ©ressant ; ___, il est coÃ»teux.","cependant","Hay contraste.","Cependant introduce una oposiciÃ³n.",["donc","cependant","ainsi","Ã©galement"]),
q("te34","argument","fill","Il pleuvait ; ___, nous sommes sortis.","pourtant","Resultado contrario a lo esperado.","Pourtant seÃ±ala una contradicciÃ³n con la expectativa."),
q("te35","argument","choice","Le bus est moins cher, ___ il est plus Ã©cologique.","et","AÃ±ade un argumento.","AquÃ­ et aÃ±ade; Ã©galement tambiÃ©n puede aÃ±adir en otra estructura.",["cependant","donc","et","pourtant"]),
q("te36","argument","fill","Le centre est fermÃ© ; ___, il faut choisir un autre lieu.","donc","Consecuencia.","Donc introduce una conclusiÃ³n lÃ³gica."),
q("te37","argument","translate","Traduce: Â«Sin embargo, esta soluciÃ³n es ÃºtilÂ».","Cependant cette solution est utile","Conector al comienzo.","Cependant marca contraste sin cambiar el orden de la oraciÃ³n."),
q("te38","argument","correct","Corrige: Â«Donc, mais je prÃ©fÃ¨re rester.Â»","Cependant, je prÃ©fÃ¨re rester","Hay oposiciÃ³n, no consecuencia.","Cependant sustituye a la combinaciÃ³n incorrecta donc mais."),
q("te39","argument","choice","Jâ€™apprÃ©cie surtout les activitÃ©s culturelles, ___ les expositions.","notamment","Da un ejemplo preciso.","Notamment introduce un caso particular.",["ainsi","notamment","depuis","en"]),
q("te40","argument","reorder","Ordena la frase.","Ainsi nous pouvons rÃ©duire les coÃ»ts","Empieza por la consecuencia.","Ainsi introduce una consecuencia o resultado.",undefined,["rÃ©duire les coÃ»ts","nous pouvons","Ainsi"]),
q("te41","review","choice","___ deux mois que je cherche un appartement.","Ã‡a fait","Equivale a Â«hace dos meses queÂ».","Ã‡a faitâ€¦ que expresa duraciÃ³n que continÃºa.",["Pendant","Ã‡a fait","Dans","Enfin"]),
q("te42","review","fill","Je nâ€™ai pas vu LÃ©a ___ lundi.","depuis","La situaciÃ³n sigue hasta ahora.","Depuis sitÃºa el punto inicial de una situaciÃ³n actual."),
q("te43","review","choice","___ les vacances, jâ€™ai beaucoup dormi.","Pendant","Periodo terminado.","Pendant es correcto para un marco temporal cerrado.",["Depuis","Pendant","Dans","Dâ€™ici"]),
q("te44","review","fill","___ une semaine, je passerai lâ€™examen.","Dans","Futuro.","Dans une semaine sitÃºa el evento en el futuro."),
q("te45","review","choice","Le texte est clair ; ___, il manque un exemple.","nÃ©anmoins","Matiz de oposiciÃ³n.","NÃ©anmoins es un conector de contraste, mÃ¡s formal.",["ainsi","nÃ©anmoins","toujours","il y a"]),
q("te46","review","translate","Traduce: Â«Antes, vivÃ­a en Lyon; ahora vivo aquÃ­Â».","Auparavant, jâ€™habitais Ã  Lyon ; maintenant, jâ€™habite ici","Usa auparavant para Â«antesÂ».","Auparavant sitÃºa una realidad anterior en contraste con maintenant."),
q("te47","review","correct","Corrige: Â«Depuis trois heures, jâ€™ai Ã©tudiÃ©.Â»","Jâ€™Ã©tudie depuis trois heures","La acciÃ³n sigue ahora.","Con desde hace + acciÃ³n actual se usa el presente."),
q("te48","review","reorder","Ordena la frase.","RÃ©cemment jâ€™ai commencÃ© un cours de franÃ§ais","Adverbio temporal al inicio.","RÃ©cemment sitÃºa un hecho prÃ³ximo en el pasado.",undefined,["un cours de franÃ§ais","jâ€™ai commencÃ©","RÃ©cemment"]),
];

