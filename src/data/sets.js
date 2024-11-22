const extrasets = {
    ツァ: ["ツァ", "ファ", "ヴァ"],
    ウィ: ["ウィ", "ティ", "フィ", "ディ", "セィ", "ヴィ"],
    トゥ: ["トゥ", "ドゥ", "デュ", "フュ"],
    ウェ: ["ウェ", "シェ", "チェ", "ツェ", "フェ", "ジェ", "ヴェ"],
    ウォ: ["ウォ", "ツォ", "フォ", "ヴォ"],
};

const mainkanasets = {
    あ: ["あ", "い", "う", "え", "お"],
    か: ["か", "き", "く", "け", "こ"],
    さ: ["さ", "し", "す", "せ", "そ"],
    た: ["た", "ち", "つ", "て", "と"],
    な: ["な", "に", "ぬ", "ね", "の"],
    は: ["は", "ひ", "ふ", "へ", "ほ"],
    ま: ["ま", "み", "む", "め", "も"],
    や: ["や", "ゆ", "よ"],
    ら: ["ら", "り", "る", "れ", "ろ"],
    わ: ["わ", "を", "ん"],
};

const dakutenkanasets = {
    が: ["が", "ぎ", "ぐ", "げ", "ご"],
    ざ: ["ざ", "じ", "ず", "ぜ", "ぞ"],
    だ: ["だ", "ぢ", "づ", "で", "ど"],
    ば: ["ば", "び", "ぶ", "べ", "ぼ"],
    ぱ: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
};

const combkanasets = {
    きゃ: ["きゃ", "きゅ", "きょ"],
    しゃ: ["しゃ", "しゅ", "しょ"],
    ちゃ: ["ちゃ", "ちゅ", "ちょ"],
    にゃ: ["にゃ", "にゅ", "にょ"],
    ひゃ: ["ひゃ", "ひゅ", "ひょ"],
    みゃ: ["みゃ", "みゅ", "みょ"],
    りゃ: ["りゃ", "りゅ", "りょ"],
    ぎゃ: ["ぎゃ", "ぎゅ", "ぎょ"],
    じゃ: ["じゃ", "じゅ", "じょ"],
    びゃ: ["びゃ", "びゅ", "びょ"],
    ぴゃ: ["ぴゃ", "ぴゅ", "ぴょ"],
};

const mainkatakanasets = {
    ア: ["ア", "イ", "ウ", "エ", "オ"],
    カ: ["カ", "キ", "ク", "ケ", "コ"],
    サ: ["サ", "シ", "ス", "セ", "ソ"],
    タ: ["タ", "チ", "ツ", "テ", "ト"],
    ナ: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    ハ: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    マ: ["マ", "ミ", "ム", "メ", "モ"],
    ヤ: ["ヤ", "ユ", "ヨ"],
    ラ: ["ラ", "リ", "ル", "レ", "ロ"],
    ワ: ["ワ", "ヲ", "ン"],
};

const dakutenkatakanasets = {
    ガ: ["ガ", "ギ", "グ", "ゲ", "ゴ"],
    ザ: ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
    ダ: ["ダ", "ヂ", "ヅ", "デ", "ド"],
    バ: ["バ", "ビ", "ブ", "ベ", "ボ"],
    パ: ["パ", "ピ", "プ", "ペ", "ポ"],
};

const combkatakanasets = {
    キャ: ["キャ", "キュ", "キョ"],
    シャ: ["シャ", "シュ", "ショ"],
    チャ: ["チャ", "チュ", "チョ"],
    ニャ: ["ニャ", "ニュ", "ニョ"],
    ヒャ: ["ヒャ", "ヒュ", "ヒョ"],
    ミャ: ["ミャ", "ミュ", "ミョ"],
    リャ: ["リャ", "リュ", "リョ"],
    ギャ: ["ギャ", "ギュ", "ギョ"],
    ジャ: ["ジャ", "ジュ", "ジョ"],
    ビャ: ["ビャ", "ビュ", "ビョ"],
    ピャ: ["ピャ", "ピュ", "ピョ"],
};

const allmainbase = {
    ...mainkanasets,
    ...mainkatakanasets,
    "all-hiragana-base": [],
    "all-katakana-base": [],
};

const alldakuten = {
    ...dakutenkanasets,
    ...dakutenkatakanasets,
    "all-hiragana-dakuten": [],
    "all-katakana-dakuten": [],
};

const allcomb = {
    ...combkanasets,
    ...combkatakanasets,
    "all-hiragana-comb": [],
    "all-katakana-comb": [],
};

const allextra = {
    ...extrasets,
};

const allkana = {
    ...mainkanasets,
    ...dakutenkanasets,
    ...combkanasets,
    ...mainkatakanasets,
    ...dakutenkatakanasets,
    ...combkatakanasets,
    ...extrasets,
};

export const sets = {
    allkana,
    allmainbase,
    alldakuten,
    allcomb,
    mainkanasets,
    dakutenkanasets,
    combkanasets,
    mainkatakanasets,
    dakutenkatakanasets,
    combkatakanasets,
    extrasets,
};

function FindAllBaseGroup(kana) {
    let basekey;

    if (
        mainkanasets.hasOwnProperty(kana) ||
        mainkatakanasets.hasOwnProperty(kana)
    ) {
        basekey = "all-base";
        return basekey;
    }

    if (
        dakutenkanasets.hasOwnProperty(kana) ||
        dakutenkatakanasets.hasOwnProperty(kana)
    ) {
        basekey = "all-dakuten";
        return basekey;
    }

    if (
        combkanasets.hasOwnProperty(kana) ||
        combkatakanasets.hasOwnProperty(kana)
    ) {
        basekey = "all-comb";
        return basekey;
    }

    if (
        extrasets.hasOwnProperty(kana) ||
        combkatakanasets.hasOwnProperty(kana)
    ) {
        basekey = "all-extra";
        return basekey;
    }

    return "null";
}

function FindBaseGroup(kana) {
    let basekey;

    if (mainkanasets.hasOwnProperty(kana)) {
        basekey = "all-hiragana-base";
        return basekey;
    }

    if (dakutenkanasets.hasOwnProperty(kana)) {
        basekey = "all-hiragana-dakuten";
        return basekey;
    }

    if (combkanasets.hasOwnProperty(kana)) {
        basekey = "all-hiragana-comb";
        return basekey;
    }

    if (mainkatakanasets.hasOwnProperty(kana)) {
        basekey = "all-katakana-base";
        return basekey;
    }

    if (dakutenkatakanasets.hasOwnProperty(kana)) {
        basekey = "all-katakana-dakuten";
        return basekey;
    }

    if (combkatakanasets.hasOwnProperty(kana)) {
        basekey = "all-katakana-comb";
        return basekey;
    }

    if (extrasets.hasOwnProperty(kana)) {
        basekey = "all-extra";
        return basekey;
    }

    return "null";
}
