//jshint esversion:6

let state = {
    currentPage : "home",
};

window.history.replaceState(state, null, "");

window.onpopstate = function (event) {
    if(event.state){
        state = event.state;
    }

    Render(state);
};

function Render(state){
    switch (state.currentPage) {
        case "home":
            ReloadPage();
            break;
        case "learnSetup":
            BuildLearnSetupPage();
            break;
        case "learn":
            BuildLearnSetupPage();
            break;
        case "practiceSetup":
            BuildPracticeSetupPage();
            break;
        case "practice":
            BuildPracticeSetupPage();
            break;
        default:
            break;
    }
}

let learnSets = [];
let currentSet = [];

let instrucciones = {
    home : 'Selecciona la opcion que quieres. Puedes aprender las letras de Hiragana/Katakana desde 0 o practicarlas si ya las sabes.', 
    aprender : `Selecciona cuales Kana quieres aprender y luego presiona 'Aprender' al fondo de la pagina.`,
    practicar : `Selecciona cuales Kana quieres practicar y luego presiona 'Empezar' al fondo de la pagina.`,
    kanatable : `Ingresa en cada tarjeta la lectura en romaji del Kana.(Recuerda apretar 'Enter' para confirmar tu respuesta)`,
    explanation : `Aqui veras un poco de informacion adicional referente a este set de Kanas.`,
    kanalearn : 'Estudia estas tarjetas para luego responder un Quiz.(Intenta escribir un par de veces estas letras si no las conocias.)',
    kanaquiz : 'Selecciona de las opciones abajo el romaji correcto, puedes repetir el Quiz las veces que quieras antes de continuar.',
};

function KanaToInfo(kana){
    if(infotext[kana] === ''){
        return '...';
    }

    let symbol = 'ⓘ ';
    let info = symbol.concat(infotext[kana]);

    if(info != null){
        return info;
    }else{
        console.log(info);
    }
}

const infotext = {
    あ : 'La letra あ(a) se puede confundir con la letra お(o).',
    い : '',
    う : '',
    え : '',
    お : 'La letra お(o) se puede confundir con la letra あ(a).',
    か : `La letra か se parece a su contraparte Katakana カ`,
    き : 'La parte superior de き se puede ocupar para recordar su contraparte Katakana キ',
    く : ``,
    け : '',
    こ : 'La letras こ se parece a su contraparte Katakana コ',
    さ : ``,
    し : `Sonido 'Shi' suave en comparacion a ち 'Chi'.`,
    す : `El sonido de la 'u' en す es muchas veces omitido, por ejemplo です se suele decir 'des'.`,
    せ : `La letra せ se parece a su contraparte Katakana セ`,
    そ : `Ten cuidado con confundir esta letra por el sonido 'Zo' por la forma de la letra parecida a una 'Z'`,
    た : 'La letra た se puede confundir con la letra な(na), nota que las dos comparten un tipo de cruz a la izquierda.',
    ち : `Esta letra es una excepcion en la fila de た, su lectura es 'chi'.`,
    つ : `Esta letra es una excepcion en la fila de た, su lectura es 'tsu'.`,
    て : ``,
    と : '',
    な : 'La letra な se puede confundir con la letra た(ta), nota que las dos comparten un tipo de cruz a la izquierda.',
    に : 'La letra に se puede confundir con la letra こ(ko), no olvides escribir la varita vertical en に.',
    ぬ : 'Esta letra comparte la base con otras 2 letras: の(no), め(me), ぬ(nu).',
    ね : 'Esta letra comparte la base con otras 2 letras: わ(wa), れ(re), ね(ne).',
    の : 'Esta letra comparte la base con otras 2 letras: の(no), め(me), ぬ(nu).',
    は : `La letra は(Ha) se puede confundir con la letra ほ(Ho).`,
    ひ : ``,
    ふ : `Esta letra es un excepcion y su lectura es 'Fu'.`,
    へ : `Tambien puede ser ocupado como particula y su lectura pasa a ser 'E'.`,
    ほ : 'La letra ほ(ho) se puede confundir con la letra は(ha) y la letra ま(ma).',
    ま : 'Esta letra se puede confundir con la letra ほ(ho).',
    み : '',
    む : '',
    め : 'Esta letra comparte la base con otras 2 letras: の(no), め(me), ぬ(nu).',
    も : 'La letra も(mo) tiene un parecido con su contraparte Katakana モ(mo).',
    や : `Esta letra se parece a su contraparte Katakana ヤ(ya). El sonido 'ya' se puede confundir con el sonido de じゃ.`,
    ゆ : `El sonido de esta letra 'yu' se puede confundir con el sonido de じゅ.`,
    よ : `El sonido de esta letra 'yo' se puede confundir con el sonido de じょ.`,
    ら : 'La letra ら(ra) parece un numero 5 y tambien se parece a su contraparte Katakana ラ(ra).',
    り : 'Esta letra es parecida a su contraparte Katakana リ(ri).',
    る : 'La letra る(ru) se puede confundir con la letra ろ(ro).',
    れ : 'Esta letra comparte la base con otras 2 letras: わ(wa), れ(re), ね(ne).',
    ろ : 'La letra ろ(ro) se puede confundir con la letra る(ru).',
    わ : 'Esta letra comparte la base con otras 2 letras: わ(wa), れ(re), ね(ne).',
    を : `Esta letra es solo ocupada como particula en frases y si bien su escritura Romaji es 'wo' se dice 'o'.`,
    ん : `La unica consonante solitaria.`,
    が : 'La marca Dakuten: ゛se utiliza para cambiar el sonido de las letras.',
    ぎ : `El sonido de 'K' pasa a ser 'G'.`,
    ぐ : `El sonido de 'K' pasa a ser 'G'.`,
    げ : `El sonido de 'K' pasa a ser 'G'.`,
    ご : `El sonido de 'K' pasa a ser 'G'.`,
    ざ : `La marca Dakuten: ゛se utiliza para cambiar el sonido de las letras, en este caso el sonido 'sa' pasa a ser 'za'.`,
    じ : `La letra 'shi' es un caso especial, el sonido 'shi' pasa a ser 'lli' pero recuerda escribirlo con 'J'.`,
    ず : `El sonido 'su' pasa a ser 'zu'.`,
    ぜ : `El sonido 'se' pasa a ser 'ze'.`,
    ぞ : `El sonido 'so' pasa a ser 'zo'.`,
    だ : `La marca Dakuten: ゛se utiliza para cambiar el sonido de las letras, en este caso el sonido 'ta' pasa a ser 'da'.`,
    ぢ : `La letra ぢ es un caso especial, el sonido pasa de 'chi' a 'lli' tal como じ pero para escribirla en un teclado tienes que escribir "di".`,
    づ : `La letra づ es un caso especial, el sonido pasa de 'tsu' a algo como 'dzu'. Para escribirla en un te clado ingresa "du".`,
    で : `El sonido 'te' pasa a ser 'de'.`,
    ど : `El sonido 'to' pasa a ser 'do'.`,
    ば : `La marca Dakuten: ゛se utiliza para cambiar el sonido de las letras, en este caso el sonido 'ja' pasa a ser 'ba', recuerda que el romaji se escribe con "H".`,
    び : `El sonido 'ji' pasa a ser 'bi', recuerda que el Romaji se escribe con "H".`,
    ぶ : `Si bien ふ es una letra especial y su sonido original es 'fu', con Dakuten sigue la reglar y suena 'bu'.`,
    べ : `El sonido 'je' pasa a ser 'be'.`,
    ぼ : `El sonido 'jo' pasa a ser 'zu'.`,
    ぱ : `La marca Dakuten: ゛se utiliza para cambiar el sonido de las letras, en este caso el sonido 'ja' pasa a ser 'pa'.`,
    ぴ : `El sonido 'ji' pasa a ser 'pi'.`,
    ぷ : `Si bien ふ es una letra especial y su sonido original es 'fu', con Dakuten sigue la reglar y suena 'pu'.`,
    ぺ : `El sonido 'je' pasa a ser 'pe'.`,
    ぽ : `El sonido 'jo' pasa a ser 'po'.`,
    きゃ : '',
    きゅ : '',
    きょ : '',
    しゃ : '',
    しゅ : '',
    しょ : '',
    ちゃ : '',
    ちゅ : '',
    ちょ : '',
    にゃ : '',
    にゅ : '',
    にょ : '',
    ひゃ : '',
    ひゅ : '',
    ひょ : '',
    みゃ : '',
    みゅ : '',
    みょ : '',
    りゃ : '',
    りゅ : '',
    りょ : '',
    ぎゃ : '',
    ぎゅ : '',
    ぎょ : '',
    じゃ : '',
    じゅ : '',
    じょ : '',
    びゃ : '',
    びゅ : '',
    びょ : '',
    ぴゃ : '',
    ぴゅ : '',
    ぴょ : '',
    ア : '',
    イ : '',
    ウ : '',
    エ : '',
    オ : '',
    カ : '',
    キ : '',
    ク : '',
    ケ : '',
    コ : '',
    サ : '',
    シ : '',
    ス : '',
    セ : '',
    ソ : '',
    タ : '',
    チ : '',
    ツ : '',
    テ : '',
    ト : '',
    ナ : '',
    ニ : '',
    ヌ : '',
    ネ : '',
    ノ : '',
    ハ : '',
    ヒ : '',
    フ : '',
    ヘ : '',
    ホ : '',
    マ : '',
    ミ : '',
    ム : '',
    メ : '',
    モ : '',
    ヤ : '',
    ユ : '',
    ヨ : '',
    ラ : '',
    リ : '',
    ル : '',
    レ : '',
    ロ : '',
    ワ : '',
    ヲ : '',
    ン : '',
    ガ : '',
    ギ : '',
    グ : '',
    ゲ : '',
    ゴ : '',
    ザ : '',
    ジ : '',
    ズ : '',
    ゼ : '',
    ゾ : '',
    ダ : '',
    ヂ : '',
    ヅ : '',
    デ : '',
    ド : '',
    バ : '',
    ビ : '',
    ブ : '',
    ベ : '',
    ボ : '',
    パ : '',
    ピ : '',
    プ : '',
    ペ : '',
    ポ : '',
    キャ : '',
    キュ : '',
    キョ : '',
    シャ : '',
    シュ : '',
    ショ : '',
    チャ : '',
    チュ : '',
    チョ : '',
    ニャ : '',
    ニュ : '',
    ニョ : '',
    ヒャ : '',
    ヒュ : '',
    ヒョ : '',
    ミャ : '',
    ミュ : '',
    ミョ : '',
    リャ : '',
    リュ : '',
    リョ : '',
    ギャ : '',
    ギュ : '',
    ギョ : '',
    ジャ : '',
    ジュ : '',
    ジョ : '',
    ビャ : '',
    ビュ : '',
    ビョ : '',
    ピャ : '',
    ピュ : '',
    ピョ : '',
    ツァ : '',
    ファ : '',
    ヴァ : '',
    ウィ : '',
    ティ : '',
    フィ : '',
    ディ : '',
    ヴィ : '',
    セィ : '',
    トゥ : '',
    ドゥ : '',
    デュ : '',
    フュ : '',
    ウェ : '',
    シェ : '',
    チェ : '',
    ツェ : '',
    フェ : '',
    ジェ : '',
    ヴェ : '',
    ウォ : '',
    ツォ : '',
    フォ : '',
    ヴォ : '',
};

