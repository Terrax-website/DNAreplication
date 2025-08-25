console.log("On load raw:", localStorage.getItem("amount"));
console.log("On load parsed:", Number(localStorage.getItem("amount")));
let dna = document.getElementById("dna");
let dnaAmountSpan = document.getElementById("dna-amount");
let dnaAmount;
let extraAutoclicks = 0;
let lessTime = 0;
let primasePrice = 500;
let increaseOne = document.getElementById("increase1");
let gameCanvas = document.getElementById("game-canvas");
let ping = new Audio("sounds/ping-82822.mp3");
let descriptor = document.getElementById("descriptor");
let helicaseObj = {
helicaseBool: localStorage.getItem("helicase") ? true : false,
helicaseContainer: document.getElementById("helicase"),
helicaseLabel: document.getElementById(`helicase-label`),
helicaseImg: document.getElementById(`helicase-img`),
helicaseCost: document.getElementById(`helicase-cost`),
primaseBool: Number(localStorage.getItem("primase")),
primaseContainer: document.getElementById("primase"),
primaseLabel: document.getElementById(`primase-label`),
primaseImg: document.getElementById(`primase-img`),
primaseCost: document.getElementById(`primase-cost`),
topoisomeraseBool: localStorage.getItem("topoisomerase") ? true : false,
topoisomeraseContainer: document.getElementById("topoisomerase"),
topoisomeraseLabel: document.getElementById("topoisomerase-label"),
topoisomeraseImg: document.getElementById("topoisomerase-img"),
topoisomeraseCost: document.getElementById("topoisomerase-cost"),
SSBPBool: localStorage.getItem("SSBP") ? true : false,
SSBPContainer: document.getElementById("SSBP"),
SSBPLabel: document.getElementById("SSBP-label"),
SSBPImg: document.getElementById("SSBP-img"),
SSBPCost: document.getElementById("SSBP-cost"),
};
    let audio = new Audio("sounds/mouse-click-290204.mp3");
let primaseAlrAdded = false;
let extraClicks = 1;
let descStateObj = {
    helicase: "hidden",
    primase: "hidden",
    topoisomerase: "hidden",
    SSBP: "hidden",
}
if (localStorage.getItem("amount")) {
    dnaAmount = Number(localStorage.getItem("amount"));
    dnaAmountSpan.textContent = dnaAmount;
} else {
    dnaAmount = 0;
    dnaAmountSpan.textContent = dnaAmount;
    console.log("this shouldnt happen")
}
dnaCheck();

if (helicaseObj.helicaseBool) {
    disableUpgrade("helicase");
    addUpgrade("helicase");
}
if (helicaseObj.primaseBool) {
    extraClicks = helicaseObj.primaseBool;
    primasePrice = (helicaseObj.primaseBool - 1)/ 5 * 500;
     addUpgrade("primase");
    helicaseObj.primaseCost.textContent = `${primasePrice} DNA`
} else {
    extraClicks = 1;
    helicaseObj.primaseCost.textContent = `${primasePrice} DNA`
}
if (helicaseObj.topoisomeraseBool) {
    disableUpgrade("topoisomerase");
     addUpgrade("topoisomerase");
} else {
    extraAutoclicks = 0;
}
if (helicaseObj.SSBPBool) {
    disableUpgrade("SSBP");
     addUpgrade("SSBP");
} else {
    lessTime = 0;
}

hideDescriptor();
       function showDescriptor() {
        descriptor.style.display = "block";
       }
       function hideDescriptor() {
        descriptor.style.display = "none";
       }
       document.addEventListener("mousemove", (e) => {
        descriptor.style.left = e.pageX + 20 + "px";
         descriptor.style.top = e.pageY - 20 + "px";
       });

