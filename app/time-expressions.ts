export type TimeExercise = {
  id:string; lesson:string; mode:"choice"|"fill"|"reorder"|"translate"|"correct";
  prompt:string; answer:string; options?:string[]; tokens?:string[]; hint:string; explanation:string;
};
export type TimeLesson = {
  id:string; title:string; objective:string; summary:string;
  note:string; rows:[string,string,string][];
};

export const timeLessons:TimeLesson[]=[
  {id:"duration",title:"1 · Exprimer une durée",objective:"Elegir pendant, depuis, pour, en y durant.",note:"Pendant, depuis y pour no siempre son adverbios: se estudian juntos porque expresan relaciones temporales.",summary:"Depuis = empezó antes y continúa; pendant/durant = duración cerrada; pour = duración prevista; en = tiempo necesario.",rows:[["depuis","desde hace / desde","Je travaille depuis deux ans."],["pendant / durant","durante","J’ai étudié pendant deux heures."],["pour","por (duración prevista)","Je pars pour trois semaines."],["en","en (tiempo necesario)","Il a fini en dix minutes."]]},
  {id:"when",title:"2 · Situer une action",objective:"Decir cuándo ocurrió, ocurrirá o termina una acción.",note:"Il y a se refiere al pasado; dans, al futuro; d’ici marca un límite.",summary:"Il y a = hace; dans = dentro de; jusqu’à = hasta; d’ici = de aquí a / antes de.",rows:[["il y a","hace","Je suis arrivé il y a une heure."],["dans","dentro de","Le cours commence dans dix minutes."],["jusqu’à","hasta","Je reste jusqu’à vendredi."],["d’ici","de aquí a / antes de","D’ici demain, je terminerai."]]},
  {id:"frequency",title:"3 · Parler de fréquence",objective:"Expresar hábitos, frecuencia y continuidad.",note:"La posición suele ser después del verbo conjugado: Je travaille souvent.",summary:"Toujours = siempre; souvent = a menudo; parfois = a veces; rarement = rara vez; jamais = nunca.",rows:[["toujours","siempre","Elle arrive toujours tôt."],["souvent / parfois","a menudo / a veces","Nous sortons souvent."],["rarement / jamais","rara vez / nunca","Il ne voyage jamais."],["d’habitude","normalmente","D’habitude, je prends le métro."]]},
  {id:"sequence",title:"4 · Organiser un récit",objective:"Ordenar cronológicamente una historia.",note:"Los conectores hacen visible la estructura; son esenciales en una producción TCF.",summary:"D’abord abre; ensuite/puis desarrollan; pendant ce temps introduce simultaneidad; enfin/finalement cierran.",rows:[["d’abord","primero","D’abord, nous avons préparé le repas."],["ensuite / puis","después / luego","Ensuite, les invités sont arrivés."],["pendant ce temps","mientras tanto","Pendant ce temps, Paul décorait la salle."],["enfin / finalement","por último / finalmente","Enfin, nous sommes rentrés."]]},
  {id:"argument",title:"5 · Connecteurs pour le TCF",objective:"Matizar y organizar una opinión.",note:"Un conector no reemplaza una idea: úsalo para mostrar la relación entre dos frases.",summary:"Cependant/pourtant = oposición; donc/ainsi = consecuencia; également = adición; surtout/notamment = precisión.",rows:[["cependant / pourtant","sin embargo","Cependant, cette solution coûte cher."],["néanmoins","no obstante","Néanmoins, elle reste utile."],["donc / ainsi","por lo tanto / así","Ainsi, il faut agir."],["notamment / surtout","en particular / sobre todo","J’aime notamment les musées."]]},
  {id:"review",title:"6 · Révision générale",objective:"Elegir la expresión por el sentido, no por traducción literal.",note:"Lee toda la frase: ¿la acción continúa, termina, dura o está planificada?",summary:"Relee el contexto, identifica el tiempo y luego elige la expresión temporal o el conector.",rows:[["ça fait… que","hace… que","Ça fait deux ans que j’apprends."],["depuis","acción aún actual","Depuis lundi, il pleut."],["pendant","duración terminada","Pendant les vacances, j’ai lu."],["dans","momento futuro","Dans une semaine, je pars."]]},
];