const explanationtext = {
    あ : `Estas 5 kanas corresponden a los sonidos de las vocales, su orden es diferente al del español : 
        \n'a, i, u, e, o'. 
        \n\n Este mismo orden se repite con las demas letras, por ejemplo : \n 'ka, ki, ku, ke, ko', \n 'ma, mi, mu, me, mo'.`,
    か : `Las letras de la fila か representan los sonidos:
        \nKa, Ki, Ku, Ku, Ko.
        \n\nLa fila de か se puede transformar del sonido de 'K' a el sonido de 'G' suave con la marca Dakuten ゛.
        \n\nPor ejemplo け = Ke, pero げ = Ge como en 'Guerra'.`,
    さ : `La fila de la letra さ representa los sonidos de la letra 'S', suena como uno lo esperaria, con la excepcion de し que se lee y escribe 'Shi'.
        \n\nPara lograr los sonidos con Z se ocupan estas mismas letras pero con la marca Dakuten ゛.
        \nPor ejemplo そ = so, pero ぞ = zo.
        \nEl sonido de し pasa a ser 'lli' de 'apellido' cuando se le agrega dakuten, pero es escrito con 'J'.
        \nEntonces, じ se escribe "ji" pero se dice 'lli'.`,
    た : `La fila de た representa los sonidos de la letra 'T', existen 2 excepciones, ち y つ que son escritas como "Chi" y "Tsu" respectivamente.
        \nLa letra つ tiene una forma mini (つ tsu grande, っ tsu chico) se puede ocupar para 'duplicar' la consonante que la sigue, por ejemplo : \nあさって(asatte), ざっし(zasshi).
        \nSi necesitas escribir esta version mini por si sola o cualquier otra de las versiones minis de las letras solo agrega una 'x' primero, asi : \n'xtsu' = 'っ', 'xya' = 'ゃ'.
        \nLa fila de た se puede transformar del sonido de 'T' a el sonido de 'D' con la marca Dakuten ゛.
        \nPor ejemplo と = To, pero ど = Do.
        \nLa letra ぢ cambia al sonido 'lli' al igual que じ pero para escribir ぢ en teclado tienes que escribir "di".
        \nLa letra づ cambia a un sonido como 'dzu' y para escribirlo en teclado tienes que escribir "du".`,
    な : ``,
    は : `La lectura de la fila は es como la J en el español, は suena como 'Ja' en 'Jabon', へ suena como 'Je' en 'Jefa' pero cuando escribes el romaji debe ser con la letra "H".
        \nLa letra 'は' en especifico puede ser utilizada como particula y en tal caso su lectura es 'Wa'.
        \nLa letra へ puede ser ocupado como particula tambien y en tal caso su lectura es 'E'.
        \nEsta fila puede pasar del sonido 'J' al sonido 'B' y 'P' con Dakuten ゛ y Handakuten ゜respectivamente. Por ejemplo ひ(hi), び(bi), ぴ(pi).
        \nDentro de esta fila la letra ふ es una excepcion y su lectura y escritura es 'Fu'.`,
    ま : ``,
    や : `Esta fila representa los sonidos de la letra 'Y'.
        \n'Ya, Yu, Yo'
        \nSolo contiene 3 letras pero estas tambien pueden ser utilizadas mezclandolas con otras Kanas de la linea 'i' como き(ki), に(ni), etc.
        \nPara hacer estas combinaciones la letra debe estar en su version mini,\n や = Ya grande, ゃ = Ya mini.
        \nPor ejemplo: きゃ(kya), りゅ(ryu), みょ(myo).
        \n\nTen cuidado con las letras し y ち ya que combinados con esta fila pierden el sonido 'Y'.
        \nEntonces: \nしゃ(sha), しゅ(shu)、しょ(sho). \nちゃ(cha), ちゅ(chu), ちょ(cho).`,
    ら : ``,
    わ : `Esta fila representa los sonidos de la letra 'W'* y solo contiene 2 letras, わ(wa) y を(wo).
        \n*を es solo ocupada como particula dentro de frases y se dice 'o'.
        \nLa letras ん no forma parte de esta fila pero fue agregada aqui para simplificar los botones.
        Para escribir la letra ん en teclado tienes que escribir lo siguiente 'nn'.
        \nRecuerda que para los sonidos 'na', 'ni', 'nu', 'ne', 'no' ya existen Kanas y no puedes combinar la letra ん con las vocales para crear esos sonidos.`,
    が : ``,
    ざ : ``,
    だ : ``,
    ば : ``,
    ぱ : ``,
    きゃ : ``,
    しゃ : ``,
    ちゃ : ``,
    にゃ : ``,
    ひゃ : ``,
    みゃ : ``,
    りゃ : ``,  
    ぎゃ : ``,
    じゃ : ``,
    びゃ : ``,
    ぴゃ : ``, 
    ア : ``,
    カ : `Reemplaza algunas silabas de la letra 'C' del español como 'Ca' en 'Camion', 'Cu' como en 'Cuello' y 'Co' de 'Comida'.
        \nSonidos como 'Que', 'Qui' tambien pueden ser representados con estas letras.`,
    サ : ``,
    タ : ``,
    ナ : ``,
    ハ : ``,
    マ : ``,
    ヤ : ``,
    ラ : ``,
    ワ : ``,
    ガ : ``,
    ザ : ``,
    ダ : ``,
    バ : ``,
    パ : ``,
    キャ : ``,
    シャ : ``,
    チャ : ``,
    ニャ : ``,
    ヒャ : ``,
    ミャ : ``,
    リャ : ``,  
    ギャ : ``,
    ジャ : ``,
    ビャ : ``,
    ピャ : ``, 
    ツァ : ``,
    ウィ : ``,
    トゥ : ``,
    ウェ : ``,
    ウォ : ``,
};

