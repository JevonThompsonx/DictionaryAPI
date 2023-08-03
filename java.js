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
const sunAndMoonIcons = document.querySelector('.sun-moon-icons')
const body = document.querySelector('body')
const sunIcon = document.querySelector('.fa-sun')
const moonIcon = document.querySelector('.fa-cloud-moon')

window.addEventListener('DOMContentLoaded', () => {
    fillPage();
});

const getData = async (dataType) => {
    if (dataType === 'click') {
        const dictionaryData = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search.value}`);
        return dictionaryData.data[0]
    } else //on DOMContentLoaded Event
    {
        const dictionaryData = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/keyboard`);
        return dictionaryData.data[0]
    }

}

const fillPage= async(dataType = 'rand')=> {
    data = await getData(dataType);
    wordFunc();
    removePriorMeanings();
    meaningFunc();
    phoneticFunc();
    phoneticAudio();
    partOfSpeechFunc();
    sourceFunc();
    synonymFunc();

} 
const phoneticFunc = async () => {
    enunciate.textContent = data.phonetic
}
const wordFunc = async () => {
    let firstLetter = data.word.slice(0, 1).toUpperCase();
    let rest = data.word.slice(1);
    word.textContent = firstLetter + rest
    search.value = '';
}
const phoneticAudio = async () => {
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

const partOfSpeechFunc = async () => {
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

const meaningFunc = async () => {
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
const sourceFunc = async () => {
    const source = data.sourceUrls
    sourceLink.href = source[0]
}
const synonymFunc = async () => {
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
    fillPage('click')
});

let sunOn = () => {
    moonIcon.style.display = 'none'
    sunIcon.style.display = 'inline-block'
}
let moonOn = () => {
    sunIcon.style.display = 'none'
    moonIcon.style.display = 'inline-block'
}

let themeSwitchVar
window.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            sunOn();
            themeSwitchVar = 1
        } else {
            themeSwitchVar = 0
            moonOn();
        }
    } else {}

})
sunAndMoonIcons.addEventListener('click', () => {
    themeSwitchVar++
    if (themeSwitchVar % 2 === 0) {
        moonOn();

        body.style.color = 'black';
        body.style.backgroundColor = 'white'
    } else {
        sunOn();

        body.style.color = 'white';
        body.style.backgroundColor = 'black'
    }
})