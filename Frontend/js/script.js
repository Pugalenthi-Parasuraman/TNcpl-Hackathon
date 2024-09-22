// Usage
const url = "http://localhost:5000";
const headers = {
  "Content-Type": "application/json",
};


let model = document.getElementById("load_server");

model.onclick = async function () {
  try {
    const response = await fetch(url + "/load_model", {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to load model");
    }

    const responseData = await response.json();
    alert(responseData.message); // Alert the response message
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error: " + error.message); // Alert the error message
  }
};
// const url = "https://api-inference.huggingface.co/models/google/gemma-7b-it";
// const headers = {
//   Authorization: "Bearer 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",
//   "Content-Type": "application/json",
// };

// Show/Hide FAQs answer
const faqs = document.querySelectorAll(".faq");
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open");

    //change icon
    const icon = faq.querySelector(".faq_icon i");
    if (icon.className === "fa-solid fa-plus") {
      icon.className = "fa-solid fa-minus";
    } else {
      icon.className = "fa-solid fa-plus";
    }
  });
});

//Show/hide nav menu
const menu = document.querySelector(".nav_menu");
const menuBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
  menu.style.display = "flex";
  closeBtn.style.display = "inline-block";
  menuBtn.style.display = "none";
});

//close nav menu
const closeNav = () => {
  menu.style.display = "none";
  closeBtn.style.display = "none";
  menuBtn.style.display = "inline-block";
};
closeBtn.addEventListener("click", closeNav);

//nav color change on scroll
window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("window-scroll", window.scrollY > 100);
});

// Array of strings to display
const strings1 = ["Generation", "Prediction", "Emotion", "Editor"];
let currentStringIndex = 0; // Index of the current string
let currentCharIndex = 0; // Index of the current character

const typedTextElement1 = document.getElementById("typed-text-1");

// Function to simulate typing effect
function type1() {
  if (currentCharIndex < strings1[currentStringIndex].length) {
    typedTextElement1.textContent +=
      strings1[currentStringIndex][currentCharIndex];
    currentCharIndex++;
    setTimeout(type1, 80); // Adjust typing speed here
  } else {
    // Finished typing this string, start backspacing
    setTimeout(backspace1, 1000); // Wait for 1 second before backspacing
  }
}

// Function to simulate backspacing effect
function backspace1() {
  if (currentCharIndex > 0) {
    typedTextElement1.textContent = typedTextElement1.textContent.slice(0, -1);
    currentCharIndex--;
    setTimeout(backspace1, 60); // Adjust backspacing speed here
  } else {
    // Finished backspacing, move to the next string
    currentStringIndex = (currentStringIndex + 1) % strings1.length;
    setTimeout(type1, 500); // Wait for 0.5 seconds before typing the next string
  }
}

// Start the typing animation
type1();

// Array of strings to display
const strings2 = [
  "Text Generator",
  "Sentiment Scripter",
  "Tone Tapper",
  "Express Editor",
];
let currentStringIndex2 = 0; // Index of the current string
let currentCharIndex2 = 0; // Index of the current character

const typedTextElement2 = document.getElementById("typed-text-2");

// Function to simulate typing effect
function type2() {
  if (currentCharIndex2 < strings2[currentStringIndex2].length) {
    typedTextElement2.textContent +=
      strings2[currentStringIndex2][currentCharIndex2];
    currentCharIndex2++;
    setTimeout(type2, 80); // Adjust typing speed here
  } else {
    // Finished typing this string, start backspacing
    setTimeout(backspace2, 1000); // Wait for 1 second before backspacing
  }
}

// Function to simulate backspacing effect
function backspace2() {
  if (currentCharIndex2 > 0) {
    typedTextElement2.textContent = typedTextElement2.textContent.slice(0, -1);
    currentCharIndex2--;
    setTimeout(backspace2, 60); // Adjust backspacing speed here
  } else {
    // Finished backspacing, move to the next string
    currentStringIndex2 = (currentStringIndex2 + 1) % strings2.length;
    setTimeout(type2, 500); // Wait for 0.5 seconds before typing the next string
  }
}

// Start the typing animation
type2();

let input = document.getElementById("input");
let preEndSuggestion = document.getElementById("pre-end-suggestion");
let postEndSuggestion = document.getElementById("post-end-suggestion");
let sliderList = {
  joy: "😄",
  excitement: "🎉",
  admiration: "😍",
  neutral: "😐",
  approval: "👍",
  gratitude: "🙏",
  caring: "❤️",
  relief: "😌",
  optimism: "😊",
  love: "💕",
  pride: "🏆",
  amusement: "😆",
  desire: "😏",
  annoyance: "😒",
  realization: "😮",
  disapproval: "👎",
  surprise: "😲",
  sadness: "😢",
  curiosity: "🤔",
  anger: "😡",
  nervousness: "😬",
  confusion: "😕",
  disappointment: "😞",
  grief: "😭",
  fear: "😨",
  disgust: "🤢",
  remorse: "😔",
  embarrassment: "😳",
};
const progressContainer = document.getElementById("progress-container");