function FindAllBaseGroup(kana){
    let basekey;

    if(mainkanasets.hasOwnProperty(kana) || mainkatakanasets.hasOwnProperty(kana)){
        basekey = 'all-base';
        return basekey;
    }

    if(dakutenkanasets.hasOwnProperty(kana) || dakutenkatakanasets.hasOwnProperty(kana)){
        basekey = 'all-dakuten';
        return basekey;
    }

    if(combkanasets.hasOwnProperty(kana) || combkatakanasets.hasOwnProperty(kana)){
        basekey = 'all-comb';
        return basekey;
    }

    if(extrasets.hasOwnProperty(kana) || combkatakanasets.hasOwnProperty(kana)){
        basekey = 'all-extra';
        return basekey;
    }
    
    return 'null';
}

function FindBaseGroup(kana){
    let basekey;

    if(mainkanasets.hasOwnProperty(kana)){
        basekey = 'all-hiragana-base';
        return basekey;
    }

    if(dakutenkanasets.hasOwnProperty(kana)){
        basekey = 'all-hiragana-dakuten';
        return basekey;
    }

    if(combkanasets.hasOwnProperty(kana)){
        basekey = 'all-hiragana-comb';
        return basekey;
    }

    if(mainkatakanasets.hasOwnProperty(kana)){
        basekey = 'all-katakana-base';
        return basekey;
    }

    if(dakutenkatakanasets.hasOwnProperty(kana)){
        basekey = 'all-katakana-dakuten';
        return basekey;
    }

    if(combkatakanasets.hasOwnProperty(kana)){
        basekey = 'all-katakana-comb';
        return basekey;
    }

    if(extrasets.hasOwnProperty(kana)){
        basekey = 'all-extra';
        return basekey;
    }
    
    return 'null';
}

function BaseToObject(base){
    switch (base) {
        case 'all-base':
            return allmainbase;
        case 'all-dakuten':
            return alldakuten;
        case 'all-comb':
            return allcomb;
        case 'all-hiragana-base':
            return mainkanasets;
        case 'all-hiragana-dakuten':
            return dakutenkanasets;
        case 'all-hiragana-comb':
            return combkanasets;
        case 'all-katakana-base':
            return mainkatakanasets;
        case 'all-katakana-dakuten':
            return dakutenkatakanasets;
        case 'all-katakana-comb':
            return combkatakanasets;
        case 'all-extra':
            return extrasets;
    }
}

//que hace esta funcion ? parece cambiar una base a un label
function BaseToGroupLabel(base){
    let groupLabel;
    switch (base) {
        case 'all-base':
            groupLabel = ['all-hiragana-base', 'all-katakana-base'];
            break;
        case 'all-dakuten':
            groupLabel = ['all-hiragana-dakuten', 'all-katakana-dakuten'];
            break;
        case 'all-comb':
            groupLabel = ['all-hiragana-comb', 'all-katakana-comb'];
            break;
        case 'all-extra':
            groupLabel = ['all-extra'];
    }

    return groupLabel;
}

const extrasets = {
    ツァ : ['ツァ','ファ','ヴァ'],
    ウィ : ['ウィ','ティ','フィ','ディ','セィ','ヴィ'],
    トゥ : ['トゥ','ドゥ','デュ','フュ'],
    ウェ : ['ウェ','シェ','チェ','ツェ','フェ','ジェ','ヴェ'],
    ウォ : ['ウォ','ツォ','フォ','ヴォ'],
};

const mainkanasets = {
    あ : ['あ','い','う','え','お'],
    か : ['か','き','く','け','こ'],
    さ : ['さ','し','す','せ','そ'],
    た : ['た','ち','つ','て','と'],
    な : ['な','に','ぬ','ね','の'],
    は : ['は','ひ','ふ','へ','ほ'],
    ま : ['ま','み','む','め','も'],
    や : ['や','ゆ','よ'],
    ら : ['ら','り','る','れ','ろ'],
    わ : ['わ','を','ん'],
};

const dakutenkanasets = {
    が : ['が','ぎ','ぐ','げ','ご'],
    ざ : ['ざ','じ','ず','ぜ','ぞ'],
    だ : ['だ','ぢ','づ','で','ど'],
    ば : ['ば','び','ぶ','べ','ぼ'],
    ぱ : ['ぱ','ぴ','ぷ','ぺ','ぽ'],   
};

const combkanasets = {   
    きゃ : ['きゃ','きゅ','きょ'],
    しゃ : ['しゃ','しゅ','しょ'],
    ちゃ : ['ちゃ','ちゅ','ちょ'],
    にゃ : ['にゃ','にゅ','にょ'],
    ひゃ : ['ひゃ','ひゅ','ひょ'],
    みゃ : ['みゃ','みゅ','みょ'],
    りゃ : ['りゃ','りゅ','りょ'],  
    ぎゃ : ['ぎゃ','ぎゅ','ぎょ'],
    じゃ : ['じゃ','じゅ','じょ'],
    びゃ : ['びゃ','びゅ','びょ'],
    ぴゃ : ['ぴゃ','ぴゅ','ぴょ'], 
};

const mainkatakanasets = {
    ア : ['ア','イ','ウ','エ','オ'],
    カ : ['カ','キ','ク','ケ','コ'],
    サ : ['サ','シ','ス','セ','ソ'],
    タ : ['タ','チ','ツ','テ','ト'],
    ナ : ['ナ','ニ','ヌ','ネ','ノ'],
    ハ : ['ハ','ヒ','フ','ヘ','ホ'],
    マ : ['マ','ミ','ム','メ','モ'],
    ヤ : ['ヤ','ユ','ヨ'],
    ラ : ['ラ','リ','ル','レ','ロ'],
    ワ : ['ワ','ヲ','ン'],
};

const dakutenkatakanasets = {
    ガ : ['ガ','ギ','グ','ゲ','ゴ'],
    ザ : ['ザ','ジ','ズ','ゼ','ゾ'],
    ダ : ['ダ','ヂ','ヅ','デ','ド'],
    バ : ['バ','ビ','ブ','ベ','ボ'],
    パ : ['パ','ピ','プ','ペ','ポ'],
    
};

const combkatakanasets = {   
    キャ : ['キャ','キュ','キョ'],
    シャ : ['シャ','シュ','ショ'],
    チャ : ['チャ','チュ','チョ'],
    ニャ : ['ニャ','ニュ','ニョ'],
    ヒャ : ['ヒャ','ヒュ','ヒョ'],
    ミャ : ['ミャ','ミュ','ミョ'],
    リャ : ['リャ','リュ','リョ'],  
    ギャ : ['ギャ','ギュ','ギョ'],
    ジャ : ['ジャ','ジュ','ジョ'],
    ビャ : ['ビャ','ビュ','ビョ'],
    ピャ : ['ピャ','ピュ','ピョ'], 
};

const allmainbase = {
    ...mainkanasets,
    ...mainkatakanasets,
}

const alldakuten = {
    ...dakutenkanasets,
    ...dakutenkatakanasets,
}

const allcomb = {
    ...combkanasets,
    ...combkatakanasets,
}

const allextra = {
    ...extrasets,
}

const allkana = { 
    ...mainkanasets,
    ...dakutenkanasets,
    ...combkanasets,
    ...mainkatakanasets,
    ...dakutenkatakanasets,
    ...combkatakanasets,
    ...extrasets,
}

const romajiConsonants = {
    あ : `a`,
    か : `ka`,
    さ : `sa`,
    た : `ta`,
    な : `na`,
    は : `ha`,
    ま : `ma`,
    や : `ya`,
    ら : `ra`,
    わ : `wa`,
    が : `ga`,
    ざ : `za`,
    だ : `da`,
    ば : `ba`,
    ぱ : `pa`,  
    きゃ : `kya`,
    しゃ : `sha`,
    ちゃ : `cha`,
    にゃ : `nya`,
    ひゃ : `hya`,
    みゃ : `mya`,
    りゃ : `rya`,  
    ぎゃ : `gya`,
    じゃ : `ja`,
    びゃ : `bya`,
    ぴゃ : `pya`, 
    ア : `a`,
    カ : `ka`,
    サ : `sa`,
    タ : `ta`,
    ナ : `na`,
    ハ : `ha`,
    マ : `ma`,
    ヤ : `ya`,
    ラ : `ra`,
    ワ : `wa`,
    ガ : `ga`,
    ザ : `za`,
    ダ : `da`,
    バ : `ba`,
    パ : `pa`,
    キャ : `kya`,
    シャ : `sha`,
    チャ : `cha`,
    ニャ : `nya`,
    ヒャ : `hya`,
    ミャ : `mya`,
    リャ : `rya`,  
    ギャ : `gya`,
    ジャ : `ja`,
    ビャ : `bya`,
    ピャ : `pya`, 
    ツァ : `a`,
    ウィ : `i`,
    トゥ : `u`,
    ウェ : `e`,
    ウォ : `o`,
}