helicaseObj.helicaseContainer.addEventListener("mouseenter", () => {
showDescriptor();
console.log(descStateObj.helicase);
if (descStateObj.helicase === "hidden") {
    descriptor.innerText = "???"
} else if (descStateObj.helicase === "disabled") {
    descriptor.innerText = "Already bought!"
} else if (descStateObj.helicase === "show") {
    descriptor.innerText = "Helicase unzips DNA and creates replication bubbles, allowing it to replicate 1 DNA per second!"
}

})
helicaseObj.helicaseContainer.addEventListener("mouseleave", hideDescriptor)
helicaseObj.primaseContainer.addEventListener("mouseenter", () => {
showDescriptor();
console.log(descStateObj.primase);
if (descStateObj.primase === "hidden") {
    descriptor.innerText = "???"
} else if (descStateObj.primase === "disabled") {
    descriptor.innerText = "Not enough money"
} else if (descStateObj.primase === "show") {
    descriptor.innerText = `Primase adds short RNA primers to guide replication, allowing each click to replicate ${extraClicks + 5} DNA!`
}

})
helicaseObj.primaseContainer.addEventListener("mouseleave", hideDescriptor)
helicaseObj.topoisomeraseContainer.addEventListener("mouseenter", () => {
showDescriptor();
console.log(descStateObj.topoisomerase);
if (descStateObj.topoisomerase === "hidden") {
    descriptor.innerText = "???"
} else if (descStateObj.topoisomerase === "disabled") {
    descriptor.innerText = "Already bought!"
} else if (descStateObj.topoisomerase === "show") {
    descriptor.innerText = "Topoisomerase untangles DNA, increasing the effectiveness of helicase!"
} else if (descStateObj.topoisomerase === "buyFirst") {
    descriptor.innerText = "Buy helicase before you buy topoisomerase!"
}

})
helicaseObj.topoisomeraseContainer.addEventListener("mouseleave", hideDescriptor)

helicaseObj.SSBPContainer.addEventListener("mouseenter", () => {
showDescriptor();
console.log(descStateObj.SSBP);
if (descStateObj.SSBP === "hidden") {
    descriptor.innerText = "???"
} else if (descStateObj.SSBP === "disabled") {
    descriptor.innerText = "Already bought!"
} else if (descStateObj.SSBP === "show") {
    descriptor.innerText = "SSBPs make sure the two strands of DNA don't come back together, making helicase more effective!"
} else if (descStateObj.SSBP === "buyFirst") {
    descriptor.innerText = "Buy helicase before you buy SSBPs!"
}

})
helicaseObj.SSBPContainer.addEventListener("mouseleave", hideDescriptor)

function dnaClicked() {
    let click = new Audio("sounds/mouse-click-290204.mp3");
    click.volume = 0.05;
    click.play();
    dnaAmount += extraClicks;
    console.log("Saving DNA: " + Number(dnaAmount));
localStorage.setItem("amount", Number(dnaAmount));
    dnaAmountSpan.textContent = dnaAmount;
    dnaAnimate();
    dnaCheck();
}
if ("ontouchstart" in window) {
    dna.addEventListener("touchstart", e => {
e.preventDefault();
dnaClicked();
}) } else {
dna.addEventListener("click", dnaClicked);
};

function dnaAnimate() {
    dna.animate([{transform: "scale(1.0)"}, {transform: "scale(1.2)"}, {transform: "scale(1.0)"}], {duration: 300});
}

function dnaCheck() {
    localStorage.setItem("amount", Number(dnaAmount));
     if (dnaAmount >= 100) {
        if (!helicaseObj.helicaseBool) {
            showUpgrade("helicase");
        } else {
            disableUpgrade("helicase");
        }
    } else {
        if (helicaseObj.helicaseBool) {
            disableUpgrade("helicase")
        } else {
        hideUpgrade("helicase");
        }
    }

    if (dnaAmount >= primasePrice) {
            showUpgrade("primase");
    } else if (helicaseObj.primaseBool == false) {
        hideUpgrade("primase")
    } else {
        disableUpgrade("primase")
    }
    

    if (dnaAmount >= 1500) {
        if (!helicaseObj.topoisomeraseBool) {
            if (helicaseObj.helicaseBool) {
            showUpgrade("topoisomerase");
            } else {
                buyFirst("topoisomerase");
            }
        } else {
            disableUpgrade("topoisomerase");
        }
    } else {
        if (helicaseObj.topoisomeraseBool) {
            disableUpgrade("topoisomerase")
        } else {
        hideUpgrade("topoisomerase");
        }
    }
       if (dnaAmount >= 5000) {
        if (!helicaseObj.SSBPBool) {
            if (helicaseObj.helicaseBool) {
            showUpgrade("SSBP");
            } else {
                buyFirst("SSBP");
            }
        } else {
            disableUpgrade("SSBP");
        }
    } else {
        if (helicaseObj.SSBPBool) {
            disableUpgrade("SSBP")
        } else {
        hideUpgrade("SSBP");
        }
    }
}

