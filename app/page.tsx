"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { courseExercises, lessons, tcfDrills, tcfPromptBank } from "./curriculum";
import { stories } from "./stories";
import { lexicalPatterns, subjectLabels, type Subject, type Tense, verbs } from "./verbs";
import { identify, loadCloudState, readSession, saveCloudState, sendMagicLink, supabaseConfigured, type CloudSession } from "./supabase-client";
import { timeExercises, timeLessons } from "./time-expressions";

type Card = { id: string; level: "A1" | "A2"; unit: string; type: "vocabulaire" | "structure" | "prononciation"; prompt: string; answer: string; hint: string; translationEn?: string; translationEs?: string };
type Memory = Record<string, { due: number; interval: number; ease: number; reviews: number }>;
type SavedProgress = { memory: Memory; streak: number; todayReviews: number };
type RecognitionEventLike = { results: { [key: number]: { [key: number]: { transcript: string } } } };
type RecognitionLike = { lang: string; interimResults: boolean; onstart: () => void; onend: () => void; onresult: (event: RecognitionEventLike) => void; onerror: () => void; start: () => void };
type PracticeCategory = "verbes" | "nombres" | "jours" | "mois";
type PracticeItem = { sentence: string; answer: string; cue: string; infinitive?: string; en?: string; es?: string };
type TcfTaskId = "tache1" | "tache2" | "tache3";
type TcfTask = { id: TcfTaskId; number: string; title: string; words: string; min: number; max: number; goal: string; steps: string[]; phrases: string[]; topics: string[] };

const cards: Card[] = [
  {id:"a1-01",level:"A1",unit:"Premiers repères",type:"vocabulaire",prompt:"lunes",answer:"lundi",hint:"Les jours de la semaine"},
  {id:"a1-02",level:"A1",unit:"Premiers repères",type:"vocabulaire",prompt:"miércoles",answer:"mercredi",hint:"Les jours de la semaine"},
  {id:"a1-03",level:"A1",unit:"Premiers repères",type:"vocabulaire",prompt:"enero",answer:"janvier",hint:"Les mois de l’année"},
  {id:"a1-04",level:"A1",unit:"Premiers repères",type:"vocabulaire",prompt:"ochenta",answer:"quatre-vingts",hint:"Les nombres"},
  {id:"a1-05",level:"A1",unit:"Premiers repères",type:"structure",prompt:"¿Qué día es hoy?",answer:"Quel jour sommes-nous ?",hint:"La date"},
  {id:"a1-06",level:"A1",unit:"Premiers repères",type:"prononciation",prompt:"Escucha y repite",answer:"aujourd’hui",hint:"El sonido /ʒ/ aparece dos veces"},
  {id:"a1-07",level:"A1",unit:"Se présenter",type:"structure",prompt:"Me llamo Alice.",answer:"Je m’appelle Alice.",hint:"Présentation de soi"},
  {id:"a1-08",level:"A1",unit:"Se présenter",type:"structure",prompt:"Soy canadiense.",answer:"Je suis canadienne.",hint:"Être + nationalité"},
  {id:"a1-09",level:"A1",unit:"Se présenter",type:"vocabulaire",prompt:"un profesor / una profesora",answer:"un professeur / une professeure",hint:"La profession"},
  {id:"a1-10",level:"A1",unit:"Se présenter",type:"structure",prompt:"Ella es amable.",answer:"Elle est gentille.",hint:"Adjectif au féminin"},
  {id:"a1-11",level:"A1",unit:"Se présenter",type:"structure",prompt:"Vivo en Montreal.",answer:"J’habite à Montréal.",hint:"Préposition + ville"},
  {id:"a1-12",level:"A1",unit:"Se présenter",type:"structure",prompt:"Voy a casa de Paul.",answer:"Je vais chez Paul.",hint:"Chez + personne"},
  {id:"a1-13",level:"A1",unit:"Se présenter",type:"structure",prompt:"Es mi libro.",answer:"C’est mon livre.",hint:"Le possessif"},
  {id:"a1-14",level:"A1",unit:"Se présenter",type:"structure",prompt:"Son las tres y cuarto.",answer:"Il est trois heures et quart.",hint:"L’heure"},
  {id:"a1-15",level:"A1",unit:"Avoir & demander",type:"structure",prompt:"Tengo 30 años.",answer:"J’ai trente ans.",hint:"En français, on utilise avoir"},
  {id:"a1-16",level:"A1",unit:"Avoir & demander",type:"structure",prompt:"No tengo automóvil.",answer:"Je n’ai pas de voiture.",hint:"Négation : pas de"},
  {id:"a1-17",level:"A1",unit:"Avoir & demander",type:"structure",prompt:"¿Dónde trabajas?",answer:"Où est-ce que tu travailles ?",hint:"L’interrogation"},
  {id:"a1-18",level:"A1",unit:"Avoir & demander",type:"structure",prompt:"¿Por qué estudias francés?",answer:"Pourquoi est-ce que tu étudies le français ?",hint:"Mot interrogatif"},
  {id:"a1-19",level:"A1",unit:"Avoir & demander",type:"vocabulaire",prompt:"algo de pan",answer:"du pain",hint:"Article partitif masculin"},
  {id:"a1-20",level:"A1",unit:"Avoir & demander",type:"vocabulaire",prompt:"algo de agua",answer:"de l’eau",hint:"Article partitif devant voyelle"},
  {id:"a1-21",level:"A1",unit:"La cuisine",type:"vocabulaire",prompt:"cortar las verduras",answer:"couper les légumes",hint:"À la cuisine"},
  {id:"a1-22",level:"A1",unit:"La cuisine",type:"vocabulaire",prompt:"cocinar / hacer cocer",answer:"faire cuire",hint:"À la cuisine"},
  {id:"a1-23",level:"A1",unit:"La cuisine",type:"structure",prompt:"Comemos en casa.",answer:"Nous mangeons à la maison.",hint:"Verbe en -ER"},
  {id:"a1-24",level:"A1",unit:"La cuisine",type:"prononciation",prompt:"Escucha y distingue: u / ou",answer:"tu — tout",hint:"Labios muy redondeados para /y/"},
  {id:"a2-01",level:"A2",unit:"Pouvoir, vouloir, devoir",type:"structure",prompt:"Puedo ayudarte.",answer:"Je peux t’aider.",hint:"Pouvoir au présent"},
  {id:"a2-02",level:"A2",unit:"Pouvoir, vouloir, devoir",type:"structure",prompt:"Quisiera un café.",answer:"Je voudrais un café.",hint:"Demande polie"},
  {id:"a2-03",level:"A2",unit:"Pouvoir, vouloir, devoir",type:"structure",prompt:"Debemos salir ahora.",answer:"Nous devons partir maintenant.",hint:"Devoir au présent"},
  {id:"a2-04",level:"A2",unit:"Pouvoir, vouloir, devoir",type:"structure",prompt:"¿Puede repetir, por favor?",answer:"Pouvez-vous répéter, s’il vous plaît ?",hint:"Demander un service"},
  {id:"a2-05",level:"A2",unit:"Pouvoir, vouloir, devoir",type:"structure",prompt:"¿Dónde puedo encontrar información?",answer:"Où puis-je trouver des renseignements ?",hint:"Obtenir de l’information"},
  {id:"a2-06",level:"A2",unit:"Verbes au présent",type:"structure",prompt:"Elegimos el tren.",answer:"Nous choisissons le train.",hint:"Choisir au présent"},
  {id:"a2-07",level:"A2",unit:"Verbes au présent",type:"structure",prompt:"Terminan a las cinco.",answer:"Ils finissent à cinq heures.",hint:"Finir au présent"},
  {id:"a2-08",level:"A2",unit:"Verbes au présent",type:"structure",prompt:"Tomo el autobús.",answer:"Je prends l’autobus.",hint:"Prendre au présent"},
  {id:"a2-09",level:"A2",unit:"Verbes au présent",type:"structure",prompt:"Ella viene mañana.",answer:"Elle vient demain.",hint:"Venir au présent"},
  {id:"a2-10",level:"A2",unit:"Verbes au présent",type:"structure",prompt:"No entiendo la pregunta.",answer:"Je ne comprends pas la question.",hint:"Négation"},
  {id:"a2-11",level:"A2",unit:"Plans & pronoms",type:"structure",prompt:"Vamos al mercado.",answer:"Nous allons au marché.",hint:"Aller au présent"},
  {id:"a2-12",level:"A2",unit:"Plans & pronoms",type:"structure",prompt:"Voy a llamar a Marie.",answer:"Je vais appeler Marie.",hint:"Futur proche"},
  {id:"a2-13",level:"A2",unit:"Plans & pronoms",type:"structure",prompt:"Lo conozco.",answer:"Je le connais.",hint:"Pronom complément direct"},
  {id:"a2-14",level:"A2",unit:"Plans & pronoms",type:"structure",prompt:"Le hablo.",answer:"Je lui parle.",hint:"Pronom complément indirect"},
  {id:"a2-15",level:"A2",unit:"Plans & pronoms",type:"structure",prompt:"Los invitamos mañana.",answer:"Nous les invitons demain.",hint:"Pronom avant le verbe"},
  {id:"a2-16",level:"A2",unit:"Temps & comparaison",type:"structure",prompt:"Trabajo desde hace dos años.",answer:"Je travaille depuis deux ans.",hint:"Action toujours en cours"},
  {id:"a2-17",level:"A2",unit:"Temps & comparaison",type:"structure",prompt:"Me voy por tres semanas.",answer:"Je pars pour trois semaines.",hint:"Durée prévue"},
  {id:"a2-18",level:"A2",unit:"Temps & comparaison",type:"structure",prompt:"Este libro es más interesante.",answer:"Ce livre est plus intéressant.",hint:"Comparatif"},
  {id:"a2-19",level:"A2",unit:"Temps & comparaison",type:"structure",prompt:"Es la ciudad más grande.",answer:"C’est la plus grande ville.",hint:"Superlatif"},
  {id:"a2-20",level:"A2",unit:"Temps & comparaison",type:"structure",prompt:"Me levanto a las siete.",answer:"Je me lève à sept heures.",hint:"Verbe pronominal"},
  {id:"a2-21",level:"A2",unit:"Le passé composé",type:"structure",prompt:"He terminado mi trabajo.",answer:"J’ai fini mon travail.",hint:"Avoir + participe passé"},
  {id:"a2-22",level:"A2",unit:"Le passé composé",type:"structure",prompt:"Vimos la película.",answer:"Nous avons vu le film.",hint:"Participe passé irrégulier"},
  {id:"a2-23",level:"A2",unit:"Le passé composé",type:"structure",prompt:"Ella llegó ayer.",answer:"Elle est arrivée hier.",hint:"Être + accord au féminin"},
  {id:"a2-24",level:"A2",unit:"Le passé composé",type:"structure",prompt:"No salieron.",answer:"Ils ne sont pas sortis.",hint:"Négation autour de l’auxiliaire"},
  {id:"a2-25",level:"A2",unit:"Le passé composé",type:"prononciation",prompt:"Escucha y repite",answer:"J’ai eu beaucoup de travail.",hint:"Enchaîne : j’ai‿eu"},
];