const kanaAnswers = {
    あ : 'a',
    い : 'i',
    う : 'u',
    え : 'e',
    お : 'o',
    か : 'ka',
    き : 'ki',
    く : 'ku',
    け : 'ke',
    こ : 'ko',
    さ : 'sa',
    し : 'shi',
    す : 'su',
    せ : 'se',
    そ : 'so',
    た : 'ta',
    ち : 'chi',
    つ : 'tsu',
    て : 'te',
    と : 'to',
    な : 'na',
    に : 'ni',
    ぬ : 'nu',
    ね : 'ne',
    の : 'no',
    は : 'ha',
    ひ : 'hi',
    ふ : 'fu',
    へ : 'he',
    ほ : 'ho',
    ま : 'ma',
    み : 'mi',
    む : 'mu',
    め : 'me',
    も : 'mo',
    や : 'ya',
    ゆ : 'yu',
    よ : 'yo',
    ら : 'ra',
    り : 'ri',
    る : 'ru',
    れ : 're',
    ろ : 'ro',
    わ : 'wa',
    を : 'wo',
    ん : 'n',
    が : 'ga',
    ぎ : 'gi',
    ぐ : 'gu',
    げ : 'ge',
    ご : 'go',
    ざ : 'za',
    じ : 'ji',
    ず : 'zu',
    ぜ : 'ze',
    ぞ : 'zo',
    だ : 'da',
    ぢ : 'di',
    づ : 'du',
    で : 'de',
    ど : 'do',
    ば : 'ba',
    び : 'bi',
    ぶ : 'bu',
    べ : 'be',
    ぼ : 'bo',
    ぱ : 'pa',
    ぴ : 'pi',
    ぷ : 'pu',
    ぺ : 'pe',
    ぽ : 'po',
    きゃ : 'kya',
    きゅ : 'kyu',
    きょ : 'kyo',
    しゃ : 'sha',
    しゅ : 'shu',
    しょ : 'sho',
    ちゃ : 'cha',
    ちゅ : 'chu',
    ちょ : 'cho',
    にゃ : 'nya',
    にゅ : 'nyu',
    にょ : 'nyo',
    ひゃ : 'hya',
    ひゅ : 'hyu',
    ひょ : 'hyo',
    みゃ : 'mya',
    みゅ : 'myu',
    みょ : 'myo',
    りゃ : 'rya',
    りゅ : 'ryu',
    りょ : 'ryo',
    ぎゃ : 'gya',
    ぎゅ : 'gyu',
    ぎょ : 'gyo',
    じゃ : 'ja',
    じゅ : 'ju',
    じょ : 'jo',
    びゃ : 'bya',
    びゅ : 'byu',
    びょ : 'byo',
    ぴゃ : 'pya',
    ぴゅ : 'pyu',
    ぴょ : 'pyo',
    ア : 'a',
    イ : 'i',
    ウ : 'u',
    エ : 'e',
    オ : 'o',
    カ : 'ka',
    キ : 'ki',
    ク : 'ku',
    ケ : 'ke',
    コ : 'ko',
    サ : 'sa',
    シ : 'shi',
    ス : 'su',
    セ : 'se',
    ソ : 'so',
    タ : 'ta',
    チ : 'chi',
    ツ : 'tsu',
    テ : 'te',
    ト : 'to',
    ナ : 'na',
    ニ : 'ni',
    ヌ : 'nu',
    ネ : 'ne',
    ノ : 'no',
    ハ : 'ha',
    ヒ : 'hi',
    フ : 'fu',
    ヘ : 'he',
    ホ : 'ho',
    マ : 'ma',
    ミ : 'mi',
    ム : 'mu',
    メ : 'me',
    モ : 'mo',
    ヤ : 'ya',
    ユ : 'yu',
    ヨ : 'yo',
    ラ : 'ra',
    リ : 'ri',
    ル : 'ru',
    レ : 're',
    ロ : 'ro',
    ワ : 'wa',
    ヲ : 'wo',
    ン : 'n',
    ガ : 'ga',
    ギ : 'gi',
    グ : 'gu',
    ゲ : 'ge',
    ゴ : 'go',
    ザ : 'za',
    ジ : 'ji',
    ズ : 'zu',
    ゼ : 'ze',
    ゾ : 'zo',
    ダ : 'da',
    ヂ : 'di',
    ヅ : 'du',
    デ : 'de',
    ド : 'do',
    バ : 'ba',
    ビ : 'bi',
    ブ : 'bu',
    ベ : 'be',
    ボ : 'bo',
    パ : 'pa',
    ピ : 'pi',
    プ : 'pu',
    ペ : 'pe',
    ポ : 'po',
    キャ : 'kya',
    キュ : 'kyu',
    キョ : 'kyo',
    シャ : 'sha',
    シュ : 'shu',
    ショ : 'sho',
    チャ : 'cha',
    チュ : 'chu',
    チョ : 'cho',
    ニャ : 'nya',
    ニュ : 'nyu',
    ニョ : 'nyo',
    ヒャ : 'hya',
    ヒュ : 'hyu',
    ヒョ : 'hyo',
    ミャ : 'mya',
    ミュ : 'myu',
    ミョ : 'myo',
    リャ : 'rya',
    リュ : 'ryu',
    リョ : 'ryo',
    ギャ : 'gya',
    ギュ : 'gyu',
    ギョ : 'gyo',
    ジャ : 'ja',
    ジュ : 'ju',
    ジョ : 'jo',
    ビャ : 'bya',
    ビュ : 'byu',
    ビョ : 'byo',
    ピャ : 'pya',
    ピュ : 'pyu',
    ピョ : 'pyo',
    ツァ : 'tsa',
    ファ : 'fa',
    ヴァ : 'va',
    ウィ : 'wi',
    ティ : 'ti',
    フィ : 'fi',
    ディ : 'di',
    ヴィ : 'vi',
    セィ : 'si',
    トゥ : 'tu',
    ドゥ : 'du',
    デュ : 'dyu',
    フュ : 'fyu',
    ジュ : 'ju',
    ウェ : 'we',
    シェ : 'she',
    チェ : 'che',
    ツェ : 'tse',
    フェ : 'fe',
    ジェ : 'je',
    ヴェ : 've',
    ウォ : 'wo',
    ツォ : 'tso',
    フォ : 'fo',
    ヴォ : 'vo',
};

const kanaWrongs = {
    あ : ['e', 'o', 'u', 'i', ],
    い : 'i',
    う : 'u',
    え : 'e',
    お : 'o',
    か : 'ka',
    き : 'ki',
    く : 'ku',
    け : 'ke',
    こ : 'ko',
    さ : 'sa',
    し : 'shi',
    す : 'su',
    せ : 'se',
    そ : 'so',
    た : 'ta',
    ち : 'chi',
    つ : 'tsu',
    て : 'te',
    と : 'to',
    な : 'na',
    に : 'ni',
    ぬ : 'nu',
    ね : 'ne',
    の : 'no',
    は : 'ha',
    ひ : 'hi',
    ふ : 'fu',
    へ : 'he',
    ほ : 'ho',
    ま : 'ma',
    み : 'mi',
    む : 'mu',
    め : 'me',
    も : 'mo',
    や : 'ya',
    ゆ : 'yu',
    よ : 'yo',
    ら : 'ra',
    り : 'ri',
    る : 'ru',
    れ : 're',
    ろ : 'ro',
    わ : 'wa',
    を : 'wo',
    ん : 'n',
    が : 'ga',
    ぎ : 'gi',
    ぐ : 'gu',
    げ : 'ge',
    ご : 'go',
    ざ : 'za',
    じ : 'ji',
    ず : 'zu',
    ぜ : 'ze',
    ぞ : 'zo',
    だ : 'da',
    ぢ : 'di',
    づ : 'du',
    で : 'de',
    ど : 'do',
    ば : 'ba',
    び : 'bi',
    ぶ : 'bu',
    べ : 'be',
    ぼ : 'bo',
    ぱ : 'pa',
    ぴ : 'pi',
    ぷ : 'pu',
    ぺ : 'pe',
    ぽ : 'po',
    きゃ : 'kya',
    きゅ : 'kyu',
    きょ : 'kyo',
    しゃ : 'sha',
    しゅ : 'shu',
    しょ : 'sho',
    ちゃ : 'cha',
    ちゅ : 'chu',
    ちょ : 'cho',
    にゃ : 'nya',
    にゅ : 'nyu',
    にょ : 'nyo',
    ひゃ : 'hya',
    ひゅ : 'hyu',
    ひょ : 'hyo',
    みゃ : 'mya',
    みゅ : 'myu',
    みょ : 'myo',
    りゃ : 'rya',
    りゅ : 'ryu',
    りょ : 'ryo',
    ぎゃ : 'gya',
    ぎゅ : 'gyu',
    ぎょ : 'gyo',
    じゃ : 'ja',
    じゅ : 'ju',
    じょ : 'jo',
    びゃ : 'bya',
    びゅ : 'byu',
    びょ : 'byo',
    ぴゃ : 'pya',
    ぴゅ : 'pyu',
    ぴょ : 'pyo',
};

