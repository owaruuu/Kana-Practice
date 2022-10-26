let state = {
    currentPage : "home",
};

window.history.replaceState(state, null, "");

window.onpopstate = function (event) {
    if(event.state){
        state = event.state;
    }

    Render(state);
}

function Render(state){
switch (state.currentPage) {
    case "home":
        //render home
        ReloadPage();
        break;
    case "learnSetup":
        BuildLearnSetupPage();
        //render learn setup
        break;
    case "learn":
        BuildLearnSetupPage();
        //render learn
        break;
    case "practiceSetup":
        BuildPracticeSetupPage()
        //render practice setup
        break;
    case "practice":
        BuildPracticeSetupPage()
        //render pratice
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
    kanatable : 'Escribe en cada tarjeta la lectura en romaji del Kana.',
    kanalearn : 'Estudia estas tarjetas para luego responder un Quiz.(Intenta escribir un par de veces estas letras si no las conocias.)',
    kanaquiz : 'Selecciona de las opciones abajo el romaji correcto, puedes repetir el Quiz las veces que quieras antes de continuar.',
};

function KanaToInfo(kana){
    if(infotext[kana] === ''){
        return;
    }

    let symbol = '🛈 ';
    let info = symbol.concat(infotext[kana]);

    if(info != null){
        return info;
    }else{
        console.log(info);
    }
}

const infotext = {
    あ : 'La letra あ(a) se puede confundir con la letra お(o).',
    い : 'El orden de las vocales es diferente en Japones.',
    う : 'El orden de las vocales es diferente en Japones.',
    え : 'El orden de las vocales es diferente en Japones.',
    お : 'La letra お(o) se puede confundir con la letra あ(a).',
    か : '',
    き : '',
    く : '',
    け : '',
    こ : '',
    さ : '',
    し : '',
    す : '',
    せ : '',
    そ : '',
    た : '',
    ち : '',
    つ : '',
    て : '',
    と : '',
    な : '',
    に : '',
    ぬ : '',
    ね : '',
    の : '',
    は : '',
    ひ : '',
    ふ : '',
    へ : '',
    ほ : '',
    ま : '',
    み : '',
    む : '',
    め : '',
    も : '',
    や : '',
    ゆ : '',
    よ : '',
    ら : '',
    り : '',
    る : '',
    れ : '',
    ろ : '',
    わ : '',
    を : '',
    ん : '',
    が : '',
    ぎ : '',
    ぐ : '',
    げ : '',
    ご : '',
    ざ : '',
    じ : '',
    ず : '',
    ぜ : '',
    ぞ : '',
    だ : '',
    ぢ : '',
    づ : '',
    で : '',
    ど : '',
    ば : '',
    び : '',
    ぶ : '',
    べ : '',
    ぼ : '',
    ぱ : '',
    ぴ : '',
    ぷ : '',
    ぺ : '',
    ぽ : '',
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
    ジュ : '',
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
}

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
};

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
};

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
};

function BaseToGroupLabel(base){
    switch (base) {
        case 'all-base':
            return fors = ['all-hiragana-base', 'all-katakana-base'];
        case 'all-dakuten':
            return fors = ['all-hiragana-dakuten', 'all-katakana-dakuten']
        case 'all-comb':
            return fors = ['all-hiragana-comb', 'all-katakana-comb'];
        case 'all-extra':
            return fors = ['all-extra'];
    }
}

const extrasets = {
    ァ : ['ツァ','ファ','ヴァ'],
    ィ : ['ウィ','ティ','フィ','ディ','セィ','ヴィ'],
    ゥ : ['トゥ','ドゥ','デュ','フュ','ジュ'],
    ェ : ['ウェ','シェ','チェ','ツェ','フェ','ジェ','ヴェ'],
    ォ : ['ウォ','ツォ','フォ','ヴォ'],
}

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
    

    let app = document.getElementById('app');
    app.innerHTML = "";

    let instContent = document.getElementById('instruccionescontent');
    instContent.textContent = instrucciones.practicar;
    
    let setupDiv = document.createElement('div');
    setupDiv.classList.add('setupDiv');
    app.appendChild(setupDiv);

    //crear boton All
    // CreateLabelInput(setupDiv, 'all-main', 'Todos los Kana');

    CreateSetupButtons(setupDiv);

    let startButton = CreateUiButton(app, 'Empezar Practica');
    startButton.addEventListener('click', CheckSelected);
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
    let btn = CreateGroupLabelInput(maingroupbuttons, 'all-hiragana-base', 'Todos hiragana');
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
    let newState = ToggleGroupClass(event.target.parentElement, 'check');

    //si new state es true, significa que prendi el boton
    //aqui tengo que pasar por todos los botones y ponerles check
    let base = event.target.parentElement.getAttribute('for');
    let otherbuttonsattribute = BaseToGroupLabel(base);
    console.log(otherbuttonsattribute);

    let object = BaseToObject(base);

    let labels = GetAllLabels(object);

    if(newState){
        TurnAllOn(labels);
        TurnBothButtons(otherbuttonsattribute, true);
    }else{
        TurnAllOff(labels);
        TurnBothButtons(otherbuttonsattribute, false);
    }
}