const verbCards: Card[] = [
  {id:"verb-01",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"être",answer:"être",hint:"Verbe essentiel",translationEn:"to be",translationEs:"ser / estar"},
  {id:"verb-02",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"avoir",answer:"avoir",hint:"Verbe essentiel",translationEn:"to have",translationEs:"tener"},
  {id:"verb-03",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"aller",answer:"aller",hint:"Verbe essentiel",translationEn:"to go",translationEs:"ir"},
  {id:"verb-04",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"pouvoir",answer:"pouvoir",hint:"Verbe essentiel",translationEn:"can / to be able to",translationEs:"poder"},
  {id:"verb-05",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"vouloir",answer:"vouloir",hint:"Verbe essentiel",translationEn:"to want",translationEs:"querer"},
  {id:"verb-06",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"devoir",answer:"devoir",hint:"Verbe essentiel",translationEn:"must / to have to",translationEs:"deber / tener que"},
  {id:"verb-07",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"finir",answer:"finir",hint:"Verbe essentiel",translationEn:"to finish",translationEs:"terminar"},
  {id:"verb-08",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"choisir",answer:"choisir",hint:"Verbe essentiel",translationEn:"to choose",translationEs:"elegir"},
  {id:"verb-09",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"prendre",answer:"prendre",hint:"Verbe essentiel",translationEn:"to take",translationEs:"tomar"},
  {id:"verb-10",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"venir",answer:"venir",hint:"Verbe essentiel",translationEn:"to come",translationEs:"venir"},
  {id:"verb-11",level:"A2",unit:"Verbes essentiels",type:"vocabulaire",prompt:"comprendre",answer:"comprendre",hint:"Verbe essentiel",translationEn:"to understand",translationEs:"comprender"},
  {id:"verb-12",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"parler",answer:"parler",hint:"Verbe essentiel",translationEn:"to speak",translationEs:"hablar"},
  {id:"verb-13",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"manger",answer:"manger",hint:"Verbe essentiel",translationEn:"to eat",translationEs:"comer"},
  {id:"verb-14",level:"A2",unit:"Verbes essentiels",type:"vocabulaire",prompt:"se lever",answer:"se lever",hint:"Verbe pronominal",translationEn:"to get up",translationEs:"levantarse"},
  {id:"verb-15",level:"A1",unit:"Verbes essentiels",type:"vocabulaire",prompt:"faire",answer:"faire",hint:"Verbe essentiel",translationEn:"to do / to make",translationEs:"hacer"},
];

const practiceSets: Record<PracticeCategory, PracticeItem[]> = {
  verbes: [
    {sentence:"Je ___ canadienne.",answer:"suis",cue:"être · je",infinitive:"être",en:"to be",es:"ser / estar"},
    {sentence:"Nous ___ un cours demain.",answer:"avons",cue:"avoir · nous",infinitive:"avoir",en:"to have",es:"tener"},
    {sentence:"Tu ___ au marché le samedi.",answer:"vas",cue:"aller · tu",infinitive:"aller",en:"to go",es:"ir"},
    {sentence:"Vous ___ répéter, s’il vous plaît ?",answer:"pouvez",cue:"pouvoir · vous",infinitive:"pouvoir",en:"can / to be able to",es:"poder"},
    {sentence:"Ils ___ apprendre le français.",answer:"veulent",cue:"vouloir · ils",infinitive:"vouloir",en:"to want",es:"querer"},
    {sentence:"Je ___ partir maintenant.",answer:"dois",cue:"devoir · je",infinitive:"devoir",en:"must / to have to",es:"deber / tener que"},
    {sentence:"Elle ___ son travail à cinq heures.",answer:"finit",cue:"finir · elle",infinitive:"finir",en:"to finish",es:"terminar"},
    {sentence:"Nous ___ le train.",answer:"choisissons",cue:"choisir · nous",infinitive:"choisir",en:"to choose",es:"elegir"},
    {sentence:"Je ___ l’autobus chaque matin.",answer:"prends",cue:"prendre · je",infinitive:"prendre",en:"to take",es:"tomar"},
    {sentence:"Marie ___ demain soir.",answer:"vient",cue:"venir · elle",infinitive:"venir",en:"to come",es:"venir"},
    {sentence:"Vous ___ la question ?",answer:"comprenez",cue:"comprendre · vous",infinitive:"comprendre",en:"to understand",es:"comprender"},
    {sentence:"Nous ___ français à la maison.",answer:"parlons",cue:"parler · nous",infinitive:"parler",en:"to speak",es:"hablar"},
    {sentence:"Tu ___ avec tes amis.",answer:"manges",cue:"manger · tu",infinitive:"manger",en:"to eat",es:"comer"},
    {sentence:"Je me ___ à sept heures.",answer:"lève",cue:"se lever · je",infinitive:"se lever",en:"to get up",es:"levantarse"},
    {sentence:"Ils ___ la cuisine ensemble.",answer:"font",cue:"faire · ils",infinitive:"faire",en:"to do / to make",es:"hacer"},
  ],
  nombres: [
    {sentence:"J’ai ___ ans.",answer:"dix-huit",cue:"18"},{sentence:"Nous sommes ___ personnes.",answer:"vingt",cue:"20"},
    {sentence:"Le billet coûte ___ dollars.",answer:"trente",cue:"30"},{sentence:"Il y a ___ étudiants.",answer:"quarante",cue:"40"},
    {sentence:"Elle a ___ livres.",answer:"cinquante",cue:"50"},{sentence:"Le voyage dure ___ minutes.",answer:"soixante",cue:"60"},
    {sentence:"La salle compte ___ places.",answer:"soixante-dix",cue:"70"},{sentence:"Mon grand-père a ___ ans.",answer:"quatre-vingts",cue:"80"},
    {sentence:"Le train roule à ___ kilomètres-heure.",answer:"quatre-vingt-dix",cue:"90"},{sentence:"Le livre a ___ pages.",answer:"cent",cue:"100"},
    {sentence:"Nous avons ___ rendez-vous.",answer:"deux",cue:"2"},{sentence:"Elle travaille ___ jours.",answer:"cinq",cue:"5"},
    {sentence:"Il est ___ heures.",answer:"huit",cue:"8"},{sentence:"Le cours commence à ___ heures.",answer:"neuf",cue:"9"},
    {sentence:"J’habite au numéro ___.",answer:"douze",cue:"12"},{sentence:"Le mois a ___ jours.",answer:"trente et un",cue:"31"},
  ],
  jours: [
    {sentence:"La semaine commence le ___.",answer:"lundi",cue:"lunes"},{sentence:"Après lundi, c’est ___.",answer:"mardi",cue:"martes"},
    {sentence:"Le milieu de la semaine est ___.",answer:"mercredi",cue:"miércoles"},{sentence:"Après mercredi, c’est ___.",answer:"jeudi",cue:"jueves"},
    {sentence:"Le dernier jour de travail est souvent ___.",answer:"vendredi",cue:"viernes"},{sentence:"Le week-end commence le ___.",answer:"samedi",cue:"sábado"},
    {sentence:"Le jour avant lundi est ___.",answer:"dimanche",cue:"domingo"},
  ],
  mois: [
    {sentence:"L’année commence en ___.",answer:"janvier",cue:"enero"},{sentence:"Le mois après janvier est ___.",answer:"février",cue:"febrero"},
    {sentence:"Le printemps commence en ___.",answer:"mars",cue:"marzo"},{sentence:"Après mars, c’est ___.",answer:"avril",cue:"abril"},
    {sentence:"Le mois avant juin est ___.",answer:"mai",cue:"mayo"},{sentence:"L’été commence en ___.",answer:"juin",cue:"junio"},
    {sentence:"La fête du Canada est en ___.",answer:"juillet",cue:"julio"},{sentence:"Après juillet, c’est ___.",answer:"août",cue:"agosto"},
    {sentence:"Les cours reprennent en ___.",answer:"septembre",cue:"septiembre"},{sentence:"L’Halloween est en ___.",answer:"octobre",cue:"octubre"},
    {sentence:"Après octobre, c’est ___.",answer:"novembre",cue:"noviembre"},{sentence:"Noël est en ___.",answer:"décembre",cue:"diciembre"},
  ],
};

const practiceMeta: Record<PracticeCategory,{title:string;icon:string;description:string}> = {
  verbes:{title:"Verbes",icon:"V",description:"Conjuguez dans une phrase"},
  nombres:{title:"Nombres",icon:"12",description:"Écrivez les nombres en lettres"},
  jours:{title:"Jours",icon:"J",description:"Retrouvez les jours de la semaine"},
  mois:{title:"Mois",icon:"M",description:"Complétez les mois de l’année"},
};