const container = document.querySelector('.container');

BuildHomePage();

function BuildCard(kana){
    let cardDiv = document.createElement('div');
    container.appendChild(cardDiv);
    cardDiv.classList.add('card');
    cardDiv.setAttribute('data-answer', kana.answer);
    let question = document.createElement('div');
    cardDiv.appendChild(question);
    question.classList.add('question');
    question.textContent = kana.kana;
    let form = document.createElement('form');
    cardDiv.appendChild(form);
    form.classList.add('form');
    let input = document.createElement('input'); 
    form.appendChild(input);
    input.type = 'text';
    input.autocomplete = 'off';
    input.size = 4;
    input.maxLength = 5;
}

function Submit(event){
    let cardDiv = event.target.parentElement;
    let form = event.target;
    let input = event.target[0];
    let inputValue = event.target[0].value;
    inputValue = inputValue.toLowerCase();
    let answer = cardDiv.dataset.answer;
    
    if(inputValue == answer )
    {
        event.target[0].disabled = true;
        form.classList.remove('incorrect');
        form.parentElement.classList.remove('focus-card');
        form.classList.add('correct');
        //pass focus
        FocusNext(event);
    }else{
        form.classList.add('incorrect');
        input.value = '';
    }

    //console.log(event.target[0].value);
    //console.log(event.target.parentElement);
    //console.log(event);
    //console.log(cardDiv.dataset.answer);  
    //cardDiv.setAttribute('data-some', 20);
    
    event.preventDefault();
}

function BuildPracticeSetupPage(){
    //clean page
    let app = document.getElementById('app');
    app.innerHTML = "";

    //remove listeners
    window.removeEventListener("click", CheckClick);

    let instContent = document.getElementById('instruccionescontent');
    instContent.textContent = instrucciones.practicar;
    
    let setupDiv = document.createElement('div');
    setupDiv.classList.add('setupDiv');
    app.appendChild(setupDiv);

    CreateSetupButtons(setupDiv);

    let startButton = CreateUiButton(app, 'Empezar Practica');
    startButton.addEventListener('click', CheckPracticeSelected);
}

//crea los botones para seleccionar los kana, pratice setup page
function CreateSetupButtons(parentDiv){
    let firstDiv = document.createElement('div');
    parentDiv.appendChild(firstDiv);

    //creo boton all base
    let allbaseinput = CreateAllLabelInput(firstDiv, 'all-base', 'Todos Kana base');
    allbaseinput.parentElement.classList.add('all-main');
    // document.addEventListener('onTurnOffBaseKana', TurnOffGroupButton);

    let maingroupbuttons = CreateAndClass('div', firstDiv, classes = ['kanagroupbuttons']);   

    //boton all base hiragana
    let btn = CreateGroupLabelInput(maingroupbuttons, 'all-hiragana-base', 'Todos Hiragana');
    btn.parentElement.classList.add('all-hira');

    let maincheckboxes = document.createElement('div');
    maincheckboxes.classList.add('checkboxes');
    firstDiv.appendChild(maincheckboxes);

    let hiraganabase = CreateSimple('div', maincheckboxes);

    Object.keys(mainkanasets).forEach(key => {
        let array = mainkanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(hiraganabase, key, text);       
    });

    let katakanabase = CreateSimple('div', maincheckboxes);

    //boton all katakana
    btn = CreateGroupLabelInput(maingroupbuttons, 'all-katakana-base', 'Todos Katakana');
    btn.parentElement.classList.add('all-kata');

    //botones katakana
    Object.keys(mainkatakanasets).forEach(key => {
        let array = mainkatakanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(katakanabase, key, text);       
    });

    let secondDiv = document.createElement('div');
    parentDiv.appendChild(secondDiv);

    let alldakuteninput = CreateAllLabelInput(secondDiv , 'all-dakuten', 'Todos Dakuten/Handakuten');
    alldakuteninput.parentElement.classList.add('all-main');

    maingroupbuttons = CreateAndClass('div', secondDiv, classes = ['kanagroupbuttons']);

    //all dakuten hiragana
    btn = CreateGroupLabelInput(maingroupbuttons, 'all-hiragana-dakuten', 'Todos Hiragana');
    btn.parentElement.classList.add('all-hira');

    let dakutencheckboxes = document.createElement('div');
    dakutencheckboxes.classList.add('checkboxes');
    secondDiv.appendChild(dakutencheckboxes);

    hiraganabase = CreateSimple('div', dakutencheckboxes);

    Object.keys(dakutenkanasets).forEach(key => {
        let array = dakutenkanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(hiraganabase, key, text);
    });

    katakanabase =CreateSimple('div', dakutencheckboxes);

    //all dakuten katakana
    btn = CreateGroupLabelInput(maingroupbuttons, 'all-katakana-dakuten', 'Todos Katakana');
    btn.parentElement.classList.add('all-kata');

    Object.keys(dakutenkatakanasets).forEach(key => {
        let array = dakutenkatakanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(katakanabase, key, text);
    });

    //extra katakana
    let allextrainput = CreateAllLabelInput(secondDiv , 'all-extra', 'Todos Katakana Extra');
    allextrainput.parentElement.classList.add('all-extra');

    let extracheckboxes = document.createElement('div');
    extracheckboxes.classList.add('checkboxes');
    extracheckboxes.classList.add('extra');
    secondDiv.appendChild(extracheckboxes);

    let extra = CreateSimple('div', extracheckboxes);

    Object.keys(extrasets).forEach(key => {
        let array = extrasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(extra, key, text);
    });
    
    let thirdDiv = document.createElement('div');
    parentDiv.appendChild(thirdDiv);

    let allcombinput = CreateAllLabelInput(thirdDiv , 'all-comb', 'Todos Combinacion');
    allcombinput.parentElement.classList.add('all-main');

    maingroupbuttons = CreateAndClass('div', thirdDiv, classes = ['kanagroupbuttons']);

    btn = CreateGroupLabelInput(maingroupbuttons, 'all-hiragana-comb', 'Todos Hiragana');
    btn.parentElement.classList.add('all-hira');

    let combcheckboxes = document.createElement('div');
    combcheckboxes.classList.add('checkboxes');
    thirdDiv.appendChild(combcheckboxes);

    hiraganabase = CreateSimple('div', combcheckboxes);

    Object.keys(combkanasets).forEach(key => {
        let array = combkanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(hiraganabase, key, text);
    });

    katakanabase = CreateSimple('div', combcheckboxes);

    //boton all katakana
    btn = CreateGroupLabelInput(maingroupbuttons, 'all-katakana-comb', 'Todos Katakana');
    btn.parentElement.classList.add('all-kata');
    //botones katakana
    Object.keys(combkatakanasets).forEach(key => {
        let array = combkatakanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(katakanabase, key, text);       
    });
}

function TurnOffGroupButton(base){
    document.querySelector(`[for='${base}']`).classList.remove('check');
}

function ClickAllInput(event){
    let element = event.target.parentElement;
    element.classList.toggle('check');

    let base = event.target.parentElement.getAttribute('for');    
    let object = BaseToObject(base);
    let labels = GetAllLabels(object);

    let otherbuttonsattribute = BaseToGroupLabel(base);

    if(element.classList.contains('check')){
        TurnAllOn(labels);
        TurnBothButtons(otherbuttonsattribute, true);
    }else{
        TurnAllOff(labels);
        TurnBothButtons(otherbuttonsattribute, false);
    }
}

function ClickGroupInput(event){
    let element = event.target.parentElement;
    element.classList.toggle('check');

    let labels = GetAllLabelsFromBase(element);

    if(element.classList.contains('check')){
        TurnAllOn(labels);
    }else{
        TurnAllOff(labels);
    }
}

function GetAllLabelsFromBase(element){
    let base = element.getAttribute('for');
    let object = BaseToObject(base);
    let labels = GetAllLabels(object);

    return labels;
}

function TurnAllOn(group){
    //por cada label en el grupo
    group.forEach(element => {
        if(!element.classList.contains('check')){
            element.classList.add('check');
        }
    });
    //si no tiene la clase check, agregar clase check
}

