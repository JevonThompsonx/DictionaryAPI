const word = document.querySelector('#word');
const enunciate = document.querySelector('#enunciate');
const search = document.querySelector('#search');
const sourceUrl = document.querySelector('#sourceURL');
const searchButton = document.querySelector('.input-group-text');
const pageWrapper = document.querySelector('.page-wrapper');
const form = document.querySelector('form');
const audio = document.querySelector('audio');
const playButton = document.querySelector('#play');
const firstPOS = document.querySelector('#first-pos');
const secondPOS = document.querySelector('#second-pos');
const firstList = document.querySelector('#first-list');
const secondList = document.querySelector('#second-list');
const synonym = document.querySelector('#synonym');
const sourceLink = document.querySelector('#source-link');

window.addEventListener('load', () => {
    wordFunc();
    removePriorMeanings();
    meaningFunc();
    phoneticFunc();
    phoneticAudio();
    partOfSpeechFunc();
    sourceFunc();
    synonymFunc();
});



const getData = async (when) => {
    if (when === 'click') {
        const dictionaryData = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search.value}`);
        return dictionaryData.data[0]
    } else {
        const dictionaryData = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/keyboard`);
        return dictionaryData.data[0]
    }

}
const phoneticFunc = async (when) => {
    const data = await getData(when);
    enunciate.textContent = data.phonetic
}
const wordFunc = async (when) => {
    const data = await getData(when);
    let firstLetter = data.word.slice(0, 1).toUpperCase();
    let rest = data.word.slice(1);
    word.textContent = firstLetter + rest
    search.value = '';
}
const phoneticAudio = async (when) => {
    const data = await getData(when);
    let phoneticArray = data.phonetics
    for (let singleArray of phoneticArray) {
        let audioSrc = singleArray.audio
        if (audioSrc === '') {
            continue
        } else {
            audio.src = audioSrc
        }
    }
}

playButton.addEventListener('click', () => {
    audio.play();
})

const partOfSpeechFunc = async (when) => {
    const data = await getData(when);
    const meaningArray = data.meanings
    const firstMeaningObject = meaningArray[0]
    const secondMeaningObject = meaningArray[1]
    const firstPOSFirstLetter = firstMeaningObject.partOfSpeech.slice(0, 1)
    const firstPOSOtherLetters = firstMeaningObject.partOfSpeech.slice(1)
    const secondPOSFirstLetter = secondMeaningObject.partOfSpeech.slice(0, 1)
    const secondPOSOtherLetters = secondMeaningObject.partOfSpeech.slice(1)
    firstPOS.textContent = firstPOSFirstLetter.toUpperCase() + firstPOSOtherLetters
    secondPOS.textContent = secondPOSFirstLetter.toUpperCase() + secondPOSOtherLetters
}

const meaningFunc = async (when) => {
    const data = await getData(when);
    const meaningArray = data.meanings
    for (let meaning in meaningArray) {
        let partOfSpeechList = meaningArray[meaning]
        let definitions = partOfSpeechList.definitions
        let numberOfDefinitions = 0
        for (let definitionList in definitions) {
            numberOfDefinitions++
            let listItem = document.createElement('li');
            let = finalArray = definitions[definitionList]
            listItem.textContent = finalArray.definition
            if (meaning == 0) {
                firstList.append(listItem);
            } else {
                secondList.append(listItem);
            }
            if (numberOfDefinitions >= 3) {
                break
            }
        }

    }
}
const removePriorMeanings = () => {
    try {
        let listItems = document.querySelectorAll('li');
        for (let li of listItems) {
            li.remove();
        }
    } catch {}
}
const sourceFunc = async (when) => {
    const data = await getData(when);
    const source = data.sourceUrls
    sourceLink.href = source[0]
}
const synonymFunc = async (when) => {
    const data = await getData(when)
    const meaningsArray = data.meanings
    const meaningArray = meaningsArray[0]
    const synonymArray = meaningArray.synonyms
    let synonymWord = synonymArray[0]
    let synonym1st = synonymWord[0]
     synonym1st = synonym1st.toUpperCase()
    const synonym2nd = synonymWord.slice(1)
    synonymWord = synonym1st + synonym2nd
    synonym.textContent = `Synonym: ${synonymWord}`
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    wordFunc('click');
    removePriorMeanings('click');
    meaningFunc('click');
    phoneticFunc('click');
    phoneticAudio('click');
    partOfSpeechFunc('click');
    sourceFunc('click');
    synonymFunc('click');
});
//goal: follow the logic of meaning func to build all the other functions 
//Ultimate goal: When search is clicked, build the whole page
//GOOD JOB GOAT 
//Next have start up code so the page isn't blank and synonym link as well as source url