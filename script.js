const fromLanguage = document.querySelector('#listOne')
const toLanguage = document.querySelector('#listTwo')
const btn = document.getElementById('translate')
const fromText = document.getElementById('from-text')
const toText = document.getElementById('to-text')
const switchBtn = document.getElementById('switch')
const icons = document.querySelectorAll('.icons')

for (let lang in languages) {
    let option = `
        <option value='${lang}'>${languages[lang]}</option>
    `
    fromLanguage.insertAdjacentHTML('beforeend', option)
    toLanguage.insertAdjacentHTML('beforeend', option)

    fromLanguage.value = "tr-TR"
    toLanguage.value = "en-GB"
}

btn.addEventListener('click', () => {
    let text = fromText.value
    let from = fromLanguage.value
    let to = toLanguage.value
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            toText.value = data.responseData.translatedText
    })
})

switchBtn.addEventListener('click', () =>  {
    let text = fromText.value
    fromText.value = toText.value
    toText.value = text

    let lang = fromLanguage.value
    fromLanguage.value = toLanguage.value
    toLanguage.value = lang
})

for (icon of icons) {
    icon.addEventListener('click', (element) => {
        if(element.target.classList.contains("fa-copy")) {
            if(element.target.id == 'from') {
                navigator.clipboard.writeText(fromText.value)
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            let utterance
            if(element.target.id == 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = fromLanguage.value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = toLanguage.value
            }
            speechSynthesis.speak(utterance)
        }
    })
}