function TurnAllOff(group){
    //por cada label en el grupo
    group.forEach(element => {
        if(element.classList.contains('check')){
            element.classList.remove('check');
        }
    });
    //si no tiene la clase check, agregar clase check
}

function TurnBothButtons(buttonsattribute, onoff){
    if(onoff){
        buttonsattribute.forEach(attr => {
           let button = document.querySelector(`[for=${attr}]`);
           button.classList.add('check');
        });
    }else{
        buttonsattribute.forEach(attr => {
            let button = document.querySelector(`[for=${attr}]`);
            button.classList.remove('check');
        });
    }  
}

function StartLearning(){
    //SCROLL to top
    window.scrollTo(0, 0);

    //Push history state
    state.currentPage = "learn";
    window.history.pushState(state, null, "");

    //Clean App
    let app = document.getElementById('app');
    app.innerHTML = "";

    //Populate instrucciones
    let instContent = document.getElementById('instruccionescontent');
    instContent.textContent = instrucciones.kanalearn;

    let spacer = CreateAndClass('div', app, classes = ['spacer'] );

    let titleKana = CreateAndClass('div', app, classes = ['titleKana']);
    titleKana.textContent = JapaneseComaSeparatedArray(allkana[currentSet[0]])

    spacer = CreateAndClass('div', app, classes = ['spacer'] );

    //Armar divs
    let learnDiv = CreateAndClass('div', app, classes = ['learndiv']);
    let learnCard = CreateAndClass('div', learnDiv, classes = ['learncard']);

    let info = document.createElement('div');
    info.classList.add('info');

    spacer = CreateAndClass('div',learnDiv , classes = ['spacer'] );
    spacer.appendChild(info);

    let explanationExist = CheckForExplanation(learnCard);

    spacer = CreateAndClass('div',learnDiv , classes = ['spacer'] );
    
    let buttonsdiv = CreateAndClass('div',learnDiv , classes = ['btn-div'] );
    
    let prevButton = CreateAndClass('button', buttonsdiv, classes = ['prevbtn']);
    prevButton.addEventListener('click', PreviousButton);
    prevButton.textContent = 'Atras';
    prevButton.disabled = true;
    
    let nextButton = CreateAndClass('button', buttonsdiv, classes = ['nextbtn']);
    nextButton.addEventListener('click', NextButton);
    nextButton.textContent = 'Siguiente';
    
    if(!explanationExist)
        info.textContent = KanaToInfo(currentSet[0]);
}

function CheckForExplanation(cardParent){
    //aqui agregar check, if true, hacer otro tipo de tarjeta
    let explanation = explanationtext[currentSet[0]];
    
    if(explanation.length > 0){
        let explanationSection = CreateAndClass('div', cardParent, claases = ['explanation']);
        explanationSection.textContent = explanation;
        let instContent = document.getElementById('instruccionescontent');
        instContent.textContent = instrucciones.explanation;

        return true;
    }else{
        CreateLearnCard(cardParent);
        return false;
    }
}

function CreateLearnCard(cardParent){
    let explanation = document.querySelector('.explanation');
    if(explanation != null)
        explanation.remove(); 

    PopulateInstructions(instrucciones.kanalearn);

    let learnKanaSection = CreateAndClass('div', cardParent, classes = ['kanasection']);
    let learnKanaTitle = CreateAndClass('div', learnKanaSection, classes = ['learnkanatitle']);
    let learnKana = CreateAndClass('div', learnKanaSection, classes = ['learnkana']);
    let learnRomajiSection = CreateAndClass('div', cardParent, classes = ['romajisection']);
    let learnRomaji = CreateAndClass('div', learnRomajiSection, classes = ['learnromaji']);
    let learnRomajiTitle = CreateAndClass('div', learnRomajiSection, classes = ['learnromajititle']);

    //popular contenido    
    learnKanaTitle.textContent = 'Kana';
    learnKana.textContent = currentSet[0];
    learnRomaji.textContent = kanaAnswers[currentSet[0]];
    learnRomajiTitle.textContent = 'Romaji';

    let info = document.querySelector('.info');
    info.textContent = KanaToInfo(currentSet[0]);
}

function PreviousButton(){
    //aqui decidir si estoy en una explicacion o no ?
    //get kana div
    let kanaelement = document.querySelector('.learnkana');

    if(kanaelement != null){
        let kana = kanaelement.textContent

        let index = currentSet.indexOf(kana);

        let indexminusone = index - 1;
        let prevkana = currentSet[indexminusone];

        if(indexminusone >= 0){
            kanaelement.textContent = prevkana;

            //buscar el romaji correspondiente al nuevo kana y ponerlo tambien
            let romaji = kanaAnswers[prevkana];
            let info = document.querySelector('.info');
            info.textContent = KanaToInfo(prevkana);

            let romajielement = document.querySelector('.learnromaji');
            romajielement.textContent = romaji;

            //aqui tengo que cambiar el comportamiento del button
            //necesito revisar si quede en el primer kana y desactivar el button
            let previndex = indexminusone - 1;
            if(previndex < 0){
                let prevbutton = document.querySelector('.prevbtn');
                prevbutton.disabled = true;
            }
        }

        let nextbutton = document.querySelector('.nextbtn');
        if(nextbutton.classList.contains('quiz')){
            nextbutton.classList.remove('quiz');
            nextbutton.textContent = 'Siguiente';
            nextbutton.disabled = false;
        }
    }else{
        console.log("no hay kana");
}

    
}

//next button de la parte learn
function NextButton(){
    //tomando el kana actual, buscarlo en el array y cambiar al siguiente si es posible
    let kanaelement = document.querySelector('.learnkana');

    //si existe el kana construir la siguiente carta
    if(kanaelement != null){
        let kana = kanaelement.textContent

        let index = currentSet.indexOf(kana);

        let indexplusone = index + 1;
        let nextkana = currentSet[indexplusone];

        if(indexplusone >= currentSet.length){   
            BuildQuiz();   
        }else{
            kanaelement.textContent = nextkana;

            //buscar el romaji correspondiente al nuevo kana y ponerlo tambien
            let romaji = kanaAnswers[nextkana];
            let info = document.querySelector('.info');
            info.textContent = KanaToInfo(nextkana);

            let romajielement = document.querySelector('.learnromaji');
            romajielement.textContent = romaji;

            //aqui tengo que cambiar el comportamiento del button
            //necesito revisar si quede en el ultimo kana y cambiar el boton por el quiz
            let nextindex = indexplusone+1;
            if(nextindex >= currentSet.length){
                let nextbutton = document.querySelector('.nextbtn');
                nextbutton.textContent = 'Quiz! ->';
                nextbutton.classList.add('quiz');
                nextbutton.disabled = true;
                setTimeout(function(){nextbutton.disabled = false;},500);
                }
            }    

            //Check for prev button disable
            let prevbutton = document.querySelector('.prevbtn');

            if(indexplusone > 0 && prevbutton != null){       
                prevbutton.disabled = false;
            }
    }else{//si no, construir el kana card desde 0
        let cardParent = document.querySelector('.learncard');        

        CreateLearnCard(cardParent);
    }
    
}