const tcfTasks: TcfTask[] = [
  {id:"tache1",number:"01",title:"Le message",words:"60 à 120 mots",min:60,max:120,goal:"Raconter, décrire ou expliquer clairement à un destinataire précis.",steps:["Salutation et objet du message","Annonce rapide de la raison","Informations utiles et détails concrets","Invitation à répondre","Formule finale et signature"],phrases:["Je t’écris pour te parler de…","Que dirais-tu de… ?","Je te recommande vivement de…","Fais-moi savoir ce que tu en penses.","N’hésite pas à m’écrire.","À très bientôt,"],topics:["Invitez des amis à une fête de fin d’examens avec une date, un lieu et un thème.","Proposez un pique-nique et précisez le programme et ce que chacun doit apporter.","Conseillez un ami qui souhaite améliorer son français.","Recommandez une activité culturelle découverte récemment.","Écrivez à un voisin pour résoudre poliment un problème de bruit.","Cherchez un colocataire et présentez le logement et vos attentes.","Invitez un groupe à participer à une action écologique.","Demandez des conseils pour préparer un voyage au Canada."]},
  {id:"tache2",number:"02",title:"Le récit",words:"120 à 150 mots",min:120,max:150,goal:"Raconter une expérience, exprimer ses impressions et donner envie de la découvrir.",steps:["Titre accrocheur","Introduction et contexte","Déroulement en plusieurs étapes","Moment marquant et émotions","Conclusion et recommandation"],phrases:["Récemment, j’ai eu l’occasion de…","Tout d’abord… Ensuite… Enfin…","Ce qui m’a particulièrement marqué, c’est…","À ma grande surprise…","Cette expérience m’a permis de…","Je recommande vivement cette activité."],topics:["Racontez une randonnée mémorable dans un parc canadien.","Présentez un atelier créatif qui vous a surpris.","Décrivez une semaine avec moins d’écrans et ses effets.","Partagez une expérience de bénévolat enrichissante.","Racontez la découverte d’un marché ou d’un restaurant original.","Présentez une activité écologique utile à votre quartier.","Décrivez une exposition ou un festival qui vous a marqué.","Racontez une activité sportive essayée pour la première fois."]},
  {id:"tache3",number:"03",title:"Synthèse & opinion",words:"120 à 180 mots",min:120,max:180,goal:"Résumer deux points de vue sans juger, puis défendre une position personnelle nuancée.",steps:["Titre pertinent","Synthèse neutre des deux documents (40 à 60 mots)","Position personnelle claire (80 à 120 mots)","Arguments et exemple concret","Nuance, solution et conclusion"],phrases:["La question de… divise les opinions.","D’un côté, le premier document…","En revanche, le second souligne…","À mon avis…","Il est vrai que…, mais…","En somme…"],topics:["Les animaux domestiques sont-ils bénéfiques à la vie de famille ?","Les devoirs après la classe sont-ils vraiment nécessaires ?","La micro-sieste devrait-elle être autorisée en entreprise ?","Les jeux vidéo enrichissent-ils le quotidien des enfants ?","Le télétravail améliore-t-il durablement la vie professionnelle ?","Faut-il proposer davantage de repas végétariens à la cantine ?","Les réseaux sociaux devraient-ils être davantage limités ?","La vie en colocation apporte-t-elle plus d’avantages que de contraintes ?"]},
];

