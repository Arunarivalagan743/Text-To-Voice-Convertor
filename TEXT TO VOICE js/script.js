let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';

    // Filter voices to show specific languages
    const languages = ["hi", "ta", "ko", "zh", "it", "es", "de", "en"]; // Language codes

    voices.forEach((voice, i) => {
        // Check if the voice language is one of the specified languages
        if (languages.some(lang => voice.lang.startsWith(lang))) {
            const option = new Option(`${voice.name} (${voice.lang})`, i);
            voiceSelect.add(option);
        }
    });

    // Check if any voices were added
    if (voiceSelect.options.length > 0) {
        speech.voice = voices[voiceSelect.value];
    } else {
        console.log("No voices available for the specified languages.");
    }
}

// Populate voice list once voices are loaded
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoiceList;
    // For browsers that may not trigger onvoiceschanged
    populateVoiceList(); // Call it initially
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
