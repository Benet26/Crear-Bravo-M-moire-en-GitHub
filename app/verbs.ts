export type Subject = "je" | "tu" | "il" | "elle" | "nous" | "vous" | "ils" | "elles";
export type Tense = "présent" | "passé composé" | "imparfait" | "futur proche" | "futur simple";

export type Verb = {
  id: string; infinitive: string; es: string; en: string; pronunciation: string;
  forms: Record<Tense, Record<Subject, string>>;
};

const subjects: Subject[] = ["je","tu","il","elle","nous","vous","ils","elles"];
const endings = (values: string[]) => Object.fromEntries(subjects.map((subject, index) => [subject, values[index]])) as Record<Subject,string>;
const er = (stem: string, past: string, future = `${stem}er`): Verb["forms"] => ({
  "présent": endings([`${stem}e`,`${stem}es`,`${stem}e`,`${stem}e`,`${stem}ons`,`${stem}ez`,`${stem}ent`,`${stem}ent`]),
  "passé composé": endings([`ai ${past}`,`as ${past}`,`a ${past}`,`a ${past}e`,`avons ${past}`,`avez ${past}`,`ont ${past}s`,`ont ${past}es`]),
  "imparfait": endings([`${stem}ais`,`${stem}ais`,`${stem}ait`,`${stem}ait`,`${stem}ions`,`${stem}iez`,`${stem}aient`,`${stem}aient`]),
  "futur proche": endings([`vais ${stem}er`,`vas ${stem}er`,`va ${stem}er`,`va ${stem}er`,`allons ${stem}er`,`allez ${stem}er`,`vont ${stem}er`,`vont ${stem}er`]),
  "futur simple": endings([`${future}ai`,`${future}as`,`${future}a`,`${future}a`,`${future}ons`,`${future}ez`,`${future}ont`,`${future}ont`]),
});

export const verbs: Verb[] = [
  {id:"parler",infinitive:"parler",es:"hablar",en:"to speak",pronunciation:"par-lé",forms:er("parl","parlé")},
  {id:"aimer",infinitive:"aimer",es:"gustar / amar",en:"to like / love",pronunciation:"e-mé",forms:er("aim","aimé")},
  {id:"travailler",infinitive:"travailler",es:"trabajar",en:"to work",pronunciation:"tra-va-yé",forms:er("travaill","travaillé")},
  {id:"finir",infinitive:"finir",es:"terminar",en:"to finish",pronunciation:"fi-nir",forms:{
    "présent":endings(["finis","finis","finit","finit","finissons","finissez","finissent","finissent"]),"passé composé":endings(["ai fini","as fini","a fini","a fini","avons fini","avez fini","ont fini","ont fini"]),"imparfait":endings(["finissais","finissais","finissait","finissait","finissions","finissiez","finissaient","finissaient"]),"futur proche":endings(["vais finir","vas finir","va finir","va finir","allons finir","allez finir","vont finir","vont finir"]),"futur simple":endings(["finirai","finiras","finira","finira","finirons","finirez","finiront","finiront"])}},
  {id:"etre",infinitive:"être",es:"ser / estar",en:"to be",pronunciation:"etr",forms:{
    "présent":endings(["suis","es","est","est","sommes","êtes","sont","sont"]),"passé composé":endings(["ai été","as été","a été","a été","avons été","avez été","ont été","ont été"]),"imparfait":endings(["étais","étais","était","était","étions","étiez","étaient","étaient"]),"futur proche":endings(["vais être","vas être","va être","va être","allons être","allez être","vont être","vont être"]),"futur simple":endings(["serai","seras","sera","sera","serons","serez","seront","seront"])}},
  {id:"avoir",infinitive:"avoir",es:"tener",en:"to have",pronunciation:"a-vuar",forms:{
    "présent":endings(["ai","as","a","a","avons","avez","ont","ont"]),"passé composé":endings(["ai eu","as eu","a eu","a eu","avons eu","avez eu","ont eu","ont eu"]),"imparfait":endings(["avais","avais","avait","avait","avions","aviez","avaient","avaient"]),"futur proche":endings(["vais avoir","vas avoir","va avoir","va avoir","allons avoir","allez avoir","vont avoir","vont avoir"]),"futur simple":endings(["aurai","auras","aura","aura","aurons","aurez","auront","auront"])}},
  {id:"aller",infinitive:"aller",es:"ir",en:"to go",pronunciation:"a-lé",forms:{
    "présent":endings(["vais","vas","va","va","allons","allez","vont","vont"]),"passé composé":endings(["suis allé","es allé","est allé","est allée","sommes allés","êtes allés","sont allés","sont allées"]),"imparfait":endings(["allais","allais","allait","allait","allions","alliez","allaient","allaient"]),"futur proche":endings(["vais aller","vas aller","va aller","va aller","allons aller","allez aller","vont aller","vont aller"]),"futur simple":endings(["irai","iras","ira","ira","irons","irez","iront","iront"])}},
  {id:"faire",infinitive:"faire",es:"hacer",en:"to do / make",pronunciation:"fer",forms:{
    "présent":endings(["fais","fais","fait","fait","faisons","faites","font","font"]),"passé composé":endings(["ai fait","as fait","a fait","a fait","avons fait","avez fait","ont fait","ont fait"]),"imparfait":endings(["faisais","faisais","faisait","faisait","faisions","faisiez","faisaient","faisaient"]),"futur proche":endings(["vais faire","vas faire","va faire","va faire","allons faire","allez faire","vont faire","vont faire"]),"futur simple":endings(["ferai","feras","fera","fera","ferons","ferez","feront","feront"])}},
];

export const lexicalPatterns = [
  {es:"-ción",fr:"-tion",example:"información → information",note:"Muy frecuente; atención a estación → gare (no *station* en todos los contextos)."},
  {es:"-dad",fr:"-té",example:"libertad → liberté",note:"No es automática: ciudad → ville."},
  {es:"-ico",fr:"-ique",example:"économico → économique",note:"Falso amigo: sensible significa sensible, no sensato."},
  {es:"-mente",fr:"-ment",example:"normalmente → normalement",note:"Se forma a menudo desde el femenino: vrai → vraiment."},
];

export const subjectLabels: Record<Subject,string> = {je:"je",tu:"tu",il:"il",elle:"elle",nous:"nous",vous:"vous",ils:"ils",elles:"elles"};
