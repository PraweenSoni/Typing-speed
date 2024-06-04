const typeTxt = document.querySelector(".leftbox p"),
    inpfield = document.querySelector(".inpField"),
    timeTag = document.querySelector(".timeleft span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    mistakeTag = document.querySelector(".mistake span"),
    set_panel = document.querySelector(".set_panel"),
    container = document.querySelector(".container"),
    setting_btn = document.getElementById("setting"),
    tryAgainBth = document.querySelector("button");

let timer,
    maxTime = 60,
    timeleft = maxTime,
    charIndex = mistakes = isTyping = 0;


function rndPara() {
    typeTxt.innerHTML = "";
    let rndIdx = Math.floor(Math.random() * paragraphs.length);
    paragraphs[rndIdx].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typeTxt.innerHTML += spanTag;
    });

    tryAgainBth.addEventListener("click", () => inpfield.focus());
    // document.addEventListener("keydown", () => inpfield.focus());        // Auto Typing
    typeTxt.addEventListener("click", () => inpfield.focus());
}

function initTyping() {
    const characters = typeTxt.querySelectorAll("span");
    let typedChar = inpfield.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeleft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeleft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inpfield.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeleft > 0) {
        timeleft--;
        timeTag.innerText = timeleft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    rndPara();
    inpfield.value = "";
    clearInterval(timer);
    timeleft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeleft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

rndPara();
inpfield.addEventListener("input", initTyping);
tryAgainBth.addEventListener("click", resetGame);

let value = 0;
setting_btn.addEventListener("click", () => {
    if (value === 0) {
        set_panel.style.width = "20rem";
        value = 1;
    } else {
        set_panel.style.width = "0rem";
        value = 0;
    }
})