const day = 86400000;
const defaultMemory = (): Memory[string] => ({ due: 0, interval: 0, ease: 2.5, reviews: 0 });
export default function Home() {
  const [now] = useState(() => Date.now());
  const [view, setView] = useState<"home"|"learn"|"stories"|"study"|"practice"|"verbs"|"tcf"|"time"|"themes"|"progress">("home");
  const [level, setLevel] = useState<"Tous"|"A1"|"A2"|"Verbes">("Tous");
  const [memory, setMemory] = useState<Memory>({});
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [heard, setHeard] = useState("");
  const [speechTarget, setSpeechTarget] = useState("");
  const [listening, setListening] = useState(false);
  const [audioStatus, setAudioStatus] = useState("");
  const [streak, setStreak] = useState(0);
  const [todayReviews, setTodayReviews] = useState(0);
  const [practiceCategory, setPracticeCategory] = useState<PracticeCategory>("verbes");
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceInput, setPracticeInput] = useState("");
  const [practiceResult, setPracticeResult] = useState<"correct"|"wrong"|null>(null);
  const [meaningLang, setMeaningLang] = useState<"en"|"es"|null>(null);
  const [practiceScore, setPracticeScore] = useState({correct:0,total:0});
  const [verbId, setVerbId] = useState("parler");
  const [verbSubject, setVerbSubject] = useState<Subject>("je");
  const [verbTense, setVerbTense] = useState<Tense>("présent");
  const [verbAnswer, setVerbAnswer] = useState("");
  const [verbResult, setVerbResult] = useState<"correct"|"wrong"|null>(null);
  const [verbStats, setVerbStats] = useState({correct:0,total:0});
  const [cloudSession, setCloudSession] = useState<CloudSession|null>(null);
  const [cloudEmail, setCloudEmail] = useState("");
  const [cloudStatus, setCloudStatus] = useState("");
  const [learnLevel, setLearnLevel] = useState<"A1"|"A2"|"B1">("A1");
  const [lessonId, setLessonId] = useState("a1-alphabet");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [practiceTrack, setPracticeTrack] = useState<"course"|"reflexes">("course");
  const [courseLevel, setCourseLevel] = useState<"Tous"|"A1"|"A2"|"B1">("Tous");
  const [courseIndex, setCourseIndex] = useState(0);
  const [courseInput, setCourseInput] = useState("");
  const [courseResult, setCourseResult] = useState<"correct"|"wrong"|null>(null);
  const [courseSelected, setCourseSelected] = useState<number[]>([]);
  const [courseStats, setCourseStats] = useState({correct:0,total:0});
  const [storyLevel, setStoryLevel] = useState<"Tous"|"A1"|"A2"|"A2+">("Tous");
  const [storyId, setStoryId] = useState(stories[0].id);
  const [storyTranslation, setStoryTranslation] = useState(false);
  const [storyVerbs, setStoryVerbs] = useState(true);
  const [storySentenceIndex, setStorySentenceIndex] = useState(0);
  const [storyRecall, setStoryRecall] = useState("");
  const [storyRecallResult, setStoryRecallResult] = useState<"correct"|"wrong"|null>(null);
  const [completedStories, setCompletedStories] = useState<string[]>([]);
  const [tcfTaskId, setTcfTaskId] = useState<TcfTaskId>("tache1");
  const [tcfTopic, setTcfTopic] = useState(0);
  const [tcfDrafts, setTcfDrafts] = useState<Partial<Record<TcfTaskId,string>>>({});
  const [tcfChecks, setTcfChecks] = useState([false,false,false,false]);
  const [tcfMode, setTcfMode] = useState<"method"|"guided"|"write"|"simulate">("method");
  const [tcfDrillIndex, setTcfDrillIndex] = useState(0);
  const [tcfDrillAnswer, setTcfDrillAnswer] = useState("");
  const [simulationDrafts, setSimulationDrafts] = useState(["","",""]);
  const [timeLessonId,setTimeLessonId]=useState("duration");
  const [timeIndex,setTimeIndex]=useState(0);
  const [timeAnswer,setTimeAnswer]=useState("");
  const [timeResult,setTimeResult]=useState<"correct"|"wrong"|null>(null);
  const [timeTokens,setTimeTokens]=useState<string[]>([]);
  const [timeAttempts,setTimeAttempts]=useState(0);
  const [timeWrongIds,setTimeWrongIds]=useState<string[]>([]);
  const [timeOnlyErrors,setTimeOnlyErrors]=useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("bravo-memoire") || "") as SavedProgress;
        setMemory(saved.memory || {}); setStreak(saved.streak || 0); setTodayReviews(saved.todayReviews || 0);
      } catch { /* A fresh start is valid. */ }
      try { setTcfDrafts(JSON.parse(localStorage.getItem("bravo-tcf-drafts") || "{}")); } catch { /* Drafts are optional. */ }
      try { setCompletedLessons(JSON.parse(localStorage.getItem("bravo-lessons") || "[]")); } catch { /* Lesson progress is optional. */ }
      try { setCourseStats(JSON.parse(localStorage.getItem("bravo-course-stats") || '{"correct":0,"total":0}')); } catch { /* Exercise stats are optional. */ }
      try { setCompletedStories(JSON.parse(localStorage.getItem("bravo-stories") || "[]")); } catch { /* Story progress is optional. */ }
      try { setVerbStats(JSON.parse(localStorage.getItem("bravo-verb-stats") || '{"correct":0,"total":0}')); } catch { /* Verb stats are optional. */ }
      try { setTimeWrongIds(JSON.parse(localStorage.getItem("bravo-time-errors") || "[]")); } catch { /* Time errors are optional. */ }
      const savedSession = readSession();
      if (savedSession) identify(savedSession).then(async session => {
        if (!session) return;
        setCloudSession(session);
        const state = await loadCloudState(session).catch(() => null);
        const hydrationKey=`bravo-supabase-loaded-${session.user.id}`;
        if (state && !sessionStorage.getItem(hydrationKey)) { Object.entries(state).forEach(([key, value]) => localStorage.setItem(key, value)); sessionStorage.setItem(hydrationKey,"1"); window.location.reload(); }
      }).catch(() => {});
    });
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  const studyCards = useMemo(() => {
    const filtered = level === "Verbes" ? verbCards : level === "Tous" ? cards : cards.filter(c => c.level === level);
    return [...filtered].sort((a,b) => (memory[a.id]?.due ?? 0) - (memory[b.id]?.due ?? 0));
  }, [level, memory]);
  const card = studyCards[index % studyCards.length];
  const learned = cards.filter(c => (memory[c.id]?.reviews || 0) >= 2).length;
  const due = cards.filter(c => (memory[c.id]?.due || 0) <= now).length;
  const percent = Math.round((learned / cards.length) * 100);
  const dayLabel = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(now).toUpperCase();

  function persist(next: Memory, reviews = todayReviews + 1) {
    const nextStreak = reviews === 1 ? Math.max(streak, 1) : streak;
    setMemory(next); setTodayReviews(reviews); setStreak(nextStreak);
    localStorage.setItem("bravo-memoire", JSON.stringify({memory:next, todayReviews:reviews, streak:nextStreak}));
    queueCloudSync();
  }
  function queueCloudSync() {
    window.setTimeout(() => {
      if (!cloudSession) return;
      const keys=["bravo-memoire","bravo-lessons","bravo-stories","bravo-course-stats","bravo-verb-stats","bravo-learning-record","bravo-tcf-drafts","bravo-time-errors"];
      const payload=Object.fromEntries(keys.map(key=>[key,localStorage.getItem(key)||""]));
      saveCloudState(cloudSession,payload).then(()=>setCloudStatus("Progreso sincronizado")).catch(()=>setCloudStatus("No se pudo sincronizar todavía"));
    },0);
  }
  async function connectCloud(event: React.FormEvent) {
    event.preventDefault(); if (!cloudEmail.trim()) return;
    try { await sendMagicLink(cloudEmail.trim()); setCloudStatus("Revisa tu correo: te envié un enlace para entrar."); }
    catch { setCloudStatus("No pude enviar el enlace. Revisa la configuración de Supabase."); }
  }
  function rate(quality: 1|3|5) {
    const old = memory[card.id] || defaultMemory();
    const interval = quality === 1 ? 0 : old.reviews === 0 ? 1 : old.reviews === 1 ? 3 : Math.max(1, Math.round(old.interval * (quality === 5 ? old.ease : 1.25)));
    const ease = Math.max(1.3, old.ease + (quality === 1 ? -0.2 : quality === 5 ? 0.1 : 0));
    persist({...memory, [card.id]: {due: Date.now() + (quality === 1 ? 60000 : interval * day), interval, ease, reviews:old.reviews + 1}});
    setRevealed(false); setHeard(""); setAudioStatus(""); setIndex(i => (i + 1) % studyCards.length);
  }
  function playAudio(slow=false) {
    const audio = audioRef.current;
    if (!audio) return;
    const fallback = audio.dataset.speech || "";
    if (audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      speakText(fallback, slow);
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    audio.playbackRate = slow ? .72 : 1;
    setAudioStatus(slow ? "Lecture lente…" : "Lecture…");
    audio.play().catch(() => setAudioStatus("Pulsa ▶ en el reproductor para autorizar el sonido."));
  }
  function speakText(text:string, slow=false) {
    if (!("speechSynthesis" in window)) { setAudioStatus("Tu navegador no permite la voz integrada. Prueba en Chrome, Edge o Safari."); return; }
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = slow ? .72 : 1;
    const frenchVoice = window.speechSynthesis.getVoices().find(voice=>voice.lang.toLowerCase().startsWith("fr"));
    if (frenchVoice) utterance.voice = frenchVoice;
    utterance.onstart=()=>setAudioStatus(slow?"Lecture lente…":"Lecture…");
    utterance.onend=()=>setAudioStatus("");
    utterance.onerror=()=>setAudioStatus("No pude iniciar la voz. Prueba nuevamente con el botón Écouter.");
    window.speechSynthesis.speak(utterance);
  }
  function speakStory(slow=false) { speakText(story.sentences.map(sentence=>sentence.fr).join(" "), slow); }
  function record(target:string) {
    const W = window as typeof window & {webkitSpeechRecognition?: new()=>RecognitionLike; SpeechRecognition?: new()=>RecognitionLike};
    const Recognition = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!Recognition) { setHeard("Este visor no permite usar el micrófono. Abre la app directamente en Chrome, Edge o Safari."); return; }
    setSpeechTarget(target);
    const rec = new Recognition(); rec.lang="fr-FR"; rec.interimResults=false;
    rec.onstart=()=>setListening(true); rec.onend=()=>setListening(false);
    rec.onresult=(e:RecognitionEventLike)=>setHeard(e.results[0][0].transcript);
    rec.onerror=()=>{setListening(false);setHeard("No pude acceder al micrófono. Revisa su permiso en Chrome, Edge o Safari.");}; rec.start();
  }
  function normalize(s:string) { return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z ]/g," ").replace(/\s+/g," ").trim(); }
  function storyText(text:string) {
    const forms=story.verbs.map(verb=>verb.form).sort((a,b)=>b.length-a.length);
    const pattern=new RegExp(`(?<![\\p{L}])(${forms.map(form=>form.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")})(?![\\p{L}])`,"giu");
    return text.split(pattern).map((part,i)=>forms.some(form=>form.toLocaleLowerCase("fr")===part.toLocaleLowerCase("fr"))?<mark key={`${part}-${i}`}>{part}</mark>:part);
  }
  function choosePractice(category: PracticeCategory) {
    setPracticeCategory(category); setPracticeIndex(0); setPracticeInput(""); setPracticeResult(null); setMeaningLang(null);
  }
  function checkPractice(event: React.FormEvent) {
    event.preventDefault();
    if (!practiceInput.trim() || practiceResult) return;
    const correct = normalize(practiceInput) === normalize(practiceSets[practiceCategory][practiceIndex].answer);
    setPracticeResult(correct ? "correct" : "wrong");
    setPracticeScore(score=>({correct:score.correct+(correct?1:0),total:score.total+1}));
    recordAttempt(`reflex-${practiceCategory}-${practiceIndex}`, correct);
  }
  function nextPractice() {
    const list = practiceSets[practiceCategory];
    setPracticeIndex(index=>(index+1)%list.length); setPracticeInput(""); setPracticeResult(null); setMeaningLang(null);
  }
  function toggleLesson(id:string) {
    const next=completedLessons.includes(id)?completedLessons.filter(item=>item!==id):[...completedLessons,id];
    setCompletedLessons(next); localStorage.setItem("bravo-lessons",JSON.stringify(next)); queueCloudSync();
  }
  function resetCourseExercise() { setCourseInput(""); setCourseResult(null); setCourseSelected([]); }
  function checkCourseExercise() {
    if (!courseInput.trim() || courseResult) return;
    const correct=normalize(courseInput)===normalize(courseExercise.answer);
    setCourseResult(correct?"correct":"wrong");
    const next={correct:courseStats.correct+(correct?1:0),total:courseStats.total+1};
    setCourseStats(next); localStorage.setItem("bravo-course-stats",JSON.stringify(next)); queueCloudSync();
    recordAttempt(`course-${courseExercise.id}`, correct);
  }
  function nextCourseExercise() { setCourseIndex(index=>(index+1)%filteredCourseExercises.length); resetCourseExercise(); }
  function resetTimeExercise(){setTimeAnswer("");setTimeResult(null);setTimeTokens([]);setTimeAttempts(0);}
  function chooseTimeLesson(id:string){setTimeLessonId(id);setTimeIndex(0);setTimeOnlyErrors(false);resetTimeExercise();}
  function checkTimeExercise(){
    if(!timeAnswer.trim()||timeResult) return;
    const correct=normalize(timeAnswer)===normalize(timeExercise.answer);
    setTimeResult(correct?"correct":"wrong"); setTimeAttempts(attempts=>attempts+1);
    const next=correct?timeWrongIds.filter(id=>id!==timeExercise.id):Array.from(new Set([...timeWrongIds,timeExercise.id]));
    setTimeWrongIds(next);localStorage.setItem("bravo-time-errors",JSON.stringify(next));recordAttempt("time-"+timeExercise.id,correct);
  }
  function nextTimeExercise(){setTimeIndex(i=>(i+1)%activeTimeExercises.length);resetTimeExercise();}
  function chooseStory(id:string) { setStoryId(id); setStorySentenceIndex(0); setStoryRecall(""); setStoryRecallResult(null); setHeard(""); setAudioStatus(""); }
  function checkStoryRecall() { if (!storyRecall.trim()) return; const correct=normalize(storyRecall)===normalize(story.sentences[storySentenceIndex].fr); setStoryRecallResult(correct?"correct":"wrong"); recordAttempt(`story-${story.id}-${storySentenceIndex}`,correct); }
  function recordAttempt(id:string, correct:boolean) {
    const key="bravo-learning-record";
    const saved=JSON.parse(localStorage.getItem(key)||"{}") as Record<string,{correct:number;wrong:number;due:number}>;
    const old=saved[id]||{correct:0,wrong:0,due:0};
    saved[id]={correct:old.correct+(correct?1:0),wrong:old.wrong+(correct?0:1),due:Date.now()+(correct?3*day:10*60000)};
    localStorage.setItem(key,JSON.stringify(saved));
    queueCloudSync();
  }
  function checkVerb(event: React.FormEvent) {
    event.preventDefault(); if (!verbAnswer.trim()||verbResult) return;
    const correct=normalize(verbAnswer)===normalize(verb.forms[verbTense][verbSubject]);
    setVerbResult(correct?"correct":"wrong");
    const next={correct:verbStats.correct+(correct?1:0),total:verbStats.total+1};
    setVerbStats(next); localStorage.setItem("bravo-verb-stats",JSON.stringify(next)); queueCloudSync();
    recordAttempt(`verb-${verb.id}-${verbTense}-${verbSubject}`,correct);
  }
  function moveStorySentence(direction:number) { setStorySentenceIndex(index=>(index+direction+story.sentences.length)%story.sentences.length); setStoryRecall(""); setStoryRecallResult(null); setHeard(""); }
  function toggleStoryComplete(id:string) { const next=completedStories.includes(id)?completedStories.filter(item=>item!==id):[...completedStories,id]; setCompletedStories(next); localStorage.setItem("bravo-stories",JSON.stringify(next)); queueCloudSync(); }
  function chooseTcfTask(id:TcfTaskId) { setTcfTaskId(id); setTcfTopic(0); setTcfChecks([false,false,false,false]); setTcfDrillIndex(0); setTcfDrillAnswer(""); }
  function updateTcfDraft(value:string) { const next={...tcfDrafts,[tcfTaskId]:value}; setTcfDrafts(next); localStorage.setItem("bravo-tcf-drafts",JSON.stringify(next)); queueCloudSync(); }
  const match = heard && normalize(heard) === normalize(speechTarget||card?.answer);
  const units = Array.from(new Set(cards.map(c=>`${c.level}|${c.unit}`)));
  const practiceItem = practiceSets[practiceCategory][practiceIndex];
  const [practiceBefore, practiceAfter] = practiceItem.sentence.split("___");
  const tcfTask = tcfTasks.find(task=>task.id===tcfTaskId) || tcfTasks[0];
  const levelLessons=lessons.filter(lesson=>lesson.level===learnLevel);
  const lesson=lessons.find(item=>item.id===lessonId) || levelLessons[0];
  const filteredCourseExercises=courseLevel==="Tous"?courseExercises:courseExercises.filter(exercise=>exercise.level===courseLevel);
  const courseExercise=filteredCourseExercises[courseIndex%filteredCourseExercises.length];
  const filteredStories=storyLevel==="Tous"?stories:stories.filter(item=>item.level===storyLevel);
  const story=stories.find(item=>item.id===storyId) || filteredStories[0] || stories[0];
  const storySentence=story.sentences[storySentenceIndex%story.sentences.length];
  const tcfTopics=tcfPromptBank[tcfTaskId];
  const taskDrills=tcfDrills.filter(drill=>drill.task===tcfTaskId);
  const tcfDrill=taskDrills[tcfDrillIndex%taskDrills.length];
  const tcfDraft = tcfDrafts[tcfTaskId] || "";
  const tcfWordCount = tcfDraft.trim() ? tcfDraft.trim().split(/\s+/).length : 0;
  const tcfWordState = tcfWordCount < tcfTask.min ? "short" : tcfWordCount > tcfTask.max ? "long" : "good";
  const timeLesson=timeLessons.find(item=>item.id===timeLessonId)||timeLessons[0];
  const timeLessonExercises=timeExercises.filter(item=>item.lesson===timeLesson.id);
  const errorTimeExercises=timeLessonExercises.filter(item=>timeWrongIds.includes(item.id));
  const activeTimeExercises=(timeOnlyErrors&&errorTimeExercises.length?errorTimeExercises:timeLessonExercises);
  const timeExercise=activeTimeExercises[timeIndex%Math.max(1,activeTimeExercises.length)]||timeLessonExercises[0];
  const simulationCounts=simulationDrafts.map(text=>text.trim()?text.trim().split(/\s+/).length:0);
  const totalTcfTopics=Object.values(tcfPromptBank).reduce((total,items)=>total+items.length,0);
  const verb=verbs.find(item=>item.id===verbId)||verbs[0];
  const verbForm=verb.forms[verbTense][verbSubject];

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">B</span><div><strong>Bravo</strong><small>Mémoire</small></div></div>
      <nav aria-label="Navigation principale">
        <button className={view==="home"?"active":""} onClick={()=>setView("home")}><span>⌂</span> Aujourd’hui</button>
        <button className={view==="learn"?"active":""} onClick={()=>setView("learn")}><span>◇</span> Apprendre</button>
        <button className={view==="stories"?"active":""} onClick={()=>setView("stories")}><span>◫</span> Histoires</button>
        <button className={view==="practice"?"active":""} onClick={()=>setView("practice")}><span>✎</span> Pratique</button>
        <button className={view==="verbs"?"active":""} onClick={()=>setView("verbs")}><span>V</span> Conjuguer</button>
        <button className={view==="study"?"active":""} onClick={()=>setView("study")}><span>▱</span> Réviser</button>
        <button className={view==="tcf"?"active":""} onClick={()=>setView("tcf")}><span>TCF</span> Écriture TCF</button>
        <button className={view==="time"?"active":""} onClick={()=>setView("time")}><span>◷</span> Temps TCF</button>
        <button className={view==="progress"?"active":""} onClick={()=>setView("progress")}><span>↗</span> Progrès</button>
      </nav>
      <div className="quote">« Un peu de français,<br/>chaque jour. »</div>
    </aside>

    <section className="content">
      {supabaseConfigured&&!cloudSession&&<section className="account-card compact"><div><p className="eyebrow">PROGRESO PERSONAL</p><h2>Guarda tu avance para siempre</h2><p>Recibirás un enlace seguro por correo.</p></div><form onSubmit={connectCloud}><input type="email" value={cloudEmail} onChange={event=>setCloudEmail(event.target.value)} placeholder="tu@email.com" required/><button>Conectar</button>{cloudStatus&&<small>{cloudStatus}</small>}</form></section>}
      {cloudSession&&<p className="cloud-connected">● {cloudSession.user.email||"Cuenta conectada"} · {cloudStatus||"progreso sincronizado"}</p>}
      {view === "home" && <>
        <header className="topline"><div><p className="eyebrow">{dayLabel} · BONJOUR</p><h1>Prêt·e à retrouver<br/><em>vos mots ?</em></h1></div><div className="streak"><span>✦</span><strong>{streak}</strong><small>jours</small></div></header>
        <section className="hero-card">
          <div><span className="pill">SESSION DU JOUR</span><h2>{due} cartes à retrouver</h2><p>Un mélange de vocabulaire, structures et prononciation adapté à votre mémoire.</p><button className="primary" onClick={()=>setView("study")}>Continuer <span>→</span></button></div>
          <div className="hero-progress"><div className="progress-ring" style={{"--progress":`${percent * 3.6}deg`} as React.CSSProperties}><span>{percent}%</span></div><small>du parcours acquis</small></div>
        </section>
        <div className="section-heading"><div><p className="eyebrow">VOTRE PARCOURS</p><h2>Deux niveaux, un même élan</h2></div><button className="text-button" onClick={()=>setView("learn")}>Tout voir →</button></div>
        <div className="level-grid">
          {(["A1","A2"] as const).map((l,i)=>{const total=cards.filter(c=>c.level===l).length;const done=cards.filter(c=>c.level===l&&(memory[c.id]?.reviews||0)>=2).length;return <article className={`level-card level-${l.toLowerCase()}`} key={l}><div className="level-letter">{l}</div><div><small>{i===0?"LES FONDATIONS":"VERS L’AUTONOMIE"}</small><h3>{i===0?"Je me débrouille":"Je m’exprime"}</h3><p>{i===0?"Présentations, heure, articles et vie quotidienne.":"Projets, comparaisons, pronoms et passé composé."}</p><div className="bar"><i style={{width:`${Math.round(done/total*100)}%`}}/></div><span>{done} / {total} cartes acquises</span></div></article>})}
        </div>
        <aside className="pronunciation-banner"><div className="sound-icon">♪</div><div><small>PRONONCIATION</small><h3>Faites sonner le français</h3><p>Écoutez, répétez, puis comparez ce que l’app a entendu.</p></div><button onClick={()=>{setLevel("Tous");setView("study");}}>S’entraîner →</button></aside>
        <aside className="practice-banner"><div><small>NOUVEAU · PHRASES À COMPLÉTER</small><h3>Pratique ciblée</h3><p>Verbes, nombres, jours et mois dans de vraies phrases.</p></div><div className="practice-mini-list"><span>Verbes</span><span>Nombres</span><span>Jours</span><span>Mois</span></div><button onClick={()=>setView("practice")}>Pratiquer →</button></aside>
        <aside className="conjugation-banner"><div><small>NUEVO · CONJUGACIÓN</small><h3>Domina los verbos de verdad</h3><p>Elige persona y tiempo; observa el patrón y produce la forma.</p></div><button onClick={()=>setView("verbs")}>Conjugar →</button></aside>
        <aside className="tcf-banner"><div className="tcf-badge">TCF</div><div><small>NOUVEAU · EXPRESSION ÉCRITE 2026</small><h3>Du guide à la pratique</h3><p>Trois tâches, des structures à mémoriser et un atelier avec compteur de mots.</p></div><button onClick={()=>setView("tcf")}>Préparer le TCF →</button></aside>
        <aside className="practice-banner"><div><small>TCF · TEMPS & CONNECTEURS</small><h3>Adverbes et expressions de temps</h3><p>Depuis, pendant, pour, en, fréquence et connecteurs pour écrire avec précision.</p></div><div className="practice-mini-list"><span>Durée</span><span>Fréquence</span><span>Connecteurs</span></div><button onClick={()=>setView("time")}>S’entraîner →</button></aside>
        <aside className="programme-banner"><div><small>PROGRAMME COMPLET A1–A2</small><h3>{lessons.length} microleçons · {courseExercises.length+50} exercices</h3><p>Apprenez la règle, pratiquez activement, puis révisez ce qui résiste.</p></div><button onClick={()=>setView("learn")}>Commencer →</button></aside>
        <aside className="story-banner"><div className="story-book">Aa</div><div><small>APPRENDRE PAR L’INPUT</small><h3>Des histoires qui font vivre la grammaire</h3><p>Présent, passé composé et futur proche avec toutes les personnes.</p></div><button onClick={()=>setView("stories")}>Lire une histoire →</button></aside>
      </>}

      {view === "learn" && <section className="learn-view">
        <div className="learn-heading"><div><p className="eyebrow">PROGRAMME A1–A2</p><h1>Comprendre avant<br/><em>de mémoriser.</em></h1><p>Chaque microleçon transforme une partie des cours en règle claire, exemples et pratique active.</p></div><div className="learn-total"><strong>{completedLessons.length}</strong><span>/ {lessons.length}<br/>leçons terminées</span></div></div>
        <div className="learn-levels"><button className={learnLevel==="A1"?"selected":""} onClick={()=>{setLearnLevel("A1");setLessonId(lessons.find(item=>item.level==="A1")?.id||"")}}>A1 · Fondations</button><button className={learnLevel==="A2"?"selected":""} onClick={()=>{setLearnLevel("A2");setLessonId(lessons.find(item=>item.level==="A2")?.id||"")}}>A2 · Autonomie</button><button className={learnLevel==="B1"?"selected":""} onClick={()=>{setLearnLevel("B1");setLessonId(lessons.find(item=>item.level==="B1")?.id||"")}}>B1 · Raconter & convaincre</button></div>
        <div className="learn-layout">
          <aside className="lesson-list">{Array.from(new Set(levelLessons.map(item=>item.group))).map(group=><div key={group}><p>{group}</p>{levelLessons.filter(item=>item.group===group).map(item=><button key={item.id} className={lesson.id===item.id?"selected":""} onClick={()=>setLessonId(item.id)}><span className={completedLessons.includes(item.id)?"done":""}>{completedLessons.includes(item.id)?"✓":"·"}</span>{item.title}</button>)}</div>)}</aside>
          <article className="lesson-detail"><div className="lesson-meta"><span>{lesson.level}</span><span>{lesson.group}</span></div><p className="eyebrow">OBJECTIF</p><h2>{lesson.title}</h2><p className="lesson-objective">{lesson.objective}</p><div className="lesson-rule"><small>LA RÈGLE SIMPLEMENT</small><p>{lesson.rule}</p></div><div className="lesson-examples"><p className="eyebrow">EXEMPLES</p>{lesson.examples.map(([fr,es])=><div key={fr}><strong>{fr}</strong><span>{es}</span></div>)}</div><div className="lesson-pronunciation"><audio ref={audioRef} data-speech={lesson.examples[0][0]} className="native-audio" controls preload="metadata" src={`/audio/lesson-${lesson.id}.mp3`} aria-label={`Prononciation de ${lesson.examples[0][0]}`} onPlay={()=>setAudioStatus("Lecture…")} onEnded={()=>setAudioStatus("")} onError={(event)=>speakText(event.currentTarget.dataset.speech||"",event.currentTarget.playbackRate<.9)}/><div className="audio-actions"><button onClick={()=>playAudio()}>▶ Exemple</button><button onClick={()=>playAudio(true)}>◌ Plus lent</button><button className={listening?"recording":""} onClick={()=>record(lesson.examples[0][0])}>● {listening?"J’écoute…":"Répéter"}</button></div>{audioStatus&&<p className="audio-status">{audioStatus}</p>}{heard&&speechTarget===lesson.examples[0][0]&&<div className={`heard ${match?"match":""}`}><small>{match?"TRÈS BIEN":"L’APP A ENTENDU"}</small><p>{heard}</p></div>}</div><div className="lesson-keywords">{lesson.keywords.map(word=><span key={word}>{word}</span>)}</div><div className="lesson-actions"><button className="lesson-complete" onClick={()=>toggleLesson(lesson.id)}>{completedLessons.includes(lesson.id)?"✓ Leçon terminée":"Marquer comme terminée"}</button><button onClick={()=>{setCourseLevel(lesson.level);setPracticeTrack("course");setCourseIndex(0);resetCourseExercise();setView("practice")}}>Pratiquer ce niveau →</button></div></article>
        </div>
      </section>}

      {view === "stories" && <section className="stories-view">
        <div className="stories-heading"><div><p className="eyebrow">HISTOIRES · INPUT COMPRÉHENSIBLE</p><h1>Voir la grammaire<br/><em>prendre vie.</em></h1><p>Lisez, écoutez, observez les verbes, puis reconstruisez chaque phrase de mémoire.</p></div><div className="stories-progress"><strong>{completedStories.length}</strong><span>/ {stories.length}<br/>histoires mémorisées</span></div></div>
        <div className="story-filters">{(["Tous","A1","A2","A2+"] as const).map(item=><button key={item} className={storyLevel===item?"selected":""} onClick={()=>{setStoryLevel(item);const first=item==="Tous"?stories[0]:stories.find(story=>story.level===item);if(first)chooseStory(first.id)}}>{item==="Tous"?"Toutes":item}</button>)}</div>
        <div className="stories-layout">
          <aside className="story-list">{filteredStories.map((item,i)=><button key={item.id} className={story.id===item.id?"selected":""} onClick={()=>chooseStory(item.id)}><span>{completedStories.includes(item.id)?"✓":String(i+1).padStart(2,"0")}</span><div><strong>{item.title}</strong><small>{item.level} · {item.tenses.join(" + ")}</small></div></button>)}</aside>
          <article className="story-reader"><div className="story-reader-head"><div><div className="story-tags"><span>{story.level}</span>{story.tenses.map(tense=><span key={tense}>{tense}</span>)}</div><h2>{story.title}</h2><p>{story.subtitle}</p></div><button className={completedStories.includes(story.id)?"completed":""} onClick={()=>toggleStoryComplete(story.id)}>{completedStories.includes(story.id)?"✓ Mémorisée":"Marquer mémorisée"}</button></div>
            <div className="story-tools"><button className={storyTranslation?"active":""} onClick={()=>setStoryTranslation(value=>!value)}>ES {storyTranslation?"visible":"masqué"}</button><button className={storyVerbs?"active":""} onClick={()=>setStoryVerbs(value=>!value)}>Verbes {storyVerbs?"surlignés":"simples"}</button><span>{story.focus}</span></div>
            <div className="story-text">{story.sentences.map((sentence,i)=><div key={sentence.fr} className={storySentenceIndex===i?"current":""} onClick={()=>{setStorySentenceIndex(i);setStoryRecall("");setStoryRecallResult(null)}}><span>{i+1}</span><p>{storyVerbs?storyText(sentence.fr):sentence.fr}{storyTranslation&&<small>{sentence.es}</small>}</p></div>)}</div>
            <div className="story-audio"><p className="story-voice-note">Voix française intégrée à votre navigateur</p><div className="audio-actions"><button onClick={()=>speakStory()}>▶ Écouter</button><button onClick={()=>speakStory(true)}>◌ Plus lent</button></div>{audioStatus&&<p className="audio-status">{audioStatus}</p>}</div>
            {storyVerbs&&<div className="story-verb-map"><p className="eyebrow">CARTE DES VERBES</p><div>{story.verbs.map(verb=><article key={`${verb.form}-${verb.person}`}><strong>{verb.form}</strong><span>{verb.infinitive} · {verb.es}</span><small>{verb.person} · {verb.tense}</small></article>)}</div></div>}
            <section className="story-memory"><div className="story-memory-head"><div><p className="eyebrow">RECONSTRUIRE DE MÉMOIRE</p><h3>Phrase {storySentenceIndex+1} / {story.sentences.length}</h3></div><div><button onClick={()=>moveStorySentence(-1)}>←</button><button onClick={()=>moveStorySentence(1)}>→</button></div></div><p className="memory-cue">{storySentence.es}</p><input value={storyRecall} onChange={event=>{setStoryRecall(event.target.value);if(storyRecallResult)setStoryRecallResult(null)}} placeholder="Réécrivez la phrase en français…"/><div className="memory-actions"><button disabled={!storyRecall.trim()} onClick={checkStoryRecall}>Vérifier</button><button className={listening?"recording":""} onClick={()=>record(storySentence.fr)}>● {listening?"J’écoute…":"Dire la phrase"}</button></div>{storyRecallResult&&<div className={`memory-result ${storyRecallResult}`}><strong>{storyRecallResult==="correct"?"✓ Parfait !":"Comparez puis réessayez :"}</strong><p>{storySentence.fr}</p></div>}{heard&&speechTarget===storySentence.fr&&<div className={`heard ${match?"match":""}`}><small>{match?"TRÈS BIEN":"L’APP A ENTENDU"}</small><p>{heard}</p></div>}</section>
          </article>
        </div>
      </section>}

      {view === "study" && card && <section className="study-view">
        <header className="study-header"><button className="back" onClick={()=>setView("home")}>← Aujourd’hui</button><div className="session-progress"><i style={{width:`${((index+1)/Math.min(12,studyCards.length))*100}%`}}/></div><span>{(index%12)+1} / 12</span></header>
        <div className="study-filters"><button className={level==="Tous"?"selected":""} onClick={()=>{setLevel("Tous");setIndex(0);setRevealed(false)}}>Mix</button><button className={level==="A1"?"selected":""} onClick={()=>{setLevel("A1");setIndex(0);setRevealed(false)}}>A1</button><button className={level==="A2"?"selected":""} onClick={()=>{setLevel("A2");setIndex(0);setRevealed(false)}}>A2</button><button className={level==="Verbes"?"selected":""} onClick={()=>{setLevel("Verbes");setIndex(0);setRevealed(false)}}>Verbes</button></div>
        <article className="flashcard">
          <div className="card-meta"><span>{card.translationEn?"VERBE":card.level}</span><span>{card.type}</span><span>{card.unit}</span></div>
          <p className="prompt-label">{card.translationEn?"QUE VEUT DIRE CE VERBE ?":"DITES-LE EN FRANÇAIS"}</p><h2>{card.prompt}</h2>
          {!revealed ? <button className="reveal" onClick={()=>setRevealed(true)}>Afficher la réponse</button> : <div className="answer-zone"><div className="divider"/>{card.translationEn?<><div className="verb-translations"><div><small>ENGLISH</small><strong>{card.translationEn}</strong></div><div><small>ESPAÑOL</small><strong>{card.translationEs}</strong></div></div><p className="hint">Écoutez puis répétez le verbe en français.</p></>:<><p className="answer">{card.answer}</p><p className="hint">{card.hint}</p></>}<audio ref={audioRef} data-speech={card.answer} className="native-audio" controls preload="metadata" src={`/audio/${card.id}.mp3`} aria-label={`Prononciation de ${card.answer}`} onPlay={()=>setAudioStatus("Lecture…")} onEnded={()=>setAudioStatus("")} onError={(event)=>speakText(event.currentTarget.dataset.speech||"",event.currentTarget.playbackRate<.9)}/><div className="audio-actions"><button onClick={()=>playAudio()}>▶ Écouter</button><button onClick={()=>playAudio(true)}>◌ Plus lent</button><button className={listening?"recording":""} onClick={()=>record(card.answer)}>● {listening?"J’écoute…":"Ma voix"}</button></div>{audioStatus&&<p className="audio-status" role="status">{audioStatus}</p>}{heard&&<div className={`heard ${match?"match":""}`}><small>{match?"L’APP A ENTENDU":"AIDE MICROPHONE"}</small><p>{heard}</p>{match&&<strong>Très bien !</strong>}</div>}</div>}
        </article>
        {revealed && <div className="rating"><p>Comment était votre souvenir ?</p><div><button onClick={()=>rate(1)}><span>↺</span>Difficile</button><button onClick={()=>rate(3)}><span>≈</span>Presque</button><button className="good" onClick={()=>rate(5)}><span>✓</span>Je savais</button></div></div>}
      </section>}

      {view === "practice" && <section className="practice-view">
        <div className="practice-title-row"><div><p className="eyebrow">PRATIQUE ACTIVE</p><h1>Construisez vos réflexes</h1><p className="lead">Reconnaître, retrouver, ordonner et transformer : quatre chemins vers la mémoire.</p></div><div className="practice-score"><strong>{practiceTrack==="course"?courseStats.correct:practiceScore.correct}</strong><span>/ {practiceTrack==="course"?courseStats.total:practiceScore.total}</span><small>bonnes réponses</small></div></div>
        <div className="practice-track"><button className={practiceTrack==="course"?"selected":""} onClick={()=>{setPracticeTrack("course");resetCourseExercise()}}>Parcours complet</button><button className={practiceTrack==="reflexes"?"selected":""} onClick={()=>setPracticeTrack("reflexes")}>Verbes, nombres & calendrier</button></div>
        {practiceTrack==="course"?<>
          <div className="course-filters">{(["Tous","A1","A2","B1"] as const).map(item=><button key={item} className={courseLevel===item?"selected":""} onClick={()=>{setCourseLevel(item);setCourseIndex(0);resetCourseExercise()}}>{item==="Tous"?"Mix A1–B1":item}</button>)}</div>
          <article className="course-exercise"><div className="course-exercise-meta"><span>{courseExercise.level}</span><span>{courseExercise.skill}</span><small>{courseIndex%filteredCourseExercises.length+1} / {filteredCourseExercises.length}</small></div><p className="course-mode">{courseExercise.mode==="choice"?"RECONNAÎTRE":courseExercise.mode==="reorder"?"CONSTRUIRE":courseExercise.mode==="transform"?"TRANSFORMER":"RETROUVER"}</p><h2>{courseExercise.prompt}</h2>
            {courseExercise.mode==="choice"&&<div className="choice-options">{courseExercise.options?.map(option=><button key={option} className={courseInput===option?"selected":""} onClick={()=>{if(!courseResult)setCourseInput(option)}}>{option}</button>)}</div>}
            {courseExercise.mode==="reorder"&&<><div className="built-sentence">{courseInput||"Construisez la phrase…"}</div><div className="word-tokens">{courseExercise.tokens?.map((token,i)=><button key={`${token}-${i}`} disabled={courseSelected.includes(i)||!!courseResult} onClick={()=>{setCourseSelected(items=>[...items,i]);setCourseInput(value=>value?`${value} ${token}`:token)}}>{token}</button>)}</div><button className="clear-order" disabled={!courseInput||!!courseResult} onClick={()=>{setCourseInput("");setCourseSelected([])}}>Effacer</button></>}
            {(courseExercise.mode==="fill"||courseExercise.mode==="transform")&&<input className="course-answer" value={courseInput} onChange={event=>{setCourseInput(event.target.value);if(courseResult)setCourseResult(null)}} placeholder="Écrivez votre réponse…" autoComplete="off"/>}
            {!courseResult?<button className="check-course" disabled={!courseInput.trim()} onClick={checkCourseExercise}>Vérifier</button>:<div className={`course-feedback ${courseResult}`}><strong>{courseResult==="correct"?"✓ Très bien !":"À retravailler"}</strong><span>{courseExercise.answer}</span><p>{courseExercise.hint}</p><button onClick={nextCourseExercise}>Exercice suivant →</button></div>}
          </article>
        </>:<>
          <div className="practice-categories">{(Object.keys(practiceMeta) as PracticeCategory[]).map(category=><button key={category} className={practiceCategory===category?"selected":""} onClick={()=>choosePractice(category)}><span>{practiceMeta[category].icon}</span><div><strong>{practiceMeta[category].title}</strong><small>{practiceMeta[category].description}</small></div></button>)}</div>
          <article className="completion-card"><div className="completion-top"><span>{practiceMeta[practiceCategory].title}</span><small>{practiceIndex+1} / {practiceSets[practiceCategory].length}</small></div><p className="practice-cue">INDICE · {practiceItem.cue}</p><h2>{practiceBefore}<span className="sentence-blank">_____</span>{practiceAfter}</h2>{practiceItem.infinitive&&<div className="verb-meaning"><strong>{practiceItem.infinitive}</strong><span>significado:</span><button className={meaningLang==="en"?"active":""} onClick={()=>setMeaningLang(meaningLang==="en"?null:"en")}>EN</button><button className={meaningLang==="es"?"active":""} onClick={()=>setMeaningLang(meaningLang==="es"?null:"es")}>ES</button>{meaningLang&&<small>{meaningLang==="en"?practiceItem.en:practiceItem.es}</small>}</div>}<form onSubmit={checkPractice} className="completion-form"><label htmlFor="practice-answer">Votre réponse</label><div><input id="practice-answer" value={practiceInput} onChange={event=>{setPracticeInput(event.target.value);if(practiceResult)setPracticeResult(null)}} placeholder="Écrivez le mot…" autoComplete="off" autoCapitalize="none"/><button type="submit" disabled={!practiceInput.trim()}>Vérifier</button></div></form><div className={`practice-feedback ${practiceResult||""}`} aria-live="polite">{practiceResult==="correct"&&<><strong>✓ Très bien !</strong><span>{practiceItem.answer}</span></>}{practiceResult==="wrong"&&<><strong>Encore un petit effort</strong><span>La réponse est : <b>{practiceItem.answer}</b></span></>}</div>{practiceResult&&<button className="next-practice" onClick={nextPractice}>Phrase suivante →</button>}</article>
        </>}
      </section>}

      {view === "verbs" && <section className="verbs-view">
        <div className="verbs-heading"><div><p className="eyebrow">LABORATORIO DE CONJUGACIÓN</p><h1>Entiende el patrón.<br/><em>Luego prodúcelo.</em></h1><p>Reglas claras, práctica activa y repaso de las formas que cuestan.</p></div><div className="verbs-score"><strong>{verbStats.correct}</strong><span>/ {verbStats.total}<br/>correctas</span></div></div>
        <div className="verb-lab"><div className="verb-controls"><label>Verbo<select value={verbId} onChange={event=>{setVerbId(event.target.value);setVerbAnswer("");setVerbResult(null)}}>{verbs.map(item=><option key={item.id} value={item.id}>{item.infinitive} · {item.es}</option>)}</select></label><label>Tiempo<select value={verbTense} onChange={event=>{setVerbTense(event.target.value as Tense);setVerbAnswer("");setVerbResult(null)}}>{(["présent","passé composé","imparfait","futur proche","futur simple"] as Tense[]).map(item=><option key={item}>{item}</option>)}</select></label></div><div className="verb-info"><strong>{verb.infinitive}</strong><span>EN · {verb.en}</span><span>ES · {verb.es}</span><small>Pronunciación: {verb.pronunciation}</small><button onClick={()=>speakText(verb.infinitive)}>▶ Escuchar</button></div><div className="subject-grid">{(Object.keys(subjectLabels) as Subject[]).map(subject=><button key={subject} className={verbSubject===subject?"selected":""} onClick={()=>{setVerbSubject(subject);setVerbAnswer("");setVerbResult(null)}}>{subjectLabels[subject]}</button>)}</div><form className="verb-question" onSubmit={checkVerb}><p className="eyebrow">ESCRIBE LA FORMA</p><h2><mark>{verbSubject}</mark> ________</h2><small>{verbTense} · {verb.es}</small><input value={verbAnswer} onChange={event=>{setVerbAnswer(event.target.value);setVerbResult(null)}} placeholder="Escribe la conjugación…" autoComplete="off"/><button disabled={!verbAnswer.trim()}>Verificar</button>{verbResult&&<div className={`verb-feedback ${verbResult}`}><strong>{verbResult==="correct"?"✓ Correcto":"La forma correcta"}</strong><span>{verbSubject} <mark>{verbForm}</mark></span><p>{verbTense==="passé composé"?"Auxiliar + participio pasado.":verbTense==="futur proche"?"aller conjugado + infinitivo.":verbTense==="imparfait"?"Base de nous + terminaciones -ais, -ais, -ait…":verbTense==="futur simple"?"Infinitivo o raíz irregular + terminaciones del futuro.":"Observa la terminación que cambia con la persona."}</p></div>}</form></div>
        <section className="transform-story"><p className="eyebrow">HISTORIA TRANSFORMABLE</p><h2>Una misma idea, ocho personas y cinco tiempos</h2><p className="transform-fr"><mark>{verbSubject}</mark> <mark>{verbForm}</mark> le français avec ses amis chaque semaine.</p><p>ES: Esta persona practica francés con sus amigos. Cambia persona y tiempo para comparar la estructura.</p><small>Las palabras resaltadas cambian al modificar el sujeto o el tiempo.</small><button onClick={()=>speakText(`${verbSubject} ${verbForm} le français avec ses amis chaque semaine.`)}>▶ Escuchar la historia</button></section>
        <section className="patterns"><p className="eyebrow">PATRONES LÉXICOS</p><h2>Pistas entre español y francés</h2><div>{lexicalPatterns.map(item=><article key={item.es}><strong>{item.es} → {item.fr}</strong><span>{item.example}</span><small>{item.note}</small></article>)}</div></section>
      </section>}

      {view === "tcf" && <section className="tcf-view">
        <div className="tcf-heading"><div><p className="eyebrow">TCF CANADA · EXPRESSION ÉCRITE</p><h1>De la méthode<br/><em>au jour de l’examen.</em></h1><p>{totalTcfTopics} sujets issus du guide, avec modèles corrigés par une méthode conforme aux limites.</p></div><div className="tcf-source"><strong>{totalTcfTopics}</strong><span>sujets<br/>à pratiquer</span></div></div>
        <div className="tcf-mode-tabs">{([['method','Apprendre'],['guided','Pratique guidée'],['write','Rédiger'],['simulate','Simulacre']] as const).map(([id,label])=><button key={id} className={tcfMode===id?"selected":""} onClick={()=>setTcfMode(id)}>{label}</button>)}</div>
        {tcfMode!=="simulate"&&<div className="tcf-task-tabs">{tcfTasks.map(task=><button key={task.id} className={tcfTaskId===task.id?"selected":""} onClick={()=>chooseTcfTask(task.id)}><span>{task.number}</span><div><strong>{task.title}</strong><small>{task.words} · {tcfPromptBank[task.id].length} sujets</small></div></button>)}</div>}
        {tcfMode==="method"&&<section className="tcf-method"><div className="tcf-method-title"><div><small>OBJECTIF DE LA TÂCHE {tcfTask.number}</small><h2>{tcfTask.goal}</h2></div><span>{tcfTask.words}</span></div><div className="tcf-learning-grid"><article><p className="eyebrow">STRUCTURE À RETENIR</p><ol>{tcfTask.steps.map((step,i)=><li key={step}><span>{i+1}</span>{step}</li>)}</ol></article><article><p className="eyebrow">BOÎTE À EXPRESSIONS</p><div className="tcf-phrases">{tcfTask.phrases.map(phrase=><span key={phrase}>{phrase}</span>)}</div></article></div></section>}
        {tcfMode==="guided"&&<section className="tcf-guided"><div className="tcf-guided-top"><span>TÂCHE {tcfTask.number}</span><small>{tcfDrillIndex%taskDrills.length+1} / {taskDrills.length}</small></div><p className="eyebrow">COMPRENDRE LA MÉTHODE</p><h2>{tcfDrill.prompt}</h2><div className="tcf-drill-options">{tcfDrill.options.map(option=><button key={option} className={tcfDrillAnswer===option?"selected":""} disabled={!!tcfDrillAnswer} onClick={()=>setTcfDrillAnswer(option)}>{option}</button>)}</div>{tcfDrillAnswer&&<div className={`tcf-drill-feedback ${tcfDrillAnswer===tcfDrill.answer?"correct":"wrong"}`}><strong>{tcfDrillAnswer===tcfDrill.answer?"✓ Bonne réponse":`Réponse : ${tcfDrill.answer}`}</strong><p>{tcfDrill.note}</p><button onClick={()=>{setTcfDrillIndex(i=>(i+1)%taskDrills.length);setTcfDrillAnswer("")}}>Question suivante →</button></div>}</section>}
        {tcfMode==="write"&&<section className="writing-lab"><div className="writing-lab-head"><div><p className="eyebrow">ATELIER D’ÉCRITURE</p><h2>Sujet {tcfTopic%tcfTopics.length+1} / {tcfTopics.length}</h2></div><button onClick={()=>{setTcfTopic(i=>(i+1)%tcfTopics.length);setTcfChecks([false,false,false,false])}}>Changer de sujet ↻</button></div><div className="writing-prompt"><span>TÂCHE {tcfTask.number}</span><p>{tcfTopics[tcfTopic%tcfTopics.length]}</p></div><div className="writing-area"><label htmlFor="tcf-draft">Votre réponse <small>Le brouillon est enregistré sur cet appareil.</small></label><textarea id="tcf-draft" value={tcfDraft} onChange={event=>updateTcfDraft(event.target.value)} placeholder="Commencez à écrire ici…" spellCheck="true"/><div className={`word-meter ${tcfWordState}`}><span>{tcfWordCount} mots</span><i><b style={{width:`${Math.min(100,(tcfWordCount/tcfTask.max)*100)}%`}}/></i><small>{tcfWordState==="short"?`Encore ${tcfTask.min-tcfWordCount} mots minimum`:tcfWordState==="long"?`${tcfWordCount-tcfTask.max} mots en trop`:"Longueur parfaite"}</small></div></div><div className="tcf-checklist"><p className="eyebrow">AVANT DE TERMINER</p>{["J’ai respecté la consigne et le destinataire.","Mon texte suit la structure de la tâche.","J’ai utilisé des connecteurs variés.","J’ai relu les accords, verbes et accents."].map((item,i)=><label key={item}><input type="checkbox" checked={tcfChecks[i]} onChange={()=>setTcfChecks(checks=>checks.map((value,j)=>j===i?!value:value))}/><span>{item}</span></label>)}</div></section>}
        {tcfMode==="simulate"&&<section className="tcf-simulator"><div className="simulator-head"><div><p className="eyebrow">SIMULACRE COMPLET</p><h2>Les trois tâches, sans assistance</h2></div><button onClick={()=>{setTcfTopic(i=>i+1);setSimulationDrafts(["","",""])}}>Nouveau simulacre ↻</button></div><p className="simulator-note">Rédigez les trois réponses. Les compteurs vérifient les longueurs; vos textes restent sur cet appareil.</p>{tcfTasks.map((task,i)=><article key={task.id}><div className="sim-task-head"><span>TÂCHE {task.number}</span><strong>{task.words}</strong></div><p>{tcfPromptBank[task.id][tcfTopic%tcfPromptBank[task.id].length]}</p><textarea value={simulationDrafts[i]} onChange={event=>setSimulationDrafts(drafts=>drafts.map((draft,j)=>j===i?event.target.value:draft))} placeholder={`Votre réponse pour la tâche ${task.number}…`}/><small>{simulationCounts[i]} mots</small></article>)}</section>}
      </section>}
      {view === "time" && <section className="learn-view time-view">
        <header className="learn-heading"><div><p className="eyebrow">TCF · GRAMMAIRE ACTIVE</p><h1>Temps, <em>adverbes</em> et connecteurs</h1><p>Une expression par décision : comprends le sens, réponds, puis reviens sur tes erreurs.</p></div><div className="learn-total"><strong>{timeWrongIds.length}</strong><span>expressions<br/>à revoir</span></div></header>
        <div className="learn-layout"><aside className="lesson-list"><div><p>6 LEÇONS COURTES</p>{timeLessons.map(item=><button key={item.id} className={timeLesson.id===item.id?"selected":""} onClick={()=>chooseTimeLesson(item.id)}><span>{item.id==="review"?"✓":timeLessons.indexOf(item)+1}</span>{item.title.replace(/^\d+ · /,"")}</button>)}</div></aside>
        <article className="lesson-detail time-detail"><div className="lesson-meta"><span>TCF</span><span>{timeLesson.title}</span></div><p className="eyebrow">OBJECTIF</p><h2>{timeLesson.objective}</h2><div className="lesson-rule"><small>À SAVOIR</small><p>{timeLesson.note}</p></div><div className="time-table">{timeLesson.rows.map(row=><div key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><em>{row[2]}</em></div>)}</div><p className="lesson-objective"><b>Résumé :</b> {timeLesson.summary}</p>
        <div className="time-controls"><button className={timeOnlyErrors?"selected":""} onClick={()=>{setTimeOnlyErrors(v=>!v);setTimeIndex(0);resetTimeExercise();}}>Mes erreurs ({timeWrongIds.filter(id=>timeLessonExercises.some(q=>q.id===id)).length})</button><button onClick={()=>speakText(timeExercise.prompt)}>♪ Écouter la phrase</button></div>
        <div className="course-exercise time-exercise"><div className="course-exercise-meta"><span>{timeLesson.title}</span><span>{timeExercise.mode==="choice"?"CHOISIR":timeExercise.mode==="reorder"?"ORDONNER":timeExercise.mode==="correct"?"CORRIGER":"ÉCRIRE"}</span><small>{timeIndex%activeTimeExercises.length+1} / {activeTimeExercises.length}</small></div><h2>{timeExercise.prompt}</h2>
        {timeExercise.mode==="choice"&&<div className="choice-options">{timeExercise.options?.map(option=><button key={option} className={timeAnswer===option?"selected":""} onClick={()=>!timeResult&&setTimeAnswer(option)}>{option}</button>)}</div>}
        {timeExercise.mode==="reorder"&&<><div className="built-sentence">{timeTokens.map(item=>item.split(":")[1]).join(" ")||"…"}</div><div className="word-tokens">{timeExercise.tokens?.map((token,i)=><button key={token+"-"+i} disabled={timeTokens.includes(i+":"+token)} onClick={()=>{setTimeTokens(old=>[...old,i+":"+token]);setTimeAnswer(old=>[...old,token].join(" "))}}>{token}</button>)}</div><button className="clear-order" onClick={()=>{setTimeTokens([]);setTimeAnswer("");}}>Effacer</button></>}
        {["fill","translate","correct"].includes(timeExercise.mode)&&<><input className="course-answer" value={timeAnswer} onChange={event=>setTimeAnswer(event.target.value)} placeholder="Écrivez votre réponse en français" /><div className="accent-row">{["é","è","ê","ë","à","â","ç","î","ï","ô","ù","û","œ"].map(char=><button key={char} onClick={()=>setTimeAnswer(value=>value+char)}>{char}</button>)}</div></>}
        {!timeResult?<><button className="check-course" disabled={!timeAnswer.trim()} onClick={checkTimeExercise}>Vérifier</button>{timeAttempts>=3&&<p className="time-hint">Pista: {timeExercise.hint}</p>}</>:<div className={"course-feedback "+timeResult}><strong>{timeResult==="correct"?"✓ Correct !":"À revoir"}</strong><span>{timeResult==="correct"?timeExercise.answer:"Réponse : "+timeExercise.answer}</span><p>{timeExercise.explanation}</p>{timeResult==="wrong"&&timeAttempts>=3&&<p className="time-hint">Pista: {timeExercise.hint}</p>}{timeResult==="wrong"&&timeAttempts<3&&<button onClick={()=>{setTimeResult(null);setTimeAnswer("");setTimeTokens([]);}}>Réessayer</button>}<button onClick={nextTimeExercise}>Continuer →</button></div>}</div></article></div>
      </section>}

      {view === "themes" && <section className="inner-view"><p className="eyebrow">PARCOURS COMPLET</p><h1>Choisissez un thème</h1><p className="lead">Les contenus A1 et A2 de vos cours, organisés pour la mémoire active.</p><div className="unit-list">{units.map(key=>{const [l,u]=key.split("|");const set=cards.filter(c=>c.level===l&&c.unit===u);const done=set.filter(c=>(memory[c.id]?.reviews||0)>=2).length;return <button key={key} onClick={()=>{setLevel(l as "A1"|"A2");setIndex(cards.filter(c=>c.level===l).findIndex(c=>c.unit===u));setView("study")}}><span className="unit-level">{l}</span><div><strong>{u}</strong><small>{set.length} cartes · {done} acquises</small><i><b style={{width:`${done/set.length*100}%`}}/></i></div><span>→</span></button>})}</div></section>}

      {view === "progress" && <section className="inner-view"><p className="eyebrow">VOTRE PROGRESSION</p><h1>Chaque compétence compte</h1><p className="lead">Les leçons, les histoires, la pratique active et la répétition espacée avancent ensemble.</p><div className="stats-grid"><article><small>LEÇONS TERMINÉES</small><strong>{completedLessons.length}</strong><span>sur {lessons.length}</span></article><article><small>HISTOIRES MÉMORISÉES</small><strong>{completedStories.length}</strong><span>sur {stories.length}</span></article><article><small>PRATIQUE ACTIVE</small><strong>{courseStats.correct}</strong><span>bonnes réponses sur {courseStats.total}</span></article><article><small>CARTES ACQUISES</small><strong>{learned}</strong><span>sur {cards.length}</span></article><article><small>SÉRIE ACTUELLE</small><strong>{streak}</strong><span>jours</span></article></div><div className="memory-note"><div>✦</div><div><h2>Un contenu n’est maîtrisé qu’après l’avoir produit</h2><p>Apprenez la règle, observez-la dans une histoire, reconstruisez les phrases, puis retrouvez-la plus tard dans les cartes.</p></div></div><button className="reset" onClick={()=>{if(confirm("Effacer tout votre progrès ?")){localStorage.removeItem("bravo-memoire");localStorage.removeItem("bravo-lessons");localStorage.removeItem("bravo-stories");localStorage.removeItem("bravo-course-stats");setMemory({});setCompletedLessons([]);setCompletedStories([]);setCourseStats({correct:0,total:0});setTodayReviews(0);setStreak(0)}}}>Recommencer le parcours</button></section>}
    </section>

    <nav className="mobile-nav"><button className={view==="home"?"active":""} onClick={()=>setView("home")}><span>⌂</span>Jour</button><button className={view==="learn"?"active":""} onClick={()=>setView("learn")}><span>◇</span>Apprendre</button><button className={view==="stories"?"active":""} onClick={()=>setView("stories")}><span>◫</span>Histoires</button><button className={view==="practice"?"active":""} onClick={()=>setView("practice")}><span>✎</span>Pratique</button><button className={view==="verbs"?"active":""} onClick={()=>setView("verbs")}><span>V</span>Verbos</button><button className={view==="tcf"?"active":""} onClick={()=>setView("tcf")}><span>TCF</span>Écrire</button><button className={view==="time"?"active":""} onClick={()=>setView("time")}><span>◷</span>Temps</button><button className={view==="progress"?"active":""} onClick={()=>setView("progress")}><span>↗</span>Progrès</button></nav>
  </main>
}