function showUpgrade(string) {
       helicaseObj[string + "Label"].textContent = string[0].toUpperCase() + string.slice(1);
    helicaseObj[string + "Img"].style.filter = "grayscale(0%)";
    helicaseObj[string + "Container"].style.removeProperty("background");
helicaseObj[string + "Cost"].style.filter = "none";
    helicaseObj[string + "Cost"].style.color = "rgb(42,178,42)";
    helicaseObj[string + "Cost"].style.textShadow = "0px 0px 5px rgb(0,50,0)";
    descStateObj[string] = "show";
    if (string == "primase" && primaseAlrAdded == false) {
         console.log("adding update")
         helicaseObj["primaseContainer"].addEventListener("click", addPrimaseUpgrade);
         primaseAlrAdded = true;
    }
    if (helicaseObj[string + "Bool"] == false) {
        if (string == "helicase") {
    helicaseObj[string + "Container"].addEventListener("click", addHelicaseUpgrade);
    } else if (string == "topoisomerase") {
        helicaseObj[string + "Container"].addEventListener("click", addTopoisomeraseUpgrade);
    } else if (string == "SSBP") {
        helicaseObj[string + "Container"].addEventListener("click", addSSBPUpgrade);
    } //primase isn't included because it's stackable
}
}



function addHelicaseUpgrade() {
           dnaAmount -= 100;
    addUpgrade("helicase");
   disableUpgrade("helicase");
}
function addPrimaseUpgrade() {
    dnaAmount -= primasePrice;
        primasePrice += 500;
         extraClicks += 5;
   addUpgrade("primase");
}
function addTopoisomeraseUpgrade() {
            dnaAmount -= 1500;
   addUpgrade("topoisomerase");
   disableUpgrade("topoisomerase");
}
function addSSBPUpgrade() {
        dnaAmount -= 5000;
   addUpgrade("SSBP");
   disableUpgrade("SSBP");
}
function startHelicase() {
    if (helicaseObj.helicaseBool == false) {
        return;
    }
    dnaAmount += 1 + extraAutoclicks;
    console.log("Saving DNA: " + Number(dnaAmount));
localStorage.setItem("amount", Number(dnaAmount));
    dnaAmountSpan.textContent = dnaAmount;
    dnaIncreaseOneAnimate();
    dnaCheck();
    setTimeout(startHelicase, 1000 - lessTime)
}

function addUpgrade(string) {
    if (string == "helicase") {
        dnaAmountSpan.textContent = dnaAmount;
        helicaseObj.helicaseBool = true;
        localStorage.setItem("helicase", true)
        helicaseObj["helicaseContainer"].removeEventListener("click", addHelicaseUpgrade);
        startHelicase();
        /*
        const increaseOne = setInterval(() => {
            dnaAmount += 1 + extraAutoclicks;
localStorage.setItem("amount", dnaAmount);
    dnaAmountSpan.textContent = dnaAmount;
    dnaIncreaseOneAnimate();
    dnaCheck();
       if (helicaseObj.helicaseBool == false) {
            clearInterval(increaseOne);
        }
        }, 1500);
        */
    } else if (string == "primase") {
             helicaseObj.primaseCost.textContent = `${primasePrice} DNA`;
        dnaAmountSpan.textContent = dnaAmount;
        helicaseObj.primaseBool = extraClicks;
        localStorage.setItem("primase", extraClicks);
        dnaCheck();
    } else if (string == "topoisomerase") {
        dnaAmountSpan.textContent = dnaAmount;
        helicaseObj.topoisomeraseBool = true;
        localStorage.setItem("topoisomerase", true)
        helicaseObj["topoisomeraseContainer"].removeEventListener("click", addTopoisomeraseUpgrade)
        extraAutoclicks = 4;
        dnaCheck();
    } else if (string == "SSBP") {
        dnaAmountSpan.textContent = dnaAmount;
        helicaseObj.SSBPBool = true;
        localStorage.setItem("SSBP", true)
        helicaseObj["SSBPContainer"].removeEventListener("click", addSSBPUpgrade)
        lessTime = 500;
        dnaCheck();
    }
    dnaCheck();
}