function ClickGroupInput(event){
    let newState = ToggleGroupClass(event.target.parentElement, 'check');

    //si new state es true, significa que prendi el boton
    //aqui tengo que pasar por todos los botones y ponerles check
    let base = event.target.parentElement.getAttribute('for');

    let object = BaseToObject(base);

    let labels = GetAllLabels(object);

    if(newState){
        TurnAllOn(labels);
    }else{
        TurnAllOff(labels);
    }
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
    state.currentPage = "learn";
    window.history.pushState(state, null, "");

    let app = document.getElementById('app');
    app.innerHTML = "";

    //instrucciones
    let instContent = document.getElementById('instruccionescontent');
    instContent.textContent = instrucciones.kanalearn;

    //armar divs
    let learnDiv = CreateAndClass('div', app, classes = ['learndiv']);
    let learnCard = CreateAndClass('div', learnDiv, classes = ['learncard']);
    let learnKanaSection = CreateAndClass('div', learnCard, classes = ['kanasection']);
    let learnKanaTitle = CreateAndClass('div', learnKanaSection, classes = ['learnkanatitle']);
    let learnKana = CreateAndClass('div', learnKanaSection, classes = ['learnkana']);
    let learnRomajiSection = CreateAndClass('div', learnCard, classes = ['romajisection']);
    let learnRomaji = CreateAndClass('div', learnRomajiSection, classes = ['learnromaji']);
    let learnRomajiTitle = CreateAndClass('div', learnRomajiSection, classes = ['learnromajititle']);

    //popular contenido
    
    learnKanaTitle.textContent = 'Kana';
    learnKana.textContent = currentSet[0];
    learnRomaji.textContent = kanaAnswers[currentSet[0]];
    learnRomajiTitle.textContent = 'Romaji';

    let spacer = CreateAndClass('div',learnDiv , classes = ['spacer'] );
    let info = CreateAndClass('div', spacer, classes = ['info']);

    info.textContent = KanaToInfo(currentSet[0]);

    let buttonsdiv = CreateAndClass('div',learnDiv , classes = ['btn-div'] );

    let prevButton = CreateAndClass('button', buttonsdiv, classes = ['prevbtn']);
    prevButton.addEventListener('click', PreviousButton);
    prevButton.textContent = 'Atras';
    prevButton.disabled = true;

    let nextButton = CreateAndClass('button', buttonsdiv, classes = ['nextbtn']);
    nextButton.addEventListener('click', NextButton);
    nextButton.textContent = 'Siguiente';
}

function PreviousButton(){
    let kanaelement = document.querySelector('.learnkana');
    let kana = kanaelement.textContent

    let index = currentSet.indexOf(kana);

    let indexminusone = index - 1;
    let prevkana = currentSet[indexminusone];

    if(indexminusone < 0){
        console.log('estoy al principio');       
    }else{
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
}

//next button de la parte learn
function NextButton(){
    //tomando el kana actual, buscarlo en el array y cambiar al siguiente si es posible
    let kanaelement = document.querySelector('.learnkana');
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

    let prevbutton = document.querySelector('.prevbtn');

    if(indexplusone > 0 && prevbutton != null){       
        prevbutton.disabled = false;
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

    buttonAprender.addEventListener('click' , OnLearnButtonPress)
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
    //console.log(`esto es lo que tengo en buttons: ${buttons}`);

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
    //console.log(checked);

    //console.log('popule el learn set');
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

function ToggleGroupClass(element, clase){
    let contains = element.classList.contains(clase);
    if(contains){
        element.classList.remove(clase);
        return false;
    }else{
        element.classList.add(clase);
        return true;
    }
}

function ToggleClass(element, clase){
    let contains = element.classList.contains(clase);
    if(contains){
        //aqui estoy apagando un boton
        //basado en el kana de este element, por ej: あ obtener el 'all base'
        let attr = element.getAttribute('for');

        let base = FindAllBaseGroup(attr);
        let targetlabel = document.querySelector(`[for='${base}']`);
        targetlabel.classList.remove(clase);
        
        base = FindBaseGroup(attr);
        targetlabel = document.querySelector(`[for='${base}']`);

        targetlabel.classList.remove(clase);

        element.classList.remove(clase);
        return false;
    }else{
        //aqui estoy prendiendo un boton
        //FIX check si los aprete todos y prender el label de all tambien
        element.classList.add(clase);
        return true;
    }
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
    //crea los label en el menu de setup
    let label = CreateAndClass('label', parent, classes = ['select-box']);
    //label.setAttribute('id', id);
    let input = CreateAndId('input', label, id);
    input.classList.add('setup-input');
    label.setAttribute('for', id);
    let node = document.createTextNode (text);
    label.appendChild(node);
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', function() {
        ToggleClass(label, 'check');
    });

    return input;
}

//construye pagina de practica basada en seleccion
function CheckSelected(){
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

//construye la pagina de practica, basado en los kanas seleccionados
function BuildPracticePage(selected){
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

    console.log(kanasBase);

    //hacer un array de todos los kanas necesarios ocupando los kana base
    let kanas = [];
    kanasBase.forEach(basekana => {
        let base = allkana[basekana];
        base.forEach(kana => {
            kanas.push(kana);
        });
    });


    console.log(kanas);

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
    input.addEventListener('focus', checkFocus);
    input.type = 'text';
    input.autocomplete = 'off';
    input.size = 4;
    input.maxLength = 5;
    input.autocapitalize = 'off';

    return cardDiv;
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