import {get as getSynonyms} from "synonyms-array";

function synonyminizeWord(word:string) {
    let isWordCapitalized = false;
    let firstLetter = word[0];
    let capitalizedFirstLetter = word[0].toUpperCase();
    if (firstLetter == capitalizedFirstLetter) {
        isWordCapitalized = true;
    }
    word = word.toLowerCase();

    function reCapitalizeWord(wordToCapitalize:string):string {
        let firstLetter = wordToCapitalize.charAt(0);
        firstLetter = firstLetter.toUpperCase();
        let capitalizedWord = firstLetter + wordToCapitalize.slice(1, wordToCapitalize.length);
        return capitalizedWord;
    }

    let synonymsArray = getSynonyms(word);
    if (!(synonymsArray == undefined || synonymsArray.length == 0)) {
        
        let indexToReturn = Math.floor(Math.random()*synonymsArray.length);
        let wordToReturn = synonymsArray[indexToReturn];
        if (isWordCapitalized) {wordToReturn = reCapitalizeWord(wordToReturn)}
        return wordToReturn;
    } else {
        return isWordCapitalized ? reCapitalizeWord(word) : word;
    }
} 



function processWord(word:string):string {
    return synonyminizeWord(word);
}

function processText(text:string):string {
    let vanillaArray = text.split(/\b/);
    let finishedArray = new Array<string>();
    let isWordRegex = new RegExp("[a-zA-Z0-9_]");
    for (let wordIndex=0; wordIndex < vanillaArray.length; wordIndex++) {
        if (isWordRegex.test(vanillaArray[wordIndex])) {
            finishedArray[wordIndex] = processWord(vanillaArray[wordIndex]);
        } else {
            finishedArray[wordIndex] = vanillaArray[wordIndex];
        }
    }

    let finalString = "";
    for (let wordIndex=0; wordIndex < finishedArray.length; wordIndex++) {
        finalString = finalString + finishedArray[wordIndex];
    }
    return (finalString);
}
export default processText