function BuildQuiz(){
    let app = CleanAppPage();
    PopulateInstructions(instrucciones.kanaquiz);

    let quizDiv = CreateAndClass('div', app, classes = ['quizdiv']);

    //randomize kana set
    let base = getObjKey(allkana,currentSet);
    //console.log(base);

    currentSet = shuffleArray(currentSet);  

    //build kana
    let kanaQuizPrompt = CreateAndClass('div', quizDiv, classes = ['quizprompt']);
    let kanaQuizPromptText = CreateSimple('p', kanaQuizPrompt);
    kanaQuizPromptText.classList.add('fade');
    kanaQuizPromptText.classList.add('quizprompttext');
    kanaQuizPromptText.textContent = currentSet[0];

    CreateAndClass('div', quizDiv, classes = ['spacer']);

    let answerButtons = CreateAndClass('div', quizDiv, classes = ['quizbuttonsdiv']);
    //build answer button array
    let answerButtonsArray = [];
    //first the answer button.
    let answerButton = document.createElement('button');
    answerButton.classList.add('correctquizanswerbtn');
    let correctAnswer = kanaAnswers[currentSet[0]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener('click', AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement('button');
    firstWrongAnswer.classList.add('incorrectquizanswerbtn');
    
    
    let randomKana = GetRandomKanaFromBaseThatsNot(base, nots = [currentSet[0]]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener('click', FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement('button');
    secondWrongAnswer.classList.add('incorrectquizanswerbtn');
    //randomKanaBase = GetRandomThatIsNot(currentSet, nots = [currentSet[0], randomKanaBase]);
    randomKana = GetRandomKanaFromBaseThatsNot(base, nots = [currentSet[0], randomKana]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener('click', FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, answerButtons);
}

function GoToNextQuiz(){
    //get kana display
    let kanatext = document.querySelector('.quizprompt p');
    let kanaindisplay = kanatext.textContent;
    //see if can get next kana
    let currentindex = currentSet.indexOf(kanaindisplay);
    let nextindex = currentindex + 1;
    if(nextindex >= currentSet.length){
     console.log('llegue al final del set');
     //aqui deberia reemplazar los botones
     ShowAgainNextButtons();
 
    }else{
     //change display kana
    //kanatext.textContent = currentSet[nextindex];
     toggleTransitionWithTimeout(kanatext, currentSet[nextindex]);
 
     //erase buttons
     let buttonsdiv = document.querySelector('.quizbuttonsdiv');
     buttonsdiv.innerHTML = "";
 
     //create buttons again
     CreateQuizButtons(nextindex ,buttonsdiv);
    } 
 }

function CreateQuizButtons(currentindex, parent){
    //build answer button array
    let answerButtonsArray = [];
    //first the answer button.
    let answerButton = document.createElement('button');
    answerButton.classList.add('correctquizanswerbtn');
    let correctAnswer = kanaAnswers[currentSet[currentindex]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener('click', AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement('button');
    firstWrongAnswer.classList.add('incorrectquizanswerbtn');
    //let randomKanaBase= GetRandomThatIsNot(currentSet, nots = [currentSet[currentindex]]);
    let base = getObjKey(allkana,currentSet);
    console.log(base);
    
    let randomKana = GetRandomKanaFromBaseThatsNot(base, nots = [currentSet[currentindex]]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener('click', FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement('button');
    secondWrongAnswer.classList.add('incorrectquizanswerbtn');
    //randomKanaBase = GetRandomThatIsNot(currentSet, nots = [currentSet[currentindex], randomKanaBase]);
    randomKana = GetRandomKanaFromBaseThatsNot(base, nots = [currentSet[currentindex], randomKana]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener('click', FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, parent);
}

function AnswerQuiz(event){
    //console.log(event.target);
    event.target.classList.add('correctquiz');
    event.target.disabled = true;
    
    setTimeout(GoToNextQuiz,850);  
}

function FailQuiz(event){
    console.log("wrong");
    event.preventDefault();   
    event.target.classList.add('incorrectquiz');
    //event.target.disabled = true;
    //event.target.focus();
    event.target.removeEventListener('click', FailQuiz);
}



function toggleTransitionWithTimeout(element, text){
    element.classList.remove('fade');
    setTimeout(() => {
        requestAnimationFrame(() => {
            element.textContent = text;
            element.classList.add('fade');
        })
    }, 225);
}

function ShowAgainNextButtons(){
    let buttonsdiv = document.querySelector('.quizbuttonsdiv');
    buttonsdiv.innerHTML = "";

    let againbutton = CreateAndClass('button', buttonsdiv, classes = ['againbtn']);
    againbutton.textContent = 'Una vez mas';
    againbutton.addEventListener('click', OnAgainButtonPress);

    let currentIndex = learnSets.indexOf(currentSet);
    let nextindex = currentIndex + 1;
    if(nextindex >= learnSets.length){
        //mostrar boton de salir
        let exitbutton = CreateAndClass('button', buttonsdiv, classes = ['exitbtn']);
        exitbutton.textContent = 'Salir';
        exitbutton.addEventListener('click', OnExitButtonPress);
    }else{
        //mostrar boton de next set
        let nextsetbutton = CreateAndClass('button', buttonsdiv, classes = ['nextsetbtn']);
        nextsetbutton.textContent = 'Seguir';
        nextsetbutton.addEventListener('click', OnTakeNextButtonPress);
    }
}

function OnAgainButtonPress(event){
    event.target.disabled = true;
    setTimeout(TakeQuizAgain, 300);
}

//pregunta denuevo el set de kanas actual
function TakeQuizAgain(){
    BuildQuiz();
}

function OnTakeNextButtonPress(event){
    event.target.disabled = true;
    setTimeout(TakeNextQuizSet, 300);
}

//cambia al siguiente set de kana y arma la pagina
function TakeNextQuizSet(){
    let currentIndex = learnSets.indexOf(currentSet);
    let nextindex = currentIndex + 1;

    currentSet = learnSets[nextindex];
    StartLearning();
}

function OnExitButtonPress(){
    setTimeout(ReloadPage, 250);
}

//Sale a la pagina principal
function ExitQuiz(){
    location.reload();
}

function OnTitleClick(){
    state.currentPage = "home";
    window.history.pushState(state, null, "");

    ReloadPage();
}

function ReloadPage(){
    location.reload();
}

function CleanAppPage(){
    let app = document.getElementById('app');
    app.innerHTML = "";

    return app;
}

function PopulateInstructions(e){
    let instContent = document.getElementById('instruccionescontent');
    instContent.textContent = e;
}

function BuildHomePage(){
    //first load
    let title = document.getElementById('title');
    title.addEventListener('click', OnTitleClick); 

    //popular instrucciones
    let instContent = document.getElementById('instruccionescontent');
    instContent.textContent = instrucciones.home;

    //cargar ambos botones
    let contentDiv = document.getElementById('app');

    let homeDiv = document.createElement('div');
    homeDiv.classList.add('homediv');
    contentDiv.appendChild(homeDiv);

    let buttonAprender = document.createElement('button');
    buttonAprender.classList.add('uibtn');
    homeDiv.appendChild(buttonAprender);

    let buttonAprenderTop = document.createElement('span');
    buttonAprenderTop.textContent = 'Aprender';
    buttonAprenderTop.classList.add('uibtn-top');
    buttonAprender.appendChild(buttonAprenderTop);

    let buttonPractica = document.createElement('button');
    buttonPractica.classList.add('uibtn');
    homeDiv.appendChild(buttonPractica);

    let buttonPracticaTop = document.createElement('span');
    buttonPracticaTop.textContent = 'Practicar';
    buttonPracticaTop.classList.add('uibtn-top');
    buttonPractica.appendChild(buttonPracticaTop);

    buttonAprender.addEventListener('click' , OnLearnButtonPress);
    buttonPractica.addEventListener('click' , OnPracticeButtonPress);
}

function OnLearnButtonPress(){
    //aqui deberia revisar que esta seleccionado y setear el 'learnsets'
    //esto deberia depender de lo que seleccione en el setup
    //en este punto el 'learnsets' ya deberia estar seteado y solo tengo que acceder al primero
    //currentSet = learnSets[0];

    // setTimeout(StartLearning,200);
    state.currentPage = "learnSetup";
    window.history.pushState(state, null, "");
    
    setTimeout(BuildLearnSetupPage, 200);
}

function OnPracticeButtonPress(){
    state.currentPage = "practiceSetup";
    window.history.pushState(state, null, "");

    setTimeout(BuildPracticeSetupPage,200);
}

function BuildLearnSetupPage(){
    

    let app = CleanAppPage();

    PopulateInstructions(instrucciones.aprender);

    let practiceSetupDiv = CreateAndClass('div', app, classes = ['setupDiv']);

    CreateSetupButtons(practiceSetupDiv);

    let startButton = CreateUiButton(app, 'Aprender');
    startButton.addEventListener('click', CheckLearnSelected);
}

function CheckLearnSelected(){
    //get all labels
    let buttons = document.querySelectorAll("div.checkboxes > div > label");

    //hacer un array con todos los 'check'
    let checked = []; 

    buttons.forEach(button => {
        if(button.classList.contains('check')){
            checked.push(button);
        }
    });

    if(checked.length < 1){
        alert('Por favor selecciona lo que quieres practicar.');
        return;
    }

    learnSets = PopulateLearnSet(checked);
    currentSet = learnSets[0];

    StartLearning();
}

function PopulateLearnSet(arr){
    let learnArray = [];
    arr.forEach(element => {
        let kana = element.getAttribute('for');
        learnArray.push(allkana[kana]);
    });

    //console.log(learnArray);
    return learnArray;
}

// ---------------------- FUNCTIONS ----------------------  //
function CreateSimple(component, parent){
    let newComponent = document.createElement(component);
    parent.appendChild(newComponent);

    return newComponent;
}

function CreateAndClass(component, parent, classes){
    let newComponent = document.createElement(component);

    classes.forEach(clase =>  {
        newComponent.classList.add(clase);
    });

    parent.appendChild(newComponent);

    return newComponent;
}

function CreateAndId(component ,parent, id){
    let newComponent = document.createElement(component);

    newComponent.setAttribute('id', id);

    parent.appendChild(newComponent);

    return newComponent;
}

//esto deberia simplemente hacer toggle a la clase 'check'
function ToggleClass(element, clase){
    element.classList.toggle(clase);

    //FIX check si los aprete todos y prender el label de all tambien
}

function CreateUiButton(parent, text){
    let button = document.createElement('button');
    button.classList.add('uibtn');
    parent.appendChild(button);

    let buttonTop = document.createElement('span');
    buttonTop.textContent = text;
    buttonTop.classList.add('uibtn-top');
    button.appendChild(buttonTop);

    return button;
}

function CreateGroupLabelInput(parent, id, text){
    //crea los label en el menu de setup
    let label = CreateAndClass('label', parent, classes = ['select-box']);
    
    //label.setAttribute('id', id);
    let input = CreateAndId('input', label, id);
    input.classList.add('setup-input');
    label.setAttribute('for', id);
    let node = document.createTextNode (text);
    label.appendChild(node);
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', ClickGroupInput);

    return input;
}

function CreateAllLabelInput(parent, id, text){
    //crea los label en el menu de setup
    let label = CreateAndClass('label', parent, classes = ['select-box']);
    //label.setAttribute('id', id);
    let input = CreateAndId('input', label, id);
    input.classList.add('setup-input');
    label.setAttribute('for', id);
    let node = document.createTextNode (text);
    label.appendChild(node);
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', ClickAllInput);

    return input;
}

function CreateLabelInput(parent, id, text){
    let label = CreateAndClass('label', parent, classes = ['select-box']);
    let consonant = CreateAndClass('div', label, classes = ['consonantLabel']);
    consonant.textContent = romajiConsonants[id];

    let input = CreateAndId('input', label, id);
    input.classList.add('setup-input');
    label.setAttribute('for', id);

    let kanaLabel = CreateAndClass('div', label, classes = ['kanaLabel']);
    kanaLabel.textContent = text;

    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', function() {
        ToggleClass(label, 'check');
    });

    return input;
}

//construye pagina de practica basada en seleccion
function CheckPracticeSelected(){
    //get all labels
    let buttons = document.querySelectorAll("div.checkboxes > div > label");

    //hacer un array con todos los 'check'
    let checked = []; 

    buttons.forEach(button => {
        if(button.classList.contains('check')){
            checked.push(button);
        }
    });

    if(checked.length < 1){
        alert('Por favor selecciona lo que quieres practicar.');
        return;
    }

    //construir con lo seleccionado
    BuildPracticePage(checked);  
}

//dumb but works
function WaitForMouseUp(){
    window.removeEventListener("mouseup", WaitForMouseUp);
    window.addEventListener("click", CheckClick);
}

//check if clicked outside input in practice page
function CheckClick(event){
    //console.log(event.target);

    if(event.target.localName != "input" && event.target.localName != "form"){
        let card = document.querySelector('.focus-card');
        if(card != null)
            card.classList.remove('focus-card');
    }
}

function AddMissClickListener(){
    console.log("custom event");
    window.addEventListener("click", CheckClick);
}

//construye la pagina de practica, basado en los kanas seleccionados
function BuildPracticePage(selected){
    //scroll to top
    window.scrollTo(0, 0);

    window.addEventListener("PageBuilt", AddMissClickListener);

    state.currentPage = "practice";
    window.history.pushState(state, null, "");

    //clean page
    let app = document.getElementById('app');
    app.innerHTML = "";
    
    //populate instruccions
    let instContent = document.getElementById('instruccionescontent');
    instContent.textContent = instrucciones.kanatable;

    //HACER UN ARRAY de kana base desde selected
    let kanasBase = [];

    selected.forEach(label => {
        let kanaBase = label.getAttribute('for');
        kanasBase.push(kanaBase);
    });

    //console.log(kanasBase);

    //Hacer un array de todos los kanas necesarios ocupando los kana base
    let kanas = [];
    kanasBase.forEach(basekana => {
        let base = allkana[basekana];
        base.forEach(kana => {
            kanas.push(kana);
        });
    });

    //console.log(kanas);

    //randomizar los kana
    let randomkanas = shuffleArray(kanas);
    //mandar a construir tarjetas con el array
    //return un array de elementos ?
    let elements = BuildCards(randomkanas);
    //agregar cada elemento al div correcto
    let practiceDiv = CreateAndClass('div', app, classes = ['practiceDiv']);

    elements.forEach(element => {
        practiceDiv.appendChild(element);
    });

    //select first card
    let firstInput = document.querySelector('input');
    firstInput.focus();
    firstInput.parentElement.parentElement.classList.add('focus-card');

    CreateAndClass('div', app, classes = ['spacer']);
    //crear div para botones de again and exit
    let buttonsDiv = CreateAndClass('div', app, classes = ['practiceagainbuttons']);

    let againButton = CreateAndClass('button', buttonsDiv, classes = ['practiceagainbtn']);
    againButton.textContent = 'Desde 0';
    againButton.addEventListener('click', () => BuildPracticePage(selected));

    let changeButton = CreateAndClass('button', buttonsDiv, classes = ['practicechangebtn']);
    changeButton.textContent = 'Cambiar Kanas';
    changeButton.addEventListener('click', BuildPracticeSetupPage);

    window.addEventListener("mouseup", WaitForMouseUp);
}

function BuildCards(kanas){
    let cardElements = []; 

    kanas.forEach(kana => {
        let newcard = BuildKanaCard(kana);
        cardElements.push(newcard);
    });

    return cardElements;
}

function BuildKanaCard(kana){
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('data-answer', kanaAnswers[kana]);
    let question = document.createElement('div');
    cardDiv.appendChild(question);
    question.classList.add('question');
    let span = document.createElement('span');
    span.classList.add('question-span');
    span.textContent = kana;
    question.appendChild(span);
    let form = document.createElement('form');
    cardDiv.appendChild(form);
    form.classList.add('form');
    let input = document.createElement('input'); 
    form.appendChild(input);
    form.addEventListener('submit', Submit);
    form.addEventListener('click', SelectInput);
    input.addEventListener('focus', checkFocus);
    input.type = 'text';
    input.autocomplete = 'off';
    input.size = 4;
    input.maxLength = 5;
    input.autocapitalize = 'off';

    return cardDiv;
}

function SelectInput(event){
    //console.log(event.target);
    event.currentTarget[0].focus();
}

function checkFocus(event){   
    let card = document.querySelector('.focus-card');
    if(card != null)
        card.classList.remove('focus-card');
    event.target.parentElement.parentElement.classList.add('focus-card');
}
function shuffleArray(arr){
    let currentIndex = arr.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
  
    return arr;
}

function FocusNext(event){
    let inputs = Array.from(document.querySelectorAll('input'));
    let currentindex = inputs.indexOf(event.target[0]);

    let indexToCheck = LoopingIncrement(currentindex, inputs.length);
    

    //check todos los inputs hasta encontrar uno libre
    for(var i = 0; i < inputs.length; i++){
        if(!inputs[indexToCheck].disabled){
            inputs[indexToCheck].focus();        
            return;
        }else{
            indexToCheck = LoopingIncrement(indexToCheck, inputs.length)
        }
    }

    console.log('no encontre tarjetas libres');
    document.querySelector('.practiceagainbtn').focus();
}

function LoopingIncrement(index, length){
    let newindex = 0;

    if(index + 1 > length - 1){
        newindex = 0;
    }else{
        newindex = index + 1;
    }

    return newindex;
}

function GetAllLabels(kanaset){
    let labels = [];

    Object.keys(kanaset).forEach(key =>{
        let label = document.querySelector(`#${key}`);
        labels.push(label.parentElement);
    });

    return labels;
}

function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

function GetRandomKana(){
    const keys = Object.keys(allkana);

    return keys[Math.floor(Math.random() * keys.length)];
}

function GetRandomKanaFromBaseThatsNot(base, nots){
    
    let arr = allkana[base];

    let random;

    do {
       random = arr[Math.floor(Math.random() * arr.length)];
    } while (IsEqual(nots, random));
    
    return random;

    // arr = shuffleArray(arr);
    // return arr[0];
}

function GetRandomThatIsNot(array, nots){
    // let keys = Object.keys(object);
    array = shuffleArray(array);
    let random;

    do {
       random = array[Math.floor(Math.random() * array.length)];
    } while (IsEqual(nots, random));
    
    return random;
}

function IsEqual(obj, prompt){
    let exit = false;

    obj.forEach(key =>{
        thekey = key;
        if(key === prompt){
            exit = true;
        }
    });

    return exit;
}

function AppendQuizButtons(arr, parent){
    arr = shuffleArray(arr);
        
    arr.forEach(element => {
        parent.appendChild(element);
    });
}

function JapaneseComaSeparatedArray(array){
    return array.join('、');
}