function dnaIncreaseOneAnimate() {
    let clone = increaseOne.cloneNode(true);
    gameCanvas.appendChild(clone);
    clone.style.position = "absolute";
clone.style.display = "inline-block";
if (helicaseObj.topoisomeraseBool) {
    clone.innerText = "+5"
}
  let canvasRect = gameCanvas.getBoundingClientRect();
clone.style.top = `${Math.random() * canvasRect.height}px`
clone.style.left = `${Math.random() * canvasRect.width}px`
let anim = clone.animate([{transform: "scale(1.0)"}, {transform: "scale(2.0)"}, {transform: "scale(1.0)"}], 1500);
anim.onfinish = () => {clone.style.display = "none";}
}

function hideUpgrade(string) {
    helicaseObj[string + "Label"].textContent = "???";
    helicaseObj[string + "Img"].style.filter = "grayscale(100%)";
    helicaseObj[string + "Container"].style.background = "gray";
    helicaseObj[string + "Cost"].style.color = "rgba(178, 42, 42, 1)";
    helicaseObj[string + "Cost"].style.textShadow = "0px 0px 5px rgba(255, 157, 157, 1)";
descStateObj[string] = "hidden";
            if (string == "helicase") {    
    helicaseObj[string + "Container"].removeEventListener("click", addHelicaseUpgrade);
     } else if (string == "primase") {
        helicaseObj[string + "Container"].removeEventListener("click", addPrimaseUpgrade);
        primaseAlrAdded = false;
     } else if (string == "topoisomerase") {
        helicaseObj[string + "Container"].removeEventListener("click", addTopoisomeraseUpgrade);
     } else if (string == "SSBP") {
        helicaseObj[string + "Container"].removeEventListener("click", addSSBPUpgrade);
     }
}

function buyFirst(string) {
    helicaseObj[string + "Label"].textContent = string[0].toUpperCase() + string.slice(1);;
    helicaseObj[string + "Img"].style.filter = "grayscale(100%)";
    helicaseObj[string + "Container"].style.background = "gray";
    helicaseObj[string + "Cost"].style.color = "rgb(42,178,42)";
    helicaseObj[string + "Cost"].style.textShadow = "0px 0px 5px rgb(0,50,0)";
descStateObj[string] = "buyFirst";    
            if (string == "helicase") {    
    helicaseObj[string + "Container"].removeEventListener("click", addHelicaseUpgrade);
     } else if (string == "primase") {
        helicaseObj[string + "Container"].removeEventListener("click", addPrimaseUpgrade);
     } else if (string == "topoisomerase") {
        helicaseObj[string + "Container"].removeEventListener("click", addTopoisomeraseUpgrade);
     } else if (string == "SSBP") {
        helicaseObj[string + "Container"].removeEventListener("click", addSSBPUpgrade);
     }
}

function disableUpgrade(string) {
    helicaseObj[string + "Label"].textContent = string[0].toUpperCase() + string.slice(1);
    helicaseObj[string + "Img"].style.filter = "grayscale(100%)";
    helicaseObj[string + "Container"].style.background = "gray";
    helicaseObj[string + "Cost"].style.color = "black";
    helicaseObj[string + "Cost"].style.textShadow = "none";
     descStateObj[string] = "disabled";
     if (string == "helicase") {    
    helicaseObj[string + "Container"].removeEventListener("click", addHelicaseUpgrade);
     } else if (string == "primase") {
        helicaseObj[string + "Container"].removeEventListener("click", addPrimaseUpgrade);
        primaseAlrAdded = false;
     } else if (string == "topoisomerase") {
        helicaseObj[string + "Container"].removeEventListener("click", addTopoisomeraseUpgrade);
     } else if (string == "SSBP") {
        helicaseObj[string + "Container"].removeEventListener("click", addSSBPUpgrade);
     }
}