const q=(id:string,lesson:string,mode:TimeExercise["mode"],prompt:string,answer:string,hint:string,explanation:string,options?:string[],tokens?:string[]):TimeExercise=>({id,lesson,mode,prompt,answer,hint,explanation,options,tokens});
export const timeExercises:TimeExercise[]=[
q("te01","duration","choice","J’apprends le français ___ deux ans et je continue.","depuis","La acción continúa hoy.","Depuis se utiliza porque comenzó antes y sigue ahora.",["pendant","depuis","pour","en"]),
q("te02","duration","fill","J’ai travaillé ___ trois heures hier.","pendant","Duración terminada.","Pendant expresa un periodo cerrado en el pasado."),
q("te03","duration","choice","Nous partons au Canada ___ six mois.","pour","Es una duración prevista.","Pour indica la duración que se proyecta.",["depuis","pour","en","il y a"]),
q("te04","duration","fill","Elle a terminé le rapport ___ vingt minutes.","en","Pregunta: ¿cuánto tardó?","En expresa el tiempo necesario para completar una acción."),
q("te05","duration","choice","___ la réunion, personne n’a utilisé son téléphone.","durant","Sinónimo más formal de pendant.","Durant funciona como pendant para una duración delimitada.",["depuis","durant","dans","d’ici"]),
q("te06","duration","translate","Traduce: «Estudié durante dos semanas».","J’ai étudié pendant deux semaines","Usa passé composé + pendant.","Pendant va con un período terminado."),
q("te07","duration","correct","Corrige: «Je travaille pendant 2022 ici.»","Je travaille depuis 2022 ici","La acción sigue en curso.","Depuis es necesario cuando el inicio está en el pasado y continúa."),
q("te08","duration","reorder","Ordena la frase.","Je suis resté pendant une heure", "Empieza por el sujeto.", "La duración cerrada se expresa con pendant.",undefined,["une heure","pendant","Je","suis resté"]),
q("te09","when","choice","Je l’ai rencontré ___ trois jours.","il y a","Hecho pasado.","Il y a significa «hace» y sitúa un hecho en el pasado.",["dans","il y a","jusqu’à","d’ici"]),
q("te10","when","fill","Le train arrive ___ dix minutes.","dans","Momento futuro.","Dans significa «dentro de» con referencia al futuro."),
q("te11","when","choice","Je travaille ___ 18 heures aujourd’hui.","jusqu’à","Marca un límite.","Jusqu’à indica hasta qué momento dura una acción.",["depuis","jusqu’à","il y a","en"]),
q("te12","when","fill","___ vendredi, envoyez-moi votre réponse.","D’ici","Hay una fecha límite.","D’ici vendredi significa antes de / de aquí al viernes."),
q("te13","when","translate","Traduce: «Llegué hace una hora».","Je suis arrivé il y a une heure","Pasado + il y a.","Il y a se coloca después del verbo para una duración transcurrida."),
q("te14","when","correct","Corrige: «Je partirai il y a deux jours.»","Je partirai dans deux jours","El verbo está en futuro.","Dans, no il y a, acompaña una referencia futura."),
q("te15","when","choice","___ demain matin, nous devons finir le dossier.","D’ici","Hay un plazo.","D’ici presenta un límite temporal futuro.",["Pendant","Depuis","D’ici","Il y a"]),
q("te16","when","reorder","Ordena la frase.","Le cours commence dans cinq minutes","El grupo temporal va al final.","Dans + duración sitúa un evento futuro.",undefined,["cinq minutes","commence","Le cours","dans"]),
q("te17","frequency","choice","Je lis ___ avant de dormir.","souvent","Es un hábito frecuente.","Souvent expresa frecuencia alta, no continuidad.",["depuis","souvent","ensuite","donc"]),
q("te18","frequency","fill","Elle n’oublie ___ son agenda.","jamais","Con negación francesa.","Jamais expresa «nunca» y se usa con ne en francés formal."),
q("te19","frequency","choice","___, nous allons au marché le samedi.","D’habitude","Habito normal.","D’habitude introduce una rutina habitual.",["Finalement","D’habitude","Il y a","Pour"]),
q("te20","frequency","fill","Ils voyagent ___, une ou deux fois par an.","rarement","Frecuencia baja.","Rarement equivale a rara vez."),
q("te21","frequency","translate","Traduce: «A veces trabajo tarde».","Je travaille parfois tard","Adverbio después del verbo.","Parfois expresa una frecuencia ocasional."),
q("te22","frequency","correct","Corrige: «Je jamais ne mange dehors.»","Je ne mange jamais dehors","Ne va antes del verbo; jamais después.","La negación estándar es ne + verbo + jamais."),
q("te23","frequency","choice","Il arrive ___ à l’heure : c’est fiable.","toujours","Habito constante.","Toujours indica que algo ocurre siempre.",["parfois","toujours","récemment","ensuite"]),
q("te24","frequency","reorder","Ordena la frase.","Nous sortons de temps en temps", "La expresión va al final.", "De temps en temps indica frecuencia ocasional.",undefined,["de temps en temps","Nous","sortons"]),
q("te25","sequence","choice","___, expliquez votre idée principale.","D’abord","Primer paso.","D’abord abre una secuencia clara.",["Cependant","D’abord","Enfin","Pourtant"]),
q("te26","sequence","fill","___, ajoutez un exemple concret.","Ensuite","Segundo paso.","Ensuite permite continuar el desarrollo."),
q("te27","sequence","choice","Paul préparait le café. ___, je mettais la table.","Pendant ce temps","Acciones simultáneas.","Pendant ce temps conecta dos acciones que ocurren a la vez.",["Finalement","Pendant ce temps","Donc","Depuis"]),
q("te28","sequence","fill","___, nous avons remercié tous les participants.","Enfin","Cierre de una secuencia.","Enfin presenta el último paso."),
q("te29","sequence","translate","Traduce: «Luego fuimos al museo».","Puis nous sommes allés au musée","Conector + passé composé.","Puis organiza una sucesión cronológica."),
q("te30","sequence","correct","Corrige: «D’abord, finalement nous sommes partis.»","Finalement, nous sommes partis","No hay primer paso aquí.","Finalement se usa para el resultado o la conclusión, no junto a d’abord."),
q("te31","sequence","choice","La réunion a été longue ; ___, elle a été utile.","finalement","Resultado final.","Finalement resume el desenlace.",["depuis","finalement","rarement","pour"]),
q("te32","sequence","reorder","Ordena la frase.","D’abord nous avons choisi le sujet","Abre con el conector.","D’abord hace explícito el primer paso.",undefined,["le sujet","avons choisi","nous","D’abord"]),
q("te33","argument","choice","Le projet est intéressant ; ___, il est coûteux.","cependant","Hay contraste.","Cependant introduce una oposición.",["donc","cependant","ainsi","également"]),
q("te34","argument","fill","Il pleuvait ; ___, nous sommes sortis.","pourtant","Resultado contrario a lo esperado.","Pourtant señala una contradicción con la expectativa."),
q("te35","argument","choice","Le bus est moins cher, ___ il est plus écologique.","et","Añade un argumento.","Aquí et añade; également también puede añadir en otra estructura.",["cependant","donc","et","pourtant"]),
q("te36","argument","fill","Le centre est fermé ; ___, il faut choisir un autre lieu.","donc","Consecuencia.","Donc introduce una conclusión lógica."),
q("te37","argument","translate","Traduce: «Sin embargo, esta solución es útil».","Cependant cette solution est utile","Conector al comienzo.","Cependant marca contraste sin cambiar el orden de la oración."),
q("te38","argument","correct","Corrige: «Donc, mais je préfère rester.»","Cependant, je préfère rester","Hay oposición, no consecuencia.","Cependant sustituye a la combinación incorrecta donc mais."),
q("te39","argument","choice","J’apprécie surtout les activités culturelles, ___ les expositions.","notamment","Da un ejemplo preciso.","Notamment introduce un caso particular.",["ainsi","notamment","depuis","en"]),
q("te40","argument","reorder","Ordena la frase.","Ainsi nous pouvons réduire les coûts","Empieza por la consecuencia.","Ainsi introduce una consecuencia o resultado.",undefined,["réduire les coûts","nous pouvons","Ainsi"]),
q("te41","review","choice","___ deux mois que je cherche un appartement.","Ça fait","Equivale a «hace dos meses que».","Ça fait… que expresa duración que continúa.",["Pendant","Ça fait","Dans","Enfin"]),
q("te42","review","fill","Je n’ai pas vu Léa ___ lundi.","depuis","La situación sigue hasta ahora.","Depuis sitúa el punto inicial de una situación actual."),
q("te43","review","choice","___ les vacances, j’ai beaucoup dormi.","Pendant","Periodo terminado.","Pendant es correcto para un marco temporal cerrado.",["Depuis","Pendant","Dans","D’ici"]),
q("te44","review","fill","___ une semaine, je passerai l’examen.","Dans","Futuro.","Dans une semaine sitúa el evento en el futuro."),
q("te45","review","choice","Le texte est clair ; ___, il manque un exemple.","néanmoins","Matiz de oposición.","Néanmoins es un conector de contraste, más formal.",["ainsi","néanmoins","toujours","il y a"]),
q("te46","review","translate","Traduce: «Antes, vivía en Lyon; ahora vivo aquí».","Auparavant, j’habitais à Lyon ; maintenant, j’habite ici","Usa auparavant para «antes».","Auparavant sitúa una realidad anterior en contraste con maintenant."),
q("te47","review","correct","Corrige: «Depuis trois heures, j’ai étudié.»","J’étudie depuis trois heures","La acción sigue ahora.","Con desde hace + acción actual se usa el presente."),
q("te48","review","reorder","Ordena la frase.","Récemment j’ai commencé un cours de français","Adverbio temporal al inicio.","Récemment sitúa un hecho próximo en el pasado.",undefined,["un cours de français","j’ai commencé","Récemment"]),
];
