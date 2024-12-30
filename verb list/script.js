// JSON Veri Seti
const verbs = [
  { v1: "be", v2: "was / were" },
  { v1: "have", v2: "had" },
  { v1: "do", v2: "did" },
  { v1: "go", v2: "went" },
  { v1: "eat", v2: "ate" },
  { v1: "speak", v2: "spoke" },
  { v1: "run", v2: "ran" },
  { v1: "write", v2: "wrote" },
  { v1: "take", v2: "took" },
  { v1: "see", v2: "saw" },
  { v1: "make", v2: "made" },
  { v1: "give", v2: "gave" },
  { v1: "come", v2: "came" },
  { v1: "say", v2: "said" },
  { v1: "keep", v2: "kept" },
  { v1: "know", v2: "knew" },
  { v1: "find", v2: "found" },
  { v1: "think", v2: "thought" },
  { v1: "tell", v2: "told" },
  { v1: "feel", v2: "felt" },
  { v1: "stare", v2: "stared" },
  { v1: "avoid", v2: "avoided" },
  { v1: "exchange", v2: "exchanged" },
  { v1: "greet", v2: "greeted" },
  { v1: "incise", v2: "incised" },
  { v1: "recur", v2: "recurred" },
  { v1: "summon", v2: "summoned" },
  { v1: "warn", v2: "warned" },
  { v1: "adjust", v2: "adjusted" },
  { v1: "cease", v2: "ceased" },
  { v1: "decrease", v2: "decreased" },
  { v1: "moult", v2: "moulted" },
  { v1: "oppress", v2: "oppressed" },
  { v1: "smell", v2: "smelt" },
  { v1: "sting", v2: "stung" },
  { v1: "cure", v2: "cured" },
  { v1: "diminish", v2: "diminished" },
  { v1: "grade", v2: "graded" },
  { v1: "implore", v2: "implored" },
  { v1: "pour", v2: "poured" },
  { v1: "spill", v2: "spilt" },
  { v1: "swot", v2: "swotted" },
  { v1: "cope", v2: "coped" },
  { v1: "drink", v2: "drank" },
  { v1: "dry", v2: "dried" },
  { v1: "make", v2: "made" },
  { v1: "rebuild", v2: "rebuilt" },
  { v1: "scab", v2: "scabbed" },
  { v1: "smile", v2: "smiled" },
  { v1: "convict", v2: "convicted" },
  { v1: "educate", v2: "educated" },
  { v1: "hurl", v2: "hurled" },
  { v1: "phone", v2: "phoned" },
  { v1: "satiate", v2: "satiated" },
  { v1: "slit", v2: "slit" },
  { v1: "collapse", v2: "collapsed" },
  { v1: "confess", v2: "confessed" },
  { v1: "crowd", v2: "crowded" },
  { v1: "punish", v2: "punished" },
  { v1: "reuse", v2: "reused" },
  { v1: "squeeze", v2: "squeezed" },
  { v1: "type", v2: "typed" },
  { v1: "apply", v2: "applied" },
  { v1: "contract", v2: "contracted" },
  { v1: "found", v2: "founded" },
  { v1: "relate", v2: "related" },
  { v1: "sate", v2: "sated" },
  { v1: "whip", v2: "whipped" },
  { v1: "destroy", v2: "destroyed" },
  { v1: "govern", v2: "governed" },
  { v1: "leap", v2: "leapt" },
  { v1: "milk", v2: "milked" },
  { v1: "retain", v2: "retained" },
];

// Elementleri Seç
const v1Verb = document.getElementById("v1-verb");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-question");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const correctCountElem = document.getElementById("correct-count");
const wrongCountElem = document.getElementById("wrong-count");

let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;

// Rastgele Karışık Seçenekler Oluştur
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Soru Yükle
function loadQuestion() {
  const currentVerb = verbs[currentQuestionIndex];
  v1Verb.textContent = currentVerb.v1;

  const options = shuffle([
    currentVerb.v2,
    ...shuffle(verbs)
      .filter(verb => verb.v2 !== currentVerb.v2)
      .slice(0, 3)
      .map(verb => verb.v2),
  ]);

  optionsContainer.innerHTML = "";
  options.forEach(option => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button, currentVerb.v2));
    optionsContainer.appendChild(button);
  });

  nextButton.disabled = true;
}

// Seçenek Seçimi
function selectOption(selectedButton, correctAnswer) {
  if (selectedButton.textContent === correctAnswer) {
    selectedButton.style.backgroundColor = "green";
    correctCount++;
  } else {
    selectedButton.style.backgroundColor = "red";
    wrongCount++;
  }

  Array.from(optionsContainer.children).forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = "green";
    }
  });

  nextButton.disabled = false;
}

// Sonuçları Göster
function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  correctCountElem.textContent = correctCount;
  wrongCountElem.textContent = wrongCount;
}

// Oyunu Yeniden Başlat
document.getElementById("restart").addEventListener("click", () => {
  currentQuestionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  loadQuestion();
});

// Sonraki Soru
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < verbs.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// İlk Soruyu Yükle
loadQuestion();