let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    extraClicks = 1;
    localStorage.removeItem("helicase");
    localStorage.removeItem("primase");
    localStorage.removeItem("SSBP");
    localStorage.removeItem("topoisomerase");
    dnaAmount = 0;
    helicaseObj.helicaseBool = false;
    helicaseObj.topoisomeraseBool = false;
     helicaseObj.SSBPBool = false;
     primasePrice = 500;
    extraAutoclicks = 0;
    lessTime = 0;
    localStorage.setItem("amount", Number(dnaAmount));
    dnaAmountSpan.textContent = dnaAmount;
    dnaAnimate();
    
});
let quickHack = document.getElementById("quick-hack");
quickHack.addEventListener("click", () => {
    dnaAmount += 10000;
})


//Who wants to be a milldnaire
let startGame = document.getElementById("start-game");
let notification = document.getElementById("notification");
let questionBoard = document.getElementById("question-board");
let question = document.getElementById("question");
let questionPrice = document.getElementById("question-price");
let answerChoices = document.getElementById("answer-choices");
let wrong = document.getElementById("wrong");
let right = document.getElementById("right");
let a1 = document.getElementById("A1");
let a2 = document.getElementById("A2");
let a3 = document.getElementById("A3");
let a4 = document.getElementById("A4");
let quit = document.getElementById("quit-now");
let randomNum;
let difficulty;
if (localStorage.getItem(difficulty)) {
startAnimation(Number(localStorage.getItem(difficulty)));
} else {
difficulty = 50;
}
let questionsList = {
 501: ["What enzyme unzips DNA?", "Helicase", "Primase", "Topoisomerase", "DNA Polymerase"],
  502: ["Where does DNA replication take place in an eukaryote?", "Nucleus", "Cytoplasm", "Plasma Membrane", "Nucleoid"],
  503: ["Which is not a DNA nucleotide?", "Cytoplasm", "Thymine", "Adenine", "Guanine"],
  504: ["Which is not a RNA nucleotide?", "Thymine", "Uracil", "Adenine", "Cytosine"],
  505: ["Most DNA are ____, while most RNA are not.", "double-stranded", "single-stranded", "ribose-containing", "uracil-containing"],
  1001: ["Where does DNA replication take place in a prokaryote?", "Cytoplasm", "Nucleus", "Plasma Membrane", "Ribosomes"],
  1002: ["When does DNA replication occur?", "S phase", "G1 phase", "M phase", "Prophase"],
    1003: ["When do chromosomes split apart?", "Anaphase", "Metaphase", "Telophase", "Cytokinesis"],
     1004: ["Which word correctly describes the genotype Bb?", "Heterozygous", "Homozygous", "Dominant", "Recessive"],
    5001: ["Which enzyme prevents DNA supercoiling?", "Topoisomerase", "Primase", "DNA polymerase I", "Helicase"],
    5002: ["Which enzyme increases DNA supercoiling?", "Helicase", "Primase", "DNA polymerase I", "Topoisomerase"],
    5003: ["Which enzyme fills in the gaps between Okazaki Fragments?", "Ligase", "Topoisomerase", "RNA polymerase I", "Okazase"],
    5004: ["The heterozygous genotype leads to a BLEND of the two phenotypes in:", "Incomplete Dominance", "Codominance", "Classical Dominance", "Mendelian Dominance"],
    10001: ["The leading strand goes from 3' -> 5'. What are the primes counting?", "Deoxyribose carbons", "Deoxyribose oxygens", "Phosphate oxygens", "Nucleotide arrangement"],
    10002: ["When 2 nucleotides are joined, what process is used?", "Dehydration synthesis", "Hydration synthesis", "Hydrolysis", "Hydroligation"],
     10003: ["What is the \"box\" that acts as the eukaryotic promoter region for RNA polymerase made of?", "Adenine & Thymine", "Cytosine & Guanine", "Thymine & Guanine", "Adenine & Cytosine"],
    50001: [`The template DNA has sequence "AGT" turns into which mRNA codon?`, "UCA", "TCA", "TCU", "AGU"],
    50002: [`When sister chromatids don't separate in anaphase, this is:`, "Nondisjunction", "Synapsis", "Independent Assortment", "Hydrolysis"],
    100001: ["Eukaryotic post-transcriptional RNA modification adds ___ on the 3' end of RNA.", "Polyadenine tail", "Polyguanine tail", "Methylguanosine cap", "Exon"],
    100002: ["Which organelle does NOT do DNA replication?", "Ribosome", "Nucleus", "Mitochondrion", "Chloroplast"],
    500001: [`A replacement of a DNA nucleotide that doesn't change the phenotype is called:`, "Silent Mutation", "Nonsense Mutation", "Missense Mutation", "Null Mutation"],
    500002: [`What part of the nucleus makes rRNA?`, "Nucleolus", "Nucleoid", "Nuclear Envelope", "Nuclear Fusion"],
     1000001: [`Which pyrimidine forms 3 hydrogen bonds?`, "Cytosine", "Adenine", "Thymine", "Guanine"],
      1000002: [`Which enzyme replaces RNA primers?`, "DNA Polymerase I", "DNA Polymerase II", "DNA Polymerase III", "RNA Polymerase"],
}
let difficultyScale = [0, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 123456789]
    let availableQuestions;
