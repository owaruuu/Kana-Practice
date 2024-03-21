function KanaToInfo(kana) {
    if (infotext[kana] === "") {
        return "...";
    }

    let symbol = "ⓘ ";
    let info = symbol.concat(infotext[kana]);

    if (info != null) {
        return info;
    }
}
