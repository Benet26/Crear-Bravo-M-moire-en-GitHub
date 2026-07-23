export type Subject = "je" | "tu" | "il" | "elle" | "nous" | "vous" | "ils" | "elles";
export type Tense = "prÃ©sent" | "passÃ© composÃ©" | "imparfait" | "futur proche" | "futur simple";

export type Verb = {
  id: string; infinitive: string; es: string; en: string; pronunciation: string;
  forms: Record<Tense, Record<Subject, string>>;
};

const subjects: Subject[] = ["je","tu","il","elle","nous","vous","ils","elles"];
const endings = (values: string[]) => Object.fromEntries(subjects.map((subject, index) => [subject, values[index]])) as Record<Subject,string>;
const er = (stem: string, past: string, future = `${stem}er`): Verb["forms"] => ({
  "prÃ©sent": endings([`${stem}e`,`${stem}es`,`${stem}e`,`${stem}e`,`${stem}ons`,`${stem}ez`,`${stem}ent`,`${stem}ent`]),
  "passÃ© composÃ©": endings([`ai ${past}`,`as ${past}`,`a ${past}`,`a ${past}e`,`avons ${past}`,`avez ${past}`,`ont ${past}s`,`ont ${past}es`]),
  "imparfait": endings([`${stem}ais`,`${stem}ais`,`${stem}ait`,`${stem}ait`,`${stem}ions`,`${stem}iez`,`${stem}aient`,`${stem}aient`]),
  "futur proche": endings([`vais ${stem}er`,`vas ${stem}er`,`va ${stem}er`,`va ${stem}er`,`allons ${stem}er`,`allez ${stem}er`,`vont ${stem}er`,`vont ${stem}er`]),
  "futur simple": endings([`${future}ai`,`${future}as`,`${future}a`,`${future}a`,`${future}ons`,`${future}ez`,`${future}ont`,`${future}ont`]),
});

export const verbs: Verb[] = [
  {id:"parler",infinitive:"parler",es:"hablar",en:"to speak",pronunciation:"par-lÃ©",forms:er("parl","parlÃ©")},
  {id:"aimer",infinitive:"aimer",es:"gustar / amar",en:"to like / love",pronunciation:"e-mÃ©",forms:er("aim","aimÃ©")},
  {id:"travailler",infinitive:"travailler",es:"trabajar",en:"to work",pronunciation:"tra-va-yÃ©",forms:er("travaill","travaillÃ©")},
  {id:"finir",infinitive:"finir",es:"terminar",en:"to finish",pronunciation:"fi-nir",forms:{
    "prÃ©sent":endings(["finis","finis","finit","finit","finissons","finissez","finissent","finissent"]),"passÃ© composÃ©":endings(["ai fini","as fini","a fini","a fini","avons fini","avez fini","ont fini","ont fini"]),"imparfait":endings(["finissais","finissais","finissait","finissait","finissions","finissiez","finissaient","finissaient"]),"futur proche":endings(["vais finir","vas finir","va finir","va finir","allons finir","allez finir","vont finir","vont finir"]),"futur simple":endings(["finirai","finiras","finira","finira","finirons","finirez","finiront","finiront"])}},
  {id:"etre",infinitive:"Ãªtre",es:"ser / estar",en:"to be",pronunciation:"etr",forms:{
    "prÃ©sent":endings(["suis","es","est","est","sommes","Ãªtes","sont","sont"]),"passÃ© composÃ©":endings(["ai Ã©tÃ©","as Ã©tÃ©","a Ã©tÃ©","a Ã©tÃ©","avons Ã©tÃ©","avez Ã©tÃ©","ont Ã©tÃ©","ont Ã©tÃ©"]),"imparfait":endings(["Ã©tais","Ã©tais","Ã©tait","Ã©tait","Ã©tions","Ã©tiez","Ã©taient","Ã©taient"]),"futur proche":endings(["vais Ãªtre","vas Ãªtre","va Ãªtre","va Ãªtre","allons Ãªtre","allez Ãªtre","vont Ãªtre","vont Ãªtre"]),"futur simple":endings(["serai","seras","sera","sera","serons","serez","seront","seront"])}},
  {id:"avoir",infinitive:"avoir",es:"tener",en:"to have",pronunciation:"a-vuar",forms:{
    "prÃ©sent":endings(["ai","as","a","a","avons","avez","ont","ont"]),"passÃ© composÃ©":endings(["ai eu","as eu","a eu","a eu","avons eu","avez eu","ont eu","ont eu"]),"imparfait":endings(["avais","avais","avait","avait","avions","aviez","avaient","avaient"]),"futur proche":endings(["vais avoir","vas avoir","va avoir","va avoir","allons avoir","allez avoir","vont avoir","vont avoir"]),"futur simple":endings(["aurai","auras","aura","aura","aurons","aurez","auront","auront"])}},
  {id:"aller",infinitive:"aller",es:"ir",en:"to go",pronunciation:"a-lÃ©",forms:{
    "prÃ©sent":endings(["vais","vas","va","va","allons","allez","vont","vont"]),"passÃ© composÃ©":endings(["suis allÃ©","es allÃ©","est allÃ©","est allÃ©e","sommes allÃ©s","Ãªtes allÃ©s","sont allÃ©s","sont allÃ©es"]),"imparfait":endings(["allais","allais","allait","allait","allions","alliez","allaient","allaient"]),"futur proche":endings(["vais aller","vas aller","va aller","va aller","allons aller","allez aller","vont aller","vont aller"]),"futur simple":endings(["irai","iras","ira","ira","irons","irez","iront","iront"])}},
  {id:"faire",infinitive:"faire",es:"hacer",en:"to do / make",pronunciation:"fer",forms:{
    "prÃ©sent":endings(["fais","fais","fait","fait","faisons","faites","font","font"]),"passÃ© composÃ©":endings(["ai fait","as fait","a fait","a fait","avons fait","avez fait","ont fait","ont fait"]),"imparfait":endings(["faisais","faisais","faisait","faisait","faisions","faisiez","faisaient","faisaient"]),"futur proche":endings(["vais faire","vas faire","va faire","va faire","allons faire","allez faire","vont faire","vont faire"]),"futur simple":endings(["ferai","feras","fera","fera","ferons","ferez","feront","feront"])}},
];

export const lexicalPatterns = [
  {es:"-ciÃ³n",fr:"-tion",example:"informaciÃ³n â†’ information",note:"Muy frecuente; atenciÃ³n a estaciÃ³n â†’ gare (no *station* en todos los contextos)."},
  {es:"-dad",fr:"-tÃ©",example:"libertad â†’ libertÃ©",note:"No es automÃ¡tica: ciudad â†’ ville."},
  {es:"-ico",fr:"-ique",example:"Ã©conomico â†’ Ã©conomique",note:"Falso amigo: sensible significa sensible, no sensato."},
  {es:"-mente",fr:"-ment",example:"normalmente â†’ normalement",note:"Se forma a menudo desde el femenino: vrai â†’ vraiment."},
];

export const subjectLabels: Record<Subject,string> = {je:"je",tu:"tu",il:"il",elle:"elle",nous:"nous",vous:"vous",ils:"ils",elles:"elles"};