let notificationInterval = setInterval(() => {
console.log('starting');
notification.style.display = "flex";
notification.animate([{transform: "scale(0.1)"}, {transform: "scale(1)"}], 500);
startGame.addEventListener("click", startAnimationFifty)
setTimeout(() => {
    startGame.removeEventListener("click", startAnimationFifty);
notification.animate([{transform: "scale(1)"}, {transform: "scale(0.1)"}], 500);
setTimeout(() => {notification.style.display = "none";}, 500);
}, 5000)
}, Math.floor(Math.random() * 20000) + 30000)

function startAnimationFifty() {
    startAnimation(50);
}

function startAnimation(difficultyDNA) {
    right.style.display = "none";
    difficulty = difficultyDNA;
    startGame.removeEventListener("click", startAnimation);
    clearInterval(notificationInterval);
    notification.animate([{transform: "scale(1)"}, {transform: "scale(0.1)"}], 500);
setTimeout(() => {notification.style.display = "none";}, 499);
    startGame.animate([{transform: "scale(1.0)"}, {transform: "scale(1.3)"}, {transform: "scale(1.0)"}], 500);
    availableQuestions = [];
    for (let i in questionsList) {
        if (Number(i.slice(0, -1)) == difficultyDNA) {
            availableQuestions.push(questionsList[i]);
        }
    }
    console.log(availableQuestions);
 randomNum = Math.floor(Math.random() * availableQuestions.length)
    question.innerText = availableQuestions[randomNum][0];
    let answerChoiceArray = [...availableQuestions[randomNum]]
    answerChoiceArray.splice(0, 1);
let randomChoice = Math.floor(Math.random() * 4);
 a1.innerText = answerChoiceArray[randomChoice];
 answerChoiceArray.splice(randomChoice, 1)
randomChoice = Math.floor(Math.random() * 3);
 a2.innerText = answerChoiceArray[randomChoice];
 answerChoiceArray.splice(randomChoice, 1)
 randomChoice = Math.floor(Math.random() * 2);
 a3.innerText = answerChoiceArray[randomChoice];
 answerChoiceArray.splice(randomChoice, 1)
 a4.innerText = answerChoiceArray[0];
 answerChoiceArray.splice(0, 1);
 a1.addEventListener("click", checkCorrectAnswer);
  a2.addEventListener("click", checkCorrectAnswer);
 a3.addEventListener("click", checkCorrectAnswer);
  a4.addEventListener("click", checkCorrectAnswer);
  quit.addEventListener("click", checkCorrectAnswer);

questionBoard.style.display = "block";
questionPrice.innerText = "For " + difficultyDNA + " DNA"
questionBoard.animate([{transform: "scale(0.1)"}, {transform: "scale(1.0)"}], 500);

}
function checkCorrectAnswer(event) {
    console.log("did it")
    a1.removeEventListener("click", checkCorrectAnswer);
  a2.removeEventListener("click", checkCorrectAnswer);
 a3.removeEventListener("click", checkCorrectAnswer);
  a4.removeEventListener("click", checkCorrectAnswer); 
  quit.removeEventListener("click", checkCorrectAnswer); 
  if (event.target == quit) {
    clearInterval(notificationInterval);
    answerChoices.style.display = "none";
        right.style.display = "inline";
    question.style.justifySelf = "center";
    questionPrice.style.display = "none";
        question.style.alignSelf = "center";
         question.style.textAlign = "center";
         quit.style.display = "none";
         let rightDifficultyIndex = difficultyScale.indexOf(difficulty);
    right.innerHTML = "CONGRATS!<br>You won " +  difficultyScale[rightDifficultyIndex - 1] + " DNA!";
     difficulty = 50;
    setTimeout(() => {
        questionBoard.style.display = "none";
        console.log(difficultyScale[rightDifficultyIndex - 1])
        dnaAmount += Number(difficultyScale[rightDifficultyIndex - 1]);
        dnaAmountSpan.textContent = dnaAmount;
        dnaCheck();
notificationInterval = setInterval(() => {
console.log('starting');
notification.style.display = "flex";
answerChoices.style.display = "";
  quit.style.display = "";
questionPrice.style.display = "";
        right.style.display = "none";
notification.animate([{transform: "scale(0.1)"}, {transform: "scale(1)"}], 500);
startGame.addEventListener("click", startAnimationFifty)
setTimeout(() => {
    startGame.removeEventListener("click", startAnimationFifty);
notification.animate([{transform: "scale(1)"}, {transform: "scale(0.1)"}], 500);
setTimeout(() => {notification.style.display = "none";}, 499);
}, 5000)
}, Math.floor(Math.random() * 300000) + 50000)
    }, 3000)
  } else if (event.target.textContent == availableQuestions[randomNum][1]) {
let difficultyIndex = difficultyScale.indexOf(difficulty);
if (difficultyScale[difficultyIndex + 1] == 123456789) {
clearInterval(notificationInterval);
    answerChoices.style.display = "none";
        right.style.display = "inline";
    question.style.justifySelf = "center";
    questionPrice.style.display = "none";
        question.style.alignSelf = "center";
         question.style.textAlign = "center";
         quit.style.display = "none";
         let rightDifficultyIndex = difficultyScale.indexOf(difficulty) + 1;
    right.innerHTML = "CONGRATS!<br>You got all questions correct and won 100,000 DNA!";
     difficulty = 50;
    setTimeout(() => {
        questionBoard.style.display = "none";
        console.log(difficultyScale[rightDifficultyIndex - 1])
        dnaAmount += Number(difficultyScale[rightDifficultyIndex - 1]);
        dnaAmountSpan.textContent = dnaAmount;
        dnaCheck();
notificationInterval = setInterval(() => {
console.log('starting');
notification.style.display = "flex";
answerChoices.style.display = "";
  quit.style.display = "";
questionPrice.style.display = "";
        right.style.display = "none";
notification.animate([{transform: "scale(0.1)"}, {transform: "scale(1)"}], 500);
startGame.addEventListener("click", startAnimationFifty)
setTimeout(() => {
    startGame.removeEventListener("click", startAnimationFifty);
notification.animate([{transform: "scale(1)"}, {transform: "scale(0.1)"}], 500);
setTimeout(() => {notification.style.display = "none";}, 499);
}, 5000)
}, Math.floor(Math.random() * 300000) + 50000)
    }, 3000)
} else {
startAnimation(difficultyScale[difficultyIndex + 1]);
}
  } else {
    difficulty = 50;
    clearInterval(notificationInterval);
    answerChoices.style.display = "none";
    quit.style.display = "none";
        wrong.style.display = "inline";
    question.style.justifySelf = "center";
    questionPrice.style.display = "none";
        question.style.alignSelf = "center";
         question.style.textAlign = "center";
    wrong.innerHTML = "WRONG!<br>You lost " +  questionPrice.innerText.slice(3);
    setTimeout(() => {
        questionBoard.style.display = "none";
notificationInterval = setInterval(() => {
console.log('starting');
notification.style.display = "flex";
answerChoices.style.display = "";
questionPrice.style.display = "";
        wrong.style.display = "";
         quit.style.display = "";
notification.animate([{transform: "scale(0.1)"}, {transform: "scale(1)"}], 500);
startGame.addEventListener("click", startAnimationFifty)
setTimeout(() => {
    startGame.removeEventListener("click", startAnimationFifty);
notification.animate([{transform: "scale(1)"}, {transform: "scale(0.1)"}], 500);
setTimeout(() => {notification.style.display = "none";}, 499);
}, 5000)
}, Math.floor(Math.random() * 300000) + 5000)
    }, 3000)
  }
}