window.onload = () => {
  input.value = "";
  clearSuggestion();
};

const clearSuggestion = () => {
  preEndSuggestion.innerHTML = "";
  postEndSuggestion.innerHTML = "";
};

const caseCheck = (word, inputText) => {
  word = word.split("");
  inputText = inputText.split("");

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] == word[i]) {
      continue;
    } else if (inputText[i].toUpperCase() == word[i]) {
      word.splice(i, 1, word[i].toLowerCase());
    } else {
      word.splice(i, 1, word[i].toUpperCase());
    }
  }
  return word.join("");
};

function createProgressBar(emotion) {
  // Create emotion-box element
  const emotionBox = document.createElement("div");
  emotionBox.classList.add("emotion-box");
  emotionBox.style.marginBottom = "20px";

  // Create title element
  const titleSpan = document.createElement("span");
  titleSpan.classList.add("title");
  titleSpan.id = emotion + "Title";
  titleSpan.textContent = emotion.charAt(0).toUpperCase() + emotion.slice(1);

  const emojiContainer = document.createElement("span");
  emojiContainer.textContent = sliderList[emotion];

  const emotionHeading = document.createElement("div");
  emotionHeading.appendChild(titleSpan);
  emotionHeading.appendChild(emojiContainer);
  emotionHeading.classList.add("d-flex", "justify-content-between");

  // Create emotion-bar element
  const emotionBar = document.createElement("div");
  emotionBar.classList.add("emotion-bar");

  // Create emotion-per element
  const emotionPer = document.createElement("span");
  emotionPer.classList.add("emotion-per");
  emotionPer.id = emotion + "Per";

  // Create emotion-tooltip element
  const emotionTooltip = document.createElement("span");
  emotionTooltip.classList.add("emotion-tooltip");
  emotionTooltip.id = emotion + "Tooltip";
  emotionTooltip.textContent = "0%";

  // Append emotion-tooltip to emotion-per
  emotionPer.appendChild(emotionTooltip);

  // Append emotion-per to emotion-bar
  emotionBar.appendChild(emotionPer);

  // Append title and emotion-bar to emotion-box
  emotionBox.appendChild(emotionHeading);
  emotionBox.appendChild(emotionBar);

  // Append emotion-box to its parent element
  progressContainer.appendChild(emotionBox);
}

for (let key in sliderList) {
  createProgressBar(key);
}

input.addEventListener("keydown", async (e) => {
  if (e.key === " " || e.code === "Space") { // Check if space key is pressed
    clearSuggestion();
    const inputText = input.value; // Trim whitespace from input
    if (inputText === "") return;

    console.log(inputText);
    try {
      const response = await fetch(url+"/predict", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          inputs: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      const generatedText = data[0].generated_text;
      preEndSuggestion.innerHTML = inputText;
      const generatedWord = caseCheck(generatedText, inputText);
      // Regular expression to match valid characters (alphabets, numbers, and spaces)
      const validCharactersRegex = /[a-zA-Z0-9\s]+/;
      // Split the generated word by spaces and filter out invalid characters
      const filteredWords = generatedWord
        .split(" ")
        .filter((word) => validCharactersRegex.test(word));
      console.log(filteredWords);
      if (inputText.endsWith(" ")) {
        console.log(filteredWords[inputText.split(" ").length]);
        postEndSuggestion.innerHTML =
          filteredWords[inputText.split(" ").length - 1];
      } else {
        let str1 = inputText.split(" ");
        let str2 = filteredWords;
        let inputedString = str1[str1.length - 1];
        let predictedString = str2[str1.length - 1];
        console.log(inputedString);
        console.log(predictedString);
        if (inputedString === predictedString) {
          predictedString = " " + str2[str1.length];
          postEndSuggestion.innerHTML = predictedString;
        } else {
          postEndSuggestion.innerHTML = predictedString.slice(inputedString.length);
        }
      }

      const emotionsData = data[0].emotions;
      emotionsData.sort((a, b) => b.score - a.score);

      function updateEmotion(emotion) {
        let updatePer = document.getElementById(emotion.label + "Per");
        updatePer.style.width = Math.round(emotion.score * 100) + "%";
        let updateTooltip = document.getElementById(emotion.label + "Tooltip");
        updateTooltip.textContent = Math.round(emotion.score * 100) + "%";
      }

      for (let emotion of emotionsData) {
        updateEmotion(emotion);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
});


// Complete predictive text on Enter key
input.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13 && postEndSuggestion.innerHTML !== "") {
    e.preventDefault();
    input.value = preEndSuggestion.innerHTML + postEndSuggestion.innerHTML;
    clearSuggestion();
